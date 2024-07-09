"use server";
import { getSiteById } from "../siteProject/siteProjectAction";
import { getEmployeById } from "../employeAction/employeAction";
import AssignProjectModel from "@/models/assignProjectModel";
import { randomInt } from "crypto";

export const handleAssignSite = async (id, data) => {
  if (!data) return { status: false, message: "No data provided" };
  //Checking if the site id and user id are valid
  try {
    // check if employed id and  site id exists in database with status true and delete false to already assigned error
    const proId = data.projectSiteID._id || data.projectSiteID;
    const rolId = data.roleId._id || data.roleId;
    const siteData = await isSiteandNameisExists(id, proId, rolId);
    if (siteData.status === false)
      return { status: siteData.status, message: siteData.message };
    //Getting the site information to check if it exists
    const siteInfo = await getSiteById(proId);
    if (!siteInfo.status)
      return { status: siteInfo.status, message: siteInfo.message };

    const employeInfo = await getEmployeById(rolId);
    if (!employeInfo.status)
      return { status: false, message: `Failed to retrieve employee` };

    const info = JSON.parse(employeInfo.data);
    const password = info.password;
    const email = info.email;
    if (id) {
      const updateAssign = {
        password,
        email,
        projectSiteID: proId,
        roleId: rolId,
        isActive: true,
      };
      console.log(updateAssign);
      const updateAssignData = await AssignProjectModel.updateOne(
        { _id: id },
        { $set: updateAssign }
      ).exec();

      if (!updateAssignData)
        return { status: false, message: "Faild to Update Assign..." };
      return {
        status: true,
        message: `The Project has  been updated Successfully`,
      };
    } else {
      const loginSiteId = randomInt(1000000, 9999999).toString();
      console.log("crypto number", loginSiteId);
      const assignData = { ...data, loginSiteId, email, password };
      console.log("assignData", assignData);

      const result = await assignSiteData(assignData);
      if (!result) return { status: false, message: "Failed to Assign" };
      return result;
    }
  } catch (e) {
    return { status: false, message: e };
  }
};

export const isSiteandNameisExists = async (id, projectSiteID, roleId) => {
  // we have check both them  at once  because they must be together
  try {
    if (!id) {
      console.log("without Edit run");
      const existingAssignment = await AssignProjectModel.findOne({
        roleId: roleId,
        isActive: true,
      });
      if (existingAssignment)
        return { status: false, message: "This Role already assigned" };
      const existingSite = await AssignProjectModel.findOne({
        projectSiteID: projectSiteID,
        isActive: true,
      });
      console.log(existingSite, "existing Site");
      if (existingSite) {
        return { status: false, message: "This Site is already assigned." };
      }
      return true;
    }
    if (id) {
      console.log("with id run");
      const existingAssignment = await AssignProjectModel.findOne({
        projectSiteID: projectSiteID,
        roleId: { $ne: roleId }, // Ensure employeeId is not the same
        isActive: true,
      });
      console.log(existingAssignment, "existing");
      if (existingAssignment) {
        return { status: false, message: "Site is already Assign" }; // Site is not assigned to the employee or not active
      }
    }
    return true; // No conflicts, assignment is allowed
    // const existinAssignment = await AssignProjectModel.findOne({
    //   roleId: { $ne: roleId },
    //   projectSiteID: { $ne: projectSiteID },
    //   isActive: true,
    // });
    // console.log("this is the data of employe", existinAssignment);
    // if (existinAssignment) {
    //   return false;
    // }
    // const assignProject = await AssignProjectModel.findOne({
    //   projectSiteID: projectSiteID,
    //   isActive: true,
    // });
    // console.log(assignProject);
    // if (assignProject) {
    //   return false;
    // }
    // return true;
  } catch (error) {
    console.log("this error come from isSiteandNameisExists", error);
    return { status: false, message: "Error checking while Assignment" };
  }
};

const assignSiteData = async (assignData) => {
  if (!assignData) return { status: false, message: "No Data assign" };
  try {
    const assign = new AssignProjectModel(assignData);
    const res = await assign.save();
    if (!res)
      return { status: false, message: "No Data saved. somthing wrong" };
    return { status: true, data: JSON.stringify(res) };
  } catch (error) {
    console.log("from assignSiteData", error);
    return { status: false, message: error };
  }
};

export const getAssignSiteData = async (keyword) => {
  try {
    let results = [];
    if (keyword) {
      const data = await AssignProjectModel.aggregate([
        // Perform a left outer join with the OfficeEmploye collection based on name and email fields
        {
          $lookup: {
            from: "officeemployes", // Name of the collection to join with
            localField: "roleId", // Field from the input documents (AssignProjectModel)
            foreignField: "_id", // Field from the documents of the "from" collection (OfficeEmployeModel)
            as: "roleId", // Output array field
          },
        },
        // Perform another left outer join with the ProjectSite collection based on projectSiteID field
        {
          $lookup: {
            from: "projectsites", // Name of the collection to join with
            localField: "projectSiteID", // Field from the input documents (AssignProjectModel)
            foreignField: "_id", // Field from the documents of the "from" collection (ProjectSiteModel)
            as: "projectSiteID", // Output array field
          },
        },
        // Perform a match operation to filter documents based on search criteria
        {
          $match: {
            delete: false,
            $or: [
              {
                "roleId.name": { $regex: String(keyword), $options: "i" },
              }, // Search in employee name
              {
                "projectSiteID.siteName": {
                  $regex: String(keyword),
                  $options: "i",
                },
              }, // Search in project site name
              {
                "projectSiteID.siteAddress": {
                  $regex: String(keyword),
                  $options: "i",
                },
              }, // Search in project site address
            ], // Include additional search criteria
          },
        },
      ]);
      const checkData = data.map((item) => {
        const roleIdObject = item.roleId.reduce(
          (acc, cur) => ({ ...acc, ...cur }),
          {}
        );
        const projectObject = item.projectSiteID.reduce(
          (acc, cur) => ({ ...acc, ...cur }),
          {}
        );
        return {
          ...item,
          roleId: roleIdObject,
          projectSiteID: projectObject,
        };
      });
      return (results = {
        status: true,
        data: JSON.stringify(checkData),
      });
    } else {
      const response = await AssignProjectModel.find({ delete: false })
        .populate([{ path: "projectSiteID" }, { path: "roleId" }])
        .sort({ createdAt: -1 })
        .exec();
      //console.log('response',response);
      if (!response) return { status: false, message: "no data found" };
      results = JSON.stringify(response);
      return { status: true, data: results };
    }
  } catch (error) {
    console.log("this is Get All Assign Site error", error);
    return { status: false, message: "Server Error" };
  }
};

export const assignSiteStatusUpdate = async (id) => {
  if (!id) return { status: false, message: "Not found" };
  try {
    let assignData = await AssignProjectModel.findOne({
      _id: id,
    });
    if (!assignData) {
      return { status: false, message: "No Employee Found!" };
    } else {
      const updatedStatus = !assignData.isActive;
      assignData = await AssignProjectModel.updateOne(
        { _id: id },
        { $set: { isActive: updatedStatus } }
      );
      const data = {
        status: true,
        message: "The  Status of the Assign Project has been Updated",
      };
      return data;
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: `Error Occurred in server problem` };
  }
};

export const assignSiteDelete = async (id) => {
  if (!id) return { status: false, message: "No Id Provided" };
  try {
    let assignData = await AssignProjectModel.findOne({
      _id: id,
    });
    if (!assignData) return { status: false, message: "Invalid Employee ID." };
    assignData = await AssignProjectModel.updateOne(
      { _id: id },
      { $set: { isActive: false, delete: true } }
    );
    return { status: true, message: "Assign Site Delete successfully..." };
  } catch (err) {
    console.log("Error in Deleting the assign Site : ", err);
    return { status: false, message: "Internal Error" };
  }
};

export const deleteAssignSiteById = async (id) => {
  try {
    // await connect();
    let res = await ProjectSiteModel.deleteOne({ _id: id }).exec();
    if (res.n === 0) throw new Error("Invalid Id");
    return "Delete Successfully";
  } catch (e) {
    console.log(e);
    return e.message;
  }
};
