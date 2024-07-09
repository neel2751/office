"use server";
import { connect } from "@/dbConfig/dbConfig";
import OfficeEmployeeModel from "@/models/officeEmployeModel";
import bcrypt from "bcryptjs";

export const LoginData = async (email, password) => {
  if (!email || !password)
    return { status: false, message: "Please Provide  all details" };
  password = password.trim();
  email = email.trim();
  try {
    await connect();
    const foundData = await OfficeEmployeeModel.findOne({ email })
      .lean()
      .exec();
    if (!foundData)
      return {
        status: false,
        message: "Email  Not Found",
      };
    if (foundData.isActive === false)
      return {
        status: false,
        message: "Your account is Inactive! Please contact Admin...",
      };
    // Check Password
    const isMatch = await isMatchedPassword(password, foundData.password);
    if (!isMatch)
      return {
        status: false,
        message: "Invalid Password! Try  Again...",
      };
    if (foundData.isSuperAdmin) {
      foundData["role"] = "superAdmin";
    } else if (foundData.isAdmin) {
      foundData["role"] = "siteAdmin";
    } else {
      foundData["role"] = "user";
    }
    delete foundData["password"];
    return {
      status: true,
      data: foundData,
    };
  } catch (error) {
    return error.message;
  }
};

export const isMatchedPassword = async (password, hashword) => {
  try {
    // console.log(password, hashword);
    return await bcrypt.compareSync(password, hashword);
  } catch (error) {
    console.log(`Error in Matching Password ${error}`);
  }
};
