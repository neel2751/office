"use server";
import { connect } from "@/dbConfig/dbConfig";
import OfficeEmployeeModel from "@/models/officeEmployeModel";
import bcrypt from "bcryptjs";
import UserSession from "@/models/sessionModel";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/option";
import { signOut } from "next-auth/react";
import { sendMail } from "../emailAction/emailAction";

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
      foundData["role"] = "admin";
    } else {
      foundData["role"] = "user";
    }
    delete foundData["password"];
    foundData["employeType"] = "OfficeEmploye";
    return {
      status: true,
      data: foundData,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Something Went Wrong! Please Try Again...",
    };
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

export const storeSession = async (data) => {
  try {
    const {
      _id: userId,
      employeType: userType,
      platform,
      browser,
      device,
      query: ipAddress,
      country,
      city,
      zip,
      lat: latitude,
      lon: longitude,
      isp,
    } = data;
    const obj = {
      userId,
      userType,
      platform,
      browser,
      device,
      ipAddress,
      country,
      city,
      zip,
      latitude,
      longitude,
      isp,
    };
    const alreadyStore = await UserSession.findOne({ userId, ipAddress });
    if (alreadyStore) {
      const update = await UserSession.updateOne({ userId, ipAddress }, obj);
      if (update) {
        // await sendMail({ ...obj, email: data.email });
        return { status: true, message: "Session Updated" };
      }
    } else {
      const session = await UserSession.create(obj);
      if (session) {
        await sendMail({ ...obj, email: data.email });
        return { status: true };
      }
    }
    return { status: false, message: "Failed to store session" };
  } catch (error) {
    console.log(`Error in Storing Session ${error}`);
    return { status: false, message: "Failed to store session" };
  }
};

export const getSessionData = async () => {
  try {
    const session = await getServerSession(options);
    if (!session) return signOut();
    const user = await UserSession.findOne({ userId: session?.user?._id });
    if (!user) return signOut();
    return { status: true, data: JSON.stringify(user) };
  } catch (error) {}
};
