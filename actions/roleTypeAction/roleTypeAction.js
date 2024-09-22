"use server";

import { connect } from "@/dbConfig/dbConfig";
import RoleTypesModel from "@/models/roleTypesModel";
import { revalidatePath } from "next/cache";
// # GET ALL SITE PROJECTS FROM THE DATABASE
export const getAllRoleType = async () => {
  try {
    await connect();
    const roles = await RoleTypesModel.find({ delete: false }).lean().exec();
    // console.log(JSON.stringify(projects));
    if (!roles || roles.length === 0) {
      return { success: false, message: "No Data Found" };
    } else {
      const roleData = JSON.stringify(roles);
      const data = {
        success: true,
        data: roleData,
      };
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};
// # UPDATE THE STATUS  OF A SPECIFIC PROJECT IN THE DATABASE
export const roleTypeUpdateStatusbyId = async (id) => {
  if (!id) return { success: false, message: "Invalid id" };
  try {
    await connect();
    let role = await RoleTypesModel.findOne({
      _id: id,
    });
    if (!role) {
      return { message: "Role Not Found", success: false };
    } else {
      const updatedStatus = !role.isActive;
      role = await RoleTypesModel.updateOne(
        { _id: id },
        { $set: { isActive: updatedStatus } }
      );
      // revalidatePath("/"); // revalidate the cache
      const data = {
        success: true,
        message: "The Role Type has been Updated",
      };
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};
// # UPDATE A SPECIFIC SITE PROJECT INFORMATION BY ID
export const handleRoleType = async (id, roleData) => {
  if (!roleData) return { success: false, message: "No Data Provided" };
  try {
    if (id) {
      let role = await RoleTypesModel.findById(id);
      if (!role)
        return { success: false, message: `Id not found please try  again` };
      const roleType = await RoleTypesModel.updateOne({ _id: id }, roleData);
      if (!roleType)
        return { success: false, message: "Failed to Update  the Record" };
      // revalidatePath("/"); // revalidate the path
      const data = {
        success: true,
        message: `Successfully Upadted Information`,
      };
      return data;
    } else {
      const addRoleType = new RoleTypesModel(roleData);
      const saveSite = await addRoleType.save();
      if (!saveSite)
        return {
          success: false,
          message: `Failed to Add Role Type Information`,
        };

      if (saveSite) {
        const data = {
          success: true,
          message: "Add RoleType Successfully...",
        };
        return data;
      }
    }
  } catch (error) {
    console.log("Error in updating site project information by Id ", error);
    return { success: false, message: `Internal Server Error` };
  }
  console.log("RoleType Updated Successfully");
};
// # DELETE A SPECIFIC SITE PROJECT BY ID
export const deleteRoleById = async (id) => {
  try {
    await connect();
    let role = await RoleTypesModel.findOne({
      _id: id,
    });
    if (!role) {
      return { message: "Role Not Found", success: false };
    } else {
      role = await RoleTypesModel.updateOne(
        { _id: id },
        { $set: { delete: true } }
      );
    }
    const data = {
      success: true,
      message: "The Role Type has been Deleted",
    };
    return data;
    // let res = await RoleTypesModel.deleteOne({ _id: id }).exec();
    // if (res.n === 0) throw new Error("Invalid Id");
    // return { status: 200, message: "Delete Successfully" };
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

// # THIS IS THE WORKING ON THE NEW VERSION
export const searchRoleTypeByKeywordNew = async (keyword) => {
  try {
    let results = [];
    await connect();
    if (keyword) {
      // Construct the query based on whether a search term is provided
      const query = String(keyword)
        ? {
            $or: [{ roleTitle: { $regex: String(keyword), $options: "i" } }],
          }
        : {};
      const data = await RoleTypesModel.find(query);
      return (results = {
        status: 200,
        data: JSON.stringify(data),
        count: data.length,
      });
    } else {
      results = await getAllRoleType();
    }
    return results;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
};
