"use server";
import { options } from "@/app/api/auth/[...nextauth]/option";
import { connect } from "@/dbConfig/dbConfig";
import DocumentTeamModel from "@/models/documentTeamModel";
import DocumentWorkspaceModel from "@/models/documentWorkspaceModel";
import OfficeEmployeeModel from "@/models/officeEmployeModel";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { createDecipheriv } from "crypto";

// return a seesion obejct prop
export async function getServerSideProps() {
  const session = await getServerSession(options);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

// return decrypt ID file share
async function decryptId(encryptedId, iv, authTag) {
  try {
    const key =
      "52bdc56fb0440989d14fad277de68f2221727ae3501ffe3d37607e5684d4be88";
    const cipherKey = Buffer.from(key, "hex");
    const decipher = createDecipheriv(
      "aes-256-gcm",
      cipherKey,
      Buffer.from(iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(authTag, "hex"));
    let decrypted = decipher.update(encryptedId, "hex", "utf8");
    decrypted += decipher.final("utf8");
    const decryptedId = JSON.parse(decrypted).id;
    return decryptedId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// this function for get Office employee for dropdown
export const getOfficeMembers = async () => {
  try {
    const { props } = await getServerSideProps();
    await connect();
    // we have remove the current sessoin  user from the list
    const pipeline = [
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(props?.session?.user?._id) },
          delete: false,
        },
      },
      {
        $group: {
          _id: null,
          // we have to make object like [{label:name,value:_id}]
          members: {
            $push: {
              label: "$name",
              value: "$_id",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          members: 1,
        },
      },
    ];
    const officeMembers = await OfficeEmployeeModel.aggregate(pipeline);
    if (!officeMembers)
      return { status: false, message: "No office memeber found" };
    const data = JSON.stringify(officeMembers[0]?.members);
    return { status: true, data: data };
  } catch (error) {
    console.log(
      error,
      "Error from centralfileshare getOfficeMemebers function"
    );
  }
};

// store the team data in to database but we have to check first unique name of team name universal
export const storeTeam = async (teamData) => {
  try {
    const { props } = await getServerSideProps();
    const leader = props?.session?.user?._id;

    // we have to add the  current user to the team
    // teamData.members.push("6602be416dbeb55f9436657f");
    teamData.members.push(leader);

    const team = await DocumentTeamModel.findOne({ name: teamData.name });
    if (team) {
      return { status: false, message: "Team name already exist" };
    }
    // we have check the same team memeber not create  multiple team
    const teamMembers = await DocumentTeamModel.find({
      members: teamData.members,
    });
    if (teamMembers.length > 0) {
      return { status: false, message: "Team memeber already exist" };
    }
    // we have to add the leader id  in the team data
    // teamData.leader = "6602be416dbeb55f9436657f";
    teamData.leader = leader;
    const newTeam = new DocumentTeamModel(teamData);
    await newTeam.save();
    return { status: true, message: "Team created successfully" };
  } catch (error) {
    console.log(error, "Error from centralfileshare storeTeam function");
    return { status: false, message: "Failed to create team" };
  }
};

// fetch the all team Data to show this is your team
export const getTeamData = async () => {
  try {
    const { props } = await getServerSideProps();
    const userId = props?.session?.user?._id;
    const teamData = await DocumentTeamModel.find({
      isDelete: false,
      members: userId,
    }).populate("members");
    if (teamData) {
      const data = JSON.stringify(teamData);
      return { status: true, data, userId };
    }
    return { status: false, message: "No team found" };
  } catch (error) {
    console.log(error, "Error from centralfileshare getTeamData function");
    return { status: false, message: "Failed to get team data" };
  }
};

// get the team for workspace dropdown
export const getTeam = async () => {
  try {
    await connect();
    const { props } = await getServerSideProps();
    const leader = props?.session?.user?._id;
    const pipeline = [
      {
        $match: {
          isDelete: false,
          leader: new mongoose.Types.ObjectId(leader),
        },
      },
      {
        $group: {
          _id: null,
          teams: {
            $push: {
              value: "$_id",
              label: "$name",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          teams: 1,
        },
      },
    ];
    const teams = await DocumentTeamModel.aggregate(pipeline);
    if (!teams) return { status: false, message: "No team found" };
    const teamData = JSON.stringify(teams[0].teams);
    return { status: true, message: "Team found successfully", data: teamData };
  } catch (error) {
    console.log(error, "Error from centralfileshare storeTeam function");
    return { status: false, message: "Failed to get team" };
  }
};

// store the workspace data in to database but we have to check first unique name of team name universal
export const storeWorkspace = async (workspaceData) => {
  try {
    const { props } = await getServerSideProps();
    const leader = props?.session?.user?._id;
    const team = await DocumentWorkspaceModel.findOne({
      name: workspaceData.name,
    });
    if (team) {
      return { status: false, message: "Workspace name already exist" };
    }
    // we have check the same team memeber not create  multiple team
    const teamData = await DocumentWorkspaceModel.find({
      team: workspaceData.team,
    });
    if (teamData.length > 0) {
      return {
        status: false,
        message: "Team is already exist in this workspace",
      };
    }
    workspaceData.leader = leader;
    const newWorkspace = await DocumentWorkspaceModel(workspaceData);
    const result = await newWorkspace.save();
    if (result) {
      return { status: true, message: "Workspace created successfully" };
    }
  } catch (error) {
    console.log(error, "Error from centralfileshare storeWorkspace function");
    return { status: false, message: "Failed to create workspace" };
  }
};

// fetch the all workspace Data to show this is your team today start from here make pipeline and get the data
export const getWorkspaceData = async () => {
  try {
    const { props } = await getServerSideProps();
    const userId = props?.session?.user?._id;

    const pipeline = [
      {
        $lookup: {
          from: "documentteams",
          localField: "team",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $unwind: "$result",
      },
      {
        $match: {
          "result.members": new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "officeemployes",
          localField: "result.members",
          foreignField: "_id",
          as: "members",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          members: 1,
          // result: 1,
          leader: 1,
          team: 1,
        },
      },
    ];
    const result = await DocumentWorkspaceModel.aggregate(pipeline);
    if (!result) return { status: false, message: "No team found" };
    const data = JSON.stringify(result);
    return { status: true, data, userId };
  } catch (error) {
    console.log(error, "Error from centralfileshare getTeamData function");
    return { status: false, message: "Failed to get team data" };
  }
};

// we have to check this workspace id this user is  a member or not
export const getWorkspaceDataWithUserCheck = async (
  workspaceId,
  iv,
  authTag
) => {
  try {
    const id = await decryptId(workspaceId, iv, authTag);
    if (!id) return { status: false, message: "Invalid workspace id" };
    const { props } = await getServerSideProps();
    const userId = props?.session?.user?._id; // get user id from session
    if (!userId) return { status: false, message: "User not logged in" };
    // we have check on team first
    const teamData = await DocumentTeamModel.findOne({
      _id: id,
      members: userId,
    });
    if (teamData)
      return { status: true, data: { teamData: JSON.stringify(teamData) } };
    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "documentteams",
          localField: "team",
          foreignField: "_id",
          as: "teamData",
        },
      },
      {
        $unwind: "$teamData",
      },
      {
        $match: {
          "teamData.members": new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 1,
          teamData: 1,
        },
      },
    ];
    const result = await DocumentWorkspaceModel.aggregate(pipeline);
    if (result.length > 0) {
      return {
        status: true,
        data: JSON.stringify(result[0]),
      };
    }
    return { status: false, message: "You are not a member of this team" };
  } catch (error) {
    console.log(
      error,
      "Error from centralfileshare getWorkspaceDataWithUser function"
    );
    return { status: false, message: "Failed to get workspace data" };
  }
};

export const getWorkspaceDataWithUserData = async (
  workspaceId,
  iv,
  authTag
) => {
  try {
    const id = await decryptId(workspaceId, iv, authTag);
    if (!id) return { status: false, message: "Invalid workspace id" };
    const { props } = await getServerSideProps();
    const userId = props?.session?.user?._id; // get user id from session
    if (!userId) return { status: false, message: "User not logged in" };
    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "documentteams",
          localField: "team",
          foreignField: "_id",
          as: "teamData",
        },
      },
      {
        $unwind: "$teamData",
      },
      {
        $lookup: {
          from: "officeemployes",
          localField: "teamData.members",
          foreignField: "_id",
          as: "members",
        },
      },
      {
        $unwind: "$members",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          team: 1,
          teamData: 1,
          members: 1,
        },
      },
    ];
    const result = await DocumentWorkspaceModel.aggregate(pipeline);
    if (result.length > 0) {
      return { status: true, data: JSON.stringify(result) };
    }
    return { status: false, message: "You are not a member of this team" };
  } catch (error) {
    console.log(
      error,
      "Error from centralfileshare getWorkspaceDataWithUser function"
    );
    return { status: false, message: "Failed to get workspace data" };
  }
};
