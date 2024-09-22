"use server";
import { connect } from "@/dbConfig/dbConfig";
import AttendanceModel from "@/models/attendanceModel";
import EmployeModel from "@/models/employeeModel";
import OfficeEmployeeModel from "@/models/officeEmployeModel";
import {
  GenerateHashPassword,
  isPossibleBcryptHash,
} from "../roleAction/roleAction";
import { handleRequestDocument } from "../documentUploadAction/documentUploadAction";
import EmployeDocumentModel from "@/models/employeDocumentModel";

import { createCipheriv, randomBytes, createDecipheriv } from "crypto";
import { changeDateToString } from "../commonAction/commonAction";

/*
* Task 1: If Employee Say chnage payrate with false means update only in employee table otherwise  update in all attendance table
# 1.1: Because this task is very complex so we will always ask to user to chnage in all table or not
# 1.2: If user say yes then we will update all table otherwise we will update only employee table
# 1.3: We will use attendanceModel to update all table
*/

export const handleEmploye = async (data, id, isChecked) => {
  if (!data) return { status: false, message: "Please Provide Informations" };
  // if (!images) return { status: true, message: "success" };
  const payRateValidation = /^([1-9][\d]{0,7})(\.\d{0,2})?$/; // 1.5 or 15.68 or .34 only
  const Payrate = payRateValidation.test(String(Number(data.payRate)));
  if (Payrate === false) return { status: false, message: "Invalid Pay Rate" };
  try {
    await connect(); //connect to the database
    const {
      address,
      streetAddress,
      city,
      zipCode,
      country,
      accountName,
      accountNumber,
      sortCode,
      payRate,
    } = data;
    const eAddress = {
      address: address || "",
      streetAddress: streetAddress || "",
      city: city || "",
      zipCode: zipCode || "",
      country: country || "",
    };
    const bankDetail = {
      accountName: accountName || "",
      accountNumber: accountNumber || "",
      sortCode: sortCode || "",
    };
    if (id) {
      // We have to check email and phone  before updating the Employee's information because they are required fields in MongoDB
      const isExists = await EmployePhoneAndEmailExists(
        id,
        data.phone,
        data.email
      );
      if (!isExists.status)
        return { status: isExists.status, message: isExists.message };
      let res = await EmployeModel.findByIdAndUpdate(
        id,
        { $set: { ...data, eAddress: eAddress, bankDetail: bankDetail } },
        { new: true }
      );
      if (!res) return { status: false, message: "Somthing Went Wrong..." };
      if (isChecked) {
        const attendanceRecords = await AttendanceModel.find({
          "employeAttendance.employeeId": id,
        });
        // Iterate over each attendance record and update the totalPay for the employee
        for (const record of attendanceRecords) {
          for (const attendee of record.employeAttendance) {
            if (attendee.employeeId.toString() === id) {
              // Update totalPay based on newPayRate
              // we have to update only aPayRate
              attendee.aPayRate = payRate; // Update aPayRate
              attendee.totalPay = attendee.totalHours * payRate;
            }
          }
          // Save the updated attendance record
          await record.save();
        }
      }
      return { status: true, message: "Employee Record Update..." };
    } else {
      //create new employee
      const isExists = await EmployePhoneAndEmailExists(
        id,
        data.phone,
        data.email
      );

      if (!isExists.status) return isExists;
      const addEmploye = await EmployeModel.create({
        ...data,
        eAddress: eAddress,
        bankDetail: bankDetail,
      }); // create new employee
      if (!addEmploye)
        return { status: false, message: "Somthing Went Wrong..." }; // if the employee is not created
      // if (addEmploye._id) {
      //   // if the employee is created
      //   // await EmployeModel.find({}).sort({_id:-1}).limit(1) // get the last employee id
      //   try {
      //     const employeId = addEmploye._id.toString();
      //     const response = await handleRequestDocument(images, employeId); // upload images to cloudinary
      //     if (!response.success)
      //       return { success: false, message: "Somthing Went Wrong..." }; // if the employee document is not created
      //     return { success: true, message: "Employee Record Create..." }; // if the employee is created
      //   } catch (error) {
      //     console.log(error); // if the employee is created
      //   }
      // }
      if (addEmploye) {
        const data = {
          status: true,
          message: `Employee added successfully`,
        };
        return data;
      }
    }
  } catch (error) {
    return { status: false, message: "Somthing Went Wrong..." }; // if the employee is not created
    // console.log(Object.keys(error.keyValue));
    if (error.name === "ValidationError") {
      const errorMsg = Object.values(error.errors).map((el) => el.message);
      const joinErrorMsg = errorMsg.join(", ");
      const data = {
        message: `${joinErrorMsg}`,
      };
      return data;
    }
    if (error && error.code === 11000) {
      // Handle duplicate key error (email already exists)
      const result = handleDuplicateKeyError(error);
      return result;
    } else {
      // Handle other errors
      console.error("Error creating user:", error.message);
    }
  }
};

// # HANDLE  DUPLICATE KEY ERRORS
const handleDuplicateKeyError = (error) => {
  let result = {};
  const field = Object.keys(error.keyValue)[0];
  result = {
    message: `${field} already exist. Please use a different ${field}.`,
  };
  return result;
};

const EmployePhoneAndEmailExists = async (id, phone, email) => {
  console.log(id);
  try {
    if (id) {
      if (email === "") {
        const phoneExist = await EmployeModel.findOne({
          phone,
          _id: { $ne: id },
        });
        if (phoneExist)
          return { status: false, message: "Phone number already exist" };
        return { status: true, message: "Phone number is available" };
      } else {
        const phoneExist = await EmployeModel.findOne({
          phone,
          _id: { $ne: id },
        });
        const emailExist = await EmployeModel.findOne({
          email,
          _id: { $ne: id },
        });
        if (phoneExist || emailExist) {
          return {
            status: false,
            message: "This Phone  or Email is already in use.",
          };
        } else {
          return { status: true, message: "Both fields are available" };
        }
      }
    } else {
      // if email is empty  then only check for the phone otherwise both should be checked $or operator
      if (email === "") {
        const phoneCheck = await EmployeModel.findOne({ phone: phone });
        if (phoneCheck) {
          return {
            status: false,
            message: "The provided phone number is already registered.",
          };
        } else {
          return { status: true };
        }
      } else {
        const combinedCheck = await EmployeModel.findOne({
          $or: [{ email }, { phone }],
        });
        if (combinedCheck) {
          return {
            status: false,
            message:
              "The provided email or phone number is already registered.",
          };
        } else {
          return { status: true };
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllEmployeesForSiteAssign = async () => {
  try {
    const response = await EmployeModel.find().select(
      "_id firstName lastName payRate"
    );
    const data = JSON.stringify(response);
    return { data };
  } catch (error) {
    console.log("Error while fetching all employees for site assign", error);
  }
};

export const getAllEmployees = async (keyword, filter) => {
  const { page, limit } = filter;
  try {
    let employees;

    const keywordQuery = keyword
      ? {
          $or: [
            { firstName: { $regex: String(keyword), $options: "i" } },
            { lastName: { $regex: String(keyword), $options: "i" } },
          ],
        }
      : {}; // search by name or email

    const totalEmployees = await EmployeModel.countDocuments(keywordQuery);
    if (keyword) {
      const filterData = await EmployeModel.find(keywordQuery)
        .skip((page - 1) * limit)
        .limit(limit);
      employees = filterData;
    } else {
      employees = await EmployeModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
    }
    // RangeError handling  for empty array
    if (!employees || !Array.isArray(employees))
      return { status: 503, message: "No employee found" };

    function convertDateToString(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    }
    // password and bank details not send to client side using delete
    const filteredEmps = employees.map((employee) => ({
      ...employee._doc,
      ePassword: undefined,
      // bankDetail: undefined, // delete bank details
      // eAddress: employee.eAddress,
    }));
    // employees.forEach((employee) => delete employee.password);
    const data = {
      status: true,
      count: totalEmployees,
      data: JSON.stringify(filteredEmps),
    };

    return data;
  } catch (err) {
    return {
      status: false,
      message: "Error fetching employees!, Refresh Page",
    };
  }
};

export const updateEmployee = async (id, updatedData) => {
  try {
    const employee = await EmployeModel.updateOne(
      { _id: id },
      { $set: updatedData }
    );
    return employee;
  } catch (err) {
    console.log(`Error updating employee with ID "${id}"`, err);
  }
};

export const employeUpdateStatus = async (id) => {
  if (!id) return { status: false, message: "No  id provided" };
  try {
    await connect();
    let employee = await EmployeModel.findOne({
      _id: id,
    });
    if (!employee) return { status: false, message: "Invalid Employee ID." };
    employee.isActive = !employee.isActive;
    employee = await employee.save();
    return { status: true, message: "Status Update" };
  } catch (err) {
    console.log("Error in updating employee status : ", err);
    return { status: false, message: "Internal Error" };
  }
};

export const employeDelete = async (id) => {
  if (!id) return { status: false, message: "No Id Provided" };
  try {
    await connect();
    let employee = await EmployeModel.findOne({
      _id: id,
    });
    if (!employee) return { status: false, message: "Invalid Employee ID." };
    employee.delete = !officeEmploye.delete;
    employee.isActive = false; // set isactive to false when deleting an employe
    employee = await officeEmploye.save();
    return { status: true, message: "Employe Delete successfully..." };
  } catch (err) {
    console.log("Error in updating employee status : ", err);
    return { status: false, message: "Internal Error" };
  }
};
// exporting the function which will add data in MongoDB database
export const addEmployee = async (employeeData) => {
  // checking if email is already exists or not
  let error = null;
  const existingUser = await EmployeModel.findOne({
    email: employeeData.email,
  }).catch((err) => console.error(err));
  if (existingUser) {
    error = "Email is already registered";
  } else {
    const user = new EmployeModel(employeeData);
    const result = await user
      .save()
      .then((user) => {
        console.log("New User Created");
        return user;
      })
      .catch((err) => console.error(err));
  }
  return { error, user: result };
};
// # ADD OFFICE EMPLOYE
export const handleOfficeEmployee = async (id, data) => {
  // check if email and phone  already exist in db
  if (!data) return { success: false, message: "No Data Provided" };
  try {
    if (id) {
      // update an existing office employee
      const updatedEmp = await OfficeEmployeeModel.findOne({ _id: id }).exec();
      if (!updatedEmp) {
        return { success: false, message: "Employee Not Found" };
      }
      // checking  for unique fields both email and phone
      const hasSameEmail = await OfficeEmployeeModel.findOne({
        email: data.email,
        delete: false, // only check for active employees
        _id: { $ne: id },
      }).exec();
      const hasSamePhone = await OfficeEmployeeModel.findOne({
        phoneNumber: data.phoneNumber,
        delete: false, // only check for active employees
        _id: { $ne: id },
      }).exec();
      if (hasSameEmail || hasSamePhone) {
        throw new Error("This Email or Phone Number is Already In Use");
      }
      // check password is hash or not
      const mayBeHash = await isPossibleBcryptHash(data.password);
      if (mayBeHash) {
        Object.assign(updatedEmp, data);
      } else {
        const hashPass = await GenerateHashPassword(data.password);
        Object.assign(updatedEmp, data, { password: hashPass }); // update the existing employee
      }
      // assign object and save
      // Object.assign(data, { password: hashPass });
      const updatedData = await updatedEmp.save();
      // updatedEmp.set(data);
      // const updatedData = await updatedEmp.save(); // save the updated employee
      // await updatedEmp.set(data).save();
      if (!updatedData)
        return { success: false, message: "Error Updating Employee" };
      return { success: true, data: JSON.stringify(updatedData) };
    } else {
      const { email, phoneNumber, password } = data;
      const hashPass = await GenerateHashPassword(password);
      await connect();
      let userExist = await OfficeEmployeeModel.findOne({
        delete: false, // only check for active employees
        $or: [{ email }, { phoneNumber }],
      });
      if (!userExist) {
        const newUser = new OfficeEmployeeModel({
          ...data,
          password: hashPass,
        });
        const result = await newUser.save();
        if (!result)
          return {
            success: false,
            message: "Failed to create office Employee",
          };
        return {
          success: true,
          message: "Successfully added office employee",
          data: JSON.stringify(result),
        };
      } else {
        return {
          success: false,
          message: "Email or Phone number is already taken",
        };
      }
    }
  } catch (error) {
    console.log(error.message);
    return {
      error: "Failed to create office employee",
    };
  }
  // const isExists = await OfficeEmployeeModel.findOne({ email }).lean().exec();
};

// # GET ALL SITE PROJECTS FROM THE DATABASE
export const getAllOfficeEmploye = async () => {
  try {
    await connect();
    const roles = await OfficeEmployeeModel.find({ delete: false })
      .populate("roleType")
      .exec();
    // console.log(JSON.stringify(projects));
    if (!roles || roles.length === 0) {
      return { success: false, message: "No Data Found" };
    } else {
      if (!roles) return { success: false, message: "Server Error" };
      const roleData = JSON.stringify(roles);
      const data = {
        success: true,
        count: roles.length,
        data: roleData,
      };
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const searchOfficeEmployeByKeyword = async (keyword) => {
  try {
    await connect();
    let results = [];
    if (keyword) {
      // Construct the query based on whether a search term is provided
      let query = String(keyword)
        ? {
            $or: [
              { name: { $regex: String(keyword), $options: "i" } },
              { department: { $regex: String(keyword), $options: "i" } },
            ],
          }
        : {};

      // don't fetch  deleted records
      const data = await OfficeEmployeeModel.aggregate([
        {
          $lookup: {
            from: "roletypes", // Name of the collection to join
            localField: "roleType", // Field from the input documents (RoleModel)
            foreignField: "_id", // Field from the documents of the "from" collection (ProjectSiteModel)
            as: "roleType", // Output array field
          },
        },
        {
          $match: {
            delete: false,
            $or: [
              {
                "roleType.roleTitle": {
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
      const modifiedData = data.map((obj) => {
        const { roleType = [] } = obj; // Destructure, set default for roleType if empty
        const firstRole = roleType[0]; // Access the first element (assuming single role per object)
        return { ...obj, roleType: firstRole }; // Create new object with first role or undefined
      });
      return (results = {
        success: true,
        count: data.length,
        data: JSON.stringify(modifiedData),
      });
    } else {
      results = await getAllOfficeEmploye();
    }
    return results;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
};

export const officeEmployeUpdateStatus = async (id) => {
  if (!id) return { status: false, message: "No  id provided" };
  try {
    await connect();
    let officeEmploye = await OfficeEmployeeModel.findOne({
      _id: id,
    });
    if (!officeEmploye)
      return { status: false, message: "Invalid Employee ID." };
    officeEmploye.isActive = !officeEmploye.isActive;
    officeEmploye = await officeEmploye.save();
    return { status: true, message: "Status Update" };
  } catch (err) {
    console.log("Error in updating employee status : ", err);
    return { status: false, message: "Internal Error" };
  }
};

export const officeEmployeDelete = async (id) => {
  if (!id) return { status: false, message: "No Id Provided" };
  try {
    await connect();
    let officeEmploye = await OfficeEmployeeModel.findOne({
      _id: id,
    });
    if (!officeEmploye)
      return { status: false, message: "Invalid Employee ID." };
    officeEmploye.delete = !officeEmploye.delete;
    officeEmploye.isActive = false; // set isactive to false when deleting an employe
    officeEmploye = await officeEmploye.save();
    return { status: true, message: "Employe Delete successfully..." };
  } catch (err) {
    console.log("Error in updating employee status : ", err);
    return { status: false, message: "Internal Error" };
  }
};

export const getEmployeById = async (empId) => {
  if (!empId) return { status: false, message: "No Employee Id Provided" };
  try {
    const response = await OfficeEmployeeModel.findOne({ _id: empId });
    if (!response)
      return {
        status: false,
        message: `Employee not found with the provided Id ${empId}`,
      };
    return { status: true, data: JSON.stringify(response) };
  } catch (error) {
    return { status: false, message: "Server error" };
  }
};

// Function to update totalPay for all attendance records of a particular employee
async function updateTotalPayForEmployee(employeeId, newPayRate) {
  try {
    // Find attendance records for the specified employee
    const attendanceRecords = await AttendanceModel.find({
      "employeAttendance.employeeId": employeeId,
    });

    // Iterate over each attendance record and update the totalPay for the employee
    await Promise.all(
      attendanceRecords.map(async (attendanceRecord) => {
        attendanceRecord.employeAttendance.forEach((attendee) => {
          if (attendee.employeeId.toString() === employeeId) {
            // Update totalPay based on newPayRate
            attendee.totalPay = attendee.totalHours * newPayRate;
          }
        });

        // Save the updated attendance record
        await attendanceRecord.save();
      })
    );

    console.log(`TotalPay updated for employee ${employeeId}`);
  } catch (error) {
    console.error("Error updating totalPay:", error);
  }
}

// Create Encryption Employe Id using the Crypto createCipheriv
function encryptId(id) {
  const key =
    "110498ba6d3c820935ad33c9ccf2964932aac4e3e5ab0803e026c8e9e99d27eb"; // Generate a random key
  const iv = randomBytes(16); // Initialization vector
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);

  // const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(
    JSON.stringify({
      id,
    }),
    "utf8",
    "hex"
  );
  encrypted += cipher.final("hex");
  // send like encrypted?
  return encrypted;
  return encrypted;

  // return {
  //   iv: iv.toString("hex"),
  //   encryptedData: encrypted,
  // };
}
