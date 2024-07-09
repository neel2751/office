"use server";
import { connect } from "@/dbConfig/dbConfig";
import OfficeEmployeeModel from "@/models/officeEmployeModel";
import RoleModel from "@/models/roleModel";
import ProjectSiteModel from "@/models/siteProjectModel";
import bcrypt from "bcryptjs";

// # ADD SITE  PROJECT DATA TO DATABASE
export const addRole = async (newdata) => {
  try {
    await connect();
    const addRole = new RoleModel(newdata);
    const saveSite = await addRole.save();
    if (saveSite) {
      const data = {
        status: 201,
        message: "Add Site Successfully...",
      };
      return data;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    return error.message;
  }
};
// # GET ALL SITE PROJECTS FROM THE DATABASE
export const getAllRole = async () => {
  try {
    await connect();
    const roles = await RoleModel.find().populate("projectSiteID").exec();
    // console.log(JSON.stringify(projects));
    if (!roles || roles.length === 0) {
      return "No Data Found";
    } else {
      const roleData = JSON.stringify(roles);
      const data = {
        data: roleData,
      };
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
// # UPDATE THE STATUS  OF A SPECIFIC PROJECT IN THE DATABASE
export const roleUpdateStatus = async (id) => {
  try {
    await connect();
    let role = await RoleModel.findOne({
      _id: id,
    });
    if (!role) {
      return new Response("Team Member Not Found", { status: 404 });
    } else {
      const updatedStatus = !role.isActive;
      role = await RoleModel.updateOne(
        { _id: id },
        { $set: { isActive: updatedStatus } }
      );
      const data = {
        status: 201,
        message: "The  Status of the Site Project has been Updated",
      };
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};
// # UPDATE A SPECIFIC SITE PROJECT INFORMATION BY ID
export const updateRoleById = async (id, roleData) => {
  // if (!Object.keys(siteproject).length) throw new Error("No Data Provided");
  if (!id) return { message: "Id not found..." };
  try {
    await connect();
    // this is the find by id get the particular data from id
    // let index = allData.findIndex((x) => x._id == id);
    let role = await RoleModel.findById(id);
    if (!role) return { message: `Id not found please try  again` };
    await RoleModel.updateOne({ _id: id }, roleData);
    const data = {
      status: 200,
      message: `Successfully Upadted ${role.roleName}'s Information`,
    };
    return data;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};
// # DELETE A SPECIFIC SITE PROJECT BY ID
export const deleteRoleById = async (id) => {
  try {
    await connect();
    let res = await ProjectSiteModel.deleteOne({ _id: id }).exec();
    if (res.n === 0) throw new Error("Invalid Id");
    return "Delete Successfully";
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

// # THIS IS THE WORKING ON THE NEW VERSION
export const searchRoleByKeyword = async (keyword) => {
  try {
    await connect();
    let results = [];
    if (keyword) {
      // Construct the query based on whether a search term is provided
      const query = String(keyword)
        ? {
            $or: [
              { roleName: { $regex: String(keyword), $options: "i" } },
              { roleType: { $regex: String(keyword), $options: "i" } },
            ],
          }
        : {};

      const data = await RoleModel.aggregate([
        {
          $lookup: {
            from: "projectsites", // Name of the collection to join
            localField: "projectSiteID", // Field from the input documents (RoleModel)
            foreignField: "_id", // Field from the documents of the "from" collection (ProjectSiteModel)
            as: "siteInfo", // Output array field
          },
        },
        {
          $match: {
            $or: [
              {
                "siteInfo.siteName": { $regex: String(keyword), $options: "i" },
              },
              {
                "siteInfo.siteAddress": {
                  $regex: String(keyword),
                  $options: "i",
                },
              },
              query, // Include the previous query conditions here
            ],
            // You can use other conditions based on your search criteria
          },
        },
      ]).exec();
      // query ing the database with the constructed
      //   const data = await RoleModel.find(query).populate("projectSiteID").exec();
      //   const populatedProjectSiteIDs = data.map((item) => item.projectSiteID);

      // Performing a separate query on the ProjectSiteIDModel
      //   const projectSiteIDData = await ProjectSiteModel.find({
      //     _id: { $in: populatedProjectSiteIDs },
      //   });
      //   console.log(projectSiteIDData);
      return (results = {
        data: JSON.stringify(data),
      });
    } else {
      results = await getAllRole();
    }
    return results;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
};

// # ADD OFFICE EMPLOYE
export const addOfficeEmployee = async (data) => {
  // check if email and phone  already exist in db
  try {
    const { email, phoneNumber, password } = data;
    const hashPass = await GenerateHashPassword(password);
    await connect();
    let userExist = await OfficeEmployeeModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (!userExist) {
      const newUser = new OfficeEmployeeModel({ ...data, password: hashPass });
      const result = await newUser.save();
      return {
        message: "Successfully added office employee",
        data: JSON.stringify(result),
      };
    } else {
      return {
        error: "Email or Phone number is already taken",
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      error: "Failed to create office employee",
    };
  }
  // const isExists = await OfficeEmployeeModel.findOne({ email }).lean().exec();
};

export const compareHashPassowrd = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log(error.message);
  }
};

export const isPossibleBcryptHash = async (password) => {
  const bcryptPattern = /^\$2[ay]\$\d+\$[0-9a-zA-Z./]+$/;
  return bcryptPattern.test(password);
};

export const GenerateHashPassword = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("Error hashing password: ", error);
  }
};
