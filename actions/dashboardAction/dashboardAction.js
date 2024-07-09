"use server";

import { connect } from "@/dbConfig/dbConfig";
import AttendanceModel from "@/models/attendanceModel";
// import cron from "node-cron";

import EmployeModel from "@/models/employeeModel";
import mongoose from "mongoose";

// All employe length with Active and  Inactive employee
export const employeeLength = async () => {
  try {
    // we have find active and inactive and pending as well  employees.
    let data = await EmployeModel.find({})
      .sort([["createdAt", -1]])
      .exec();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//we have to check if enddate is before three month to today date  or not, If yes then send a mail for reminder.
// send reminder mail to employee for renew of visa
export const employeVisaExpire = async () => {
  try {
    await connect();
    const threeFromNow = new Date();
    threeFromNow.setMonth(threeFromNow.getMonth() + 3);
    const employeeData = await EmployeModel.find({
      eVisaExp: { $lte: threeFromNow },
    }).exec();
    const currentDate = new Date();
    const isExpire = await EmployeModel.find({
      eVisaExp: { $lte: currentDate },
    }).exec();
    if (!employeeData.length) {
      return "No Employee Data Found!";
    } else {
      // cron.schedule("* * * * *", ()=>{
      //   employeeData.forEach((element)=>{
      //     var month = element.endDate.getUTCMonth()+1;
      //     var date = element.endDate.getUTCDate();
      //     var year = element.endDate.getUTCFullYear();
      //     var today = new Date();
      //     var tmonth=today.getUTCMonth()+1;
      //     var tdate=today.getUTCDate();
      //     var tyear=today.getUTCFullYear();

      //     if(tmonth==month && tdate>date || tyear > year){
      //       const msg={
      //         to : element.email,
      //         from : 'noreply@hrm.com',
      //         subject :'Your Visa is Expired',
      //         text:'Dear Sir/Madam,'+"\r\n"+`Your VISA will be expired on ${month}/${date}/${year}. Please Renew your
      //         visa _expiry_date : ${month}/${date}/${year}`
      //       };

      //       sgMail.send(msg).then(()=>console.log('Email sent')).catch((err)=>console.log(err));
      //     }
      //   });
      // })

      return {
        status: true,
        count: employeeData.length,
        isExpire: isExpire.length,
        data: JSON.stringify(employeeData),
        message: `found  ${employeeData.length} employees`,
      };
    }
    //   employeeData.forEach(async (element) => {
    //     const dateDiff = require("date-diff");
    //     var diff = dateDiff.asHours(
    //       new Date(),
    //       element.endDate,
    //       "milliseconds"
    //     );

    //     // check the difference between current time and end date, if it is less than 72 hours then send email
    //     // check the difference between current time and end date, if it is less than a day then send email
    //     //send email after 2 days left for the expiry of visa
    //     if (diff <= 48 * 60 * 60 * 1000) {
    //       require("./mailer").visaRemainLessThanTwoDays(element);
    //     }
    //   });
  } catch (error) {
    console.log(error.message);
  }
};

export const checkEndDate = async () => {
  var currentDate = new Date();
  try {
    let data = await EmployeModel.updateMany(
      { end_date: { $lt: currentDate }, status: "Active" },
      { $set: { status: "InActive", updatedAt: currentDate } },
      function (err, rawResponse) {
        if (err) throw err;
      }
    );
    return data;
  } catch (error) {
    console.log("Error : ", error);
  }
};

// let checkEndDate = setInterval(() => {
//   let current_date = new Date();
//   let allEmployeeData = employeeLength().then((data) => {
//     for (var i of data) {
//       var end_date = new Date(i.endDate);
//       if (current_date > end_date) {
//         EmployeModel.updateOne(
//           { _id: i._id },
//           {
//             $set: { status: "InActive", updatedBy: "System" },
//             $unset: { endDate: "" },
//           }
//         );
//       } else if (current_date < end_date && current_date != null) {
//         EmployeModel.updateOne(
//           { _id: i._id },
//           {
//             $set: { status: "InActive", updatedBy: "System" },
//             $unset: { endDate: "" },
//           }
//         );
//       } else {
//         EmployeModel.updateOne(
//           { _id: i._id },
//           { $set: { status: "InActive" } },
//           function (err) {
//             if (!err) {
//               console.log("Updated Successfully");
//             } else {
//               console.log("Error Updating Data!");
//             }
//           }
//         );
//       }
//     }
//   });
// }, 5000);

// Get all the active employee list
export const getActiveEmployeeList = async () => {
  try {
    let actives = await EmployeModel.find({ status: "Active" })
      .select("name email phone address role status createdAt")
      .sort([["createdAt", "descending"]])
      .lean();
    if (!actives || actives.length === 0) throw new Error("No Employee Found!");
    else return actives;
  } catch (err) {
    throw err;
  }
};

// Get all the active Employee with pagination
export const getActiveEmployee = async (page, limit) => {
  page = parseInt(page ? page : 0);
  limit = parseInt(limit ? limit : 6);
  const skip = page * limit;
  try {
    var data = await EmployeModel.find({ status: "Active" })
      .skip(skip)
      .limit(limit)
      .sort("-status")
      .populate("designation")
      .exec();
    if (!data) {
      throw new Error("Error Occurred!");
    } else {
      return data;
    }
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

// Get All the data form Once like active, inactive, total, enddate
export const getEmpSummaryData = async () => {
  try {
    await connect();
    const threeFromNow = new Date();
    threeFromNow.setMonth(threeFromNow.getMonth() + 3);
    const result = await EmployeModel.aggregate([
      {
        $group: {
          _id: "$employeeId", // Group by employeeId
          totalEmployees: { $sum: 1 }, // Count total number of employees
          activeEmployees: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          }, // Count active employees
          inactiveEmployees: {
            $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] },
          }, // Count inactive employees
          expiredEmployees: {
            $sum: { $cond: [{ $lte: ["$eVisaExp", new Date()] }, 1, 0] },
          }, // Count expired employees (endDate <= current date)
          reminderEmployees: {
            $push: { name: "$firstName", eVisaExp: "$eVisaExp" }, // Push name and eVisaExp fields to an array
          },
        },
      },
    ]).exec();

    if (result[0]._id === null) {
      return { status: true, data: JSON.stringify(result[0]) };
    } else {
      return { status: false, message: "No Data Found!" };
    }
  } catch (error) {
    console.log("Error at getting employee summary data : ", error);
    return { status: false, message: "Internal Server Error" };
  }

  //   // Total Active Employee
  //   const activeCount = await EmployeModel.countDocuments({ status: "Active" });

  //   // Total Inactive Employee
  //   const inactiveCount = await EmployeModel.countDocuments({ status: "Inactive" });

  //   // Total Designations
  //   const designationCount = await DesignationModel.countDocuments();

  //   // Get End Date Employee
  //   let todayDate = moment().format("YYYY-MM-DD");
  //   const endDateCount = await EmployeModel.countDocuments({
  //     end_date: { $lt: todayDate },
  //   });
};

// count weekly employee totalPay how much we have to pay to employee this week and this month
export const getEmployeeSummaryWeekMonthData = async () => {
  try {
  } catch (e) {}
};

// Function to calculate weekly and monthly total pay for employees
// export async function calculateTotalPay() {
//   try {
//     // Fetch all employees from the database
//     const employees = await EmployeModel.find();

//     // Get the current date and the date one week ago
//     const currentDate = new Date();
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//     // Get the date one month ago
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//     // Initialize variables to store total pay for weekly and monthly employees
//     let totalWeeklyPay = 0;
//     let totalMonthlyPay = 0;

//     // Iterate through each employee
//     for (const employee of employees) {
//       // Fetch attendance records for the employee within the past week
//       const weeklyAttendance = await AttendanceModel.find({
//         employeeId: employee._id,
//         "employeAttendance.aDate": { $gte: oneWeekAgo, $lte: currentDate },
//       });

//       console.log("weeklyAttendance", weeklyAttendance);

//       // Fetch attendance records for the employee within the past month
//       const monthlyAttendance = await AttendanceModel.find({
//         employeeId: employee._id,
//         "employeAttendance.aDate": { $gte: oneMonthAgo, $lte: currentDate },
//       });

//       // Iterate through weekly attendance records and calculate total pay
//       for (const attendance of weeklyAttendance) {
//         for (const employeeAttendance of attendance.employeAttendance) {
//           if (
//             employeeAttendance.employeeId.toString() === employee._id.toString()
//           ) {
//             totalWeeklyPay += employeeAttendance.totalPay;
//           }
//         }
//       }

//       // Iterate through monthly attendance records and calculate total pay
//       for (const attendance of monthlyAttendance) {
//         for (const employeeAttendance of attendance.employeAttendance) {
//           if (
//             employeeAttendance.employeeId.toString() === employee._id.toString()
//           ) {
//             totalMonthlyPay += employeeAttendance.totalPay;
//           }
//         }
//       }
//     }

//     // Output the total pay for the past week and month for each employee
//     console.log("Total Weekly Pay:", totalWeeklyPay);
//     console.log("Total Monthly Pay:", totalMonthlyPay);
//   } catch (error) {
//     console.error("Error calculating total pay:", error);
//   }
// }

// export async function calculateTotalPay(paymentType, startDate, endDate) {
//   try {
//     await connect();
//     // Fetch all employees from the database
//     const employees = await EmployeModel.find({ paymentType });

//     let startDate, endDate;
//     if (paymentType == "Weekly") {
//       endDate = new Date();
//       startDate = new Date(endDate);
//       startDate.setDate(startDate.getDate() - 7);
//     } else {
//       endDate = new Date();
//       startDate = new Date(endDate);
//       startDate.setDate(startDate.getMonth() - 1);
//     }
//     let totalPay = 0;
//     let hoursWorked = 0;
//     // Iterate through each employee
//     for (const employee of employees) {
//       // Get their relevant attendance records within the last 7 days/months
//       const attendanceRecord = await AttendanceModel.find({
//         "employeAttendance.employeeId": employee._id,
//         "employeAttendance.aDate": { $gte: startDate, $lte: endDate },
//       }).sort({ "employeAttendance.aDate": -1 });
//       for (const attendance of attendanceRecord) {
//         for (const employeAttendance of attendance.employeAttendance) {
//           if (
//             employeAttendance.employeeId.toString() === employee._id.toString()
//           ) {
//             totalPay += employeAttendance.totalPay;
//             hoursWorked += employeAttendance.totalHours;
//           }
//         }
//       }
//     }
//     // Output total pay for the time period and payment type
//     console.log(
//       `Total ${paymentType}  Pay for ${startDate.toDateString()} to ${endDate.toDateString()}: with Total Hours ${hoursWorked}`,
//       totalPay
//     );
//   } catch (error) {
//     console.error("Error calculating total pay:", error);
//   }
// }

export async function getCurrentDateTotalPay() {
  try {
    const currentDate = new Date();
    let totalPay = 0;
    const currentDateData = await AttendanceModel.find({
      "employeAttendance.aDate": {
        $gte: new Date(currentDate.setHours(0, 0, 0, 0)), // Start of current date
        $lt: new Date(currentDate.setHours(23, 59, 59, 999)), // End of current date
      },
    });
    for (const employeData of currentDateData) {
      for (const attendanceData of employeData.employeAttendance) {
        totalPay += attendanceData.totalPay;
      }
    }
    // Extract total pay from the result
    console.log("Total pay for all employees today:", totalPay);
  } catch (error) {
    console.error("Error getting current date total pay: ", error);
  }
}
// Get weekly total pay for an employee
export async function getWeeklyTotalPay(employeeID) {
  if (!employeeID || typeof employeeID !== "string")
    throw Error("Invalid Employee ID");
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekStart = new Date();
    thisWeekStart.setHours(0, 0, 0, 0);
    const data = await AttendanceModel.findOne({
      _id: employeeID,
      "employeAttendance.aDate": { $gte: thisWeekStart, $lte: oneWeekAgo },
    }).sort([["employeAttendance.aDate", "asc"]]);
    if (!data) return null;
    let totalWorkingDays = 0;
    let totalWorkingHours = 0;
    for (let i = 1; i < data.employeAttendance.length; i++) {
      const presentDay = data.employeAttendance[i];
      const prevDay = data.employeAttendance[i - 1];
      if (presentDay.isAbsent && !prevDay.isAbsent) {
        totalWorkingDays++;
        totalWorkingHours += presentDay.workingHour;
      }
    }
    return {
      workingDays: totalWorkingDays,
      workingHours: totalWorkingHours / 60,
    };
  } catch (err) {
    console.error(`Failed to fetch Weekly Total Pay : ${err}`);
    return err;
  }
}

export async function calculateTotalPay(
  paymentType,
  startDate,
  endDate,
  page,
  limit
) {
  if (paymentType) {
    const employeId = "6604343e1bae027945f29089"; // replace with employee id
    const response = await allEmployeeDataWithDateRange(
      paymentType,
      startDate,
      endDate,
      page,
      limit
    );
    return response;
  } else {
    try {
      await connect();

      const totalPayAggregate = await AttendanceModel.aggregate([
        {
          $match: {
            "employeAttendance.aDate": { $gte: startDate, $lte: endDate },
          },
        },
        {
          $unwind: "$employeAttendance",
        },
        {
          $match: {
            "employeAttendance.employeeId": {
              $in: (
                await EmployeModel.find({ paymentType })
              ).map((employee) => employee._id),
            },
            "employeAttendance.aDate": { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: null,
            totalPay: { $sum: "$employeAttendance.totalPay" },
            totalHours: { $sum: "$employeAttendance.totalHours" },
          },
        },
        {
          $project: {
            _id: 0,
            totalPay: 1,
            totalHours: 1,
          },
        },
      ]);

      const result = totalPayAggregate[0];
      console.log(result); // { totalPay: 1000, totalHours: 40 } for example
      const totalPay = result ? result.totalPay : 0;
      const totalHours = result ? result.totalHours : 0;

      console.log(
        `Total ${paymentType} Pay for ${startDate.toDateString()} to ${endDate}: with Total Hours ${totalHours}`,
        totalPay
      );
    } catch (error) {
      console.error("Error calculating total pay:", error);
    }
  }
}

// Currently we testing this query  with the following data
export async function calculateTotalPaywithPaymentType(startDate, endDate) {
  const paymentType = "Monthly"; // for testing
  console.log(paymentType);
  try {
    await connect();

    const employeeIds = (
      await EmployeModel.find({ paymentType }, { _id: 1 })
    ).map((employee) => employee._id);

    console.log(employeeIds);
    return;

    const totalPayAggregate = await AttendanceModel.aggregate([
      {
        $match: {
          "employeAttendance.aDate": { $gte: startDate, $lte: endDate },
        },
      },
      {
        $unwind: "$employeAttendance",
      },
      {
        $match: {
          "employeAttendance.employeeId": {
            $in: (
              await EmployeModel.find({ paymentType })
            ).map((employee) => employee._id),
          },
          "employeAttendance.aDate": { $gte: startDate, $lte: endDate },
        },
      },
      // {
      //   $group: {
      //     _id: null,
      //     totalPay: { $sum: "$employeAttendance.totalPay" },
      //     totalHours: { $sum: "$employeAttendance.totalHours" },
      //   },
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     totalPay: 1,
      //     totalHours: 1,
      //   },
      // },
    ]);

    console.log(totalPayAggregate);
    return;
    const result = totalPayAggregate[0];
    console.log(result); // { totalPay: 1000, totalHours: 40 } for example
    const totalPay = result ? result.totalPay : 0;
    const totalHours = result ? result.totalHours : 0;

    console.log(
      `Total ${paymentType} Pay for ${startDate.toDateString()} to ${endDate}: with Total Hours ${totalHours}`,
      totalPay
    );
  } catch (error) {
    console.error("Error calculating total pay:", error);
  }
}

// #1 We wroking on this function we have to use in this two place first  in employe and second in payment
//This is Call From FilterData.js & Each EmployeData for we have to pass employeId File Working with Production Ready Code
export async function allEmployeeDataWithDateRange(props) {
  try {
    // const  startDate = moment(testing.startDate).startOf("day").toDate();
    let { startDate, endDate, paymentType, employeId, search, limit, page } =
      props;
    const keyword = search; // search keywor
    const limitNumber = Math.abs(parseInt(limit));
    const pageNumber = Math.abs(parseInt(page));
    const skip = (pageNumber - 1) * limitNumber; // skip for pagination
    // const employeIdArray = employeId ? employeId.split(",") : []; // convert employeId to array
    const employeIdArray = employeId
      ? employeId.map((id) => new mongoose.Types.ObjectId(id))
      : []; // convert employeId to array
    await connect();
    // if we have emploeId then doesn't required for this query we have to do on Monday
    const employeeIds = await EmployeModel.find(
      paymentType === "All" ? {} : { paymentType }
    ) // Fetch employee IDs that match the payment type
      .select("_id") // Fetch only the _id field
      .then((employees) => employees.map((employee) => employee._id)); // Extract the _id values from the result
    let query = String(keyword)
      ? {
          $or: [
            {
              "employeeData.firstName": {
                $regex: String(keyword),
                $options: "i",
              },
            },
            {
              "employeeData.lastName": {
                $regex: String(keyword),
                $options: "i",
              },
            },
          ],
        }
      : {};
    const attendanceData = [
      // Sub-aggregation for attendance data
      {
        $lookup: {
          from: "employes", // collection name in db
          localField: "employeAttendance.employeeId", // field in the Attendance collection
          foreignField: "_id", // field in the Employee collection
          as: "employeeData", // alias for the resulting array
          // pipeline: keyword ? [{ $match: query }] : [{}], // add this line
        }, // lookup
      }, // Include an empty object if no search keyword

      keyword ? { $match: { ...query } } : { $match: {} }, // filter based on search keyword
      {
        $project: {
          employeAttendance: {
            employeeId: "$employeAttendance.employeeId",
            aDate: "$employeAttendance.aDate",
            totalHours: "$employeAttendance.totalHours",
            totalPay: "$employeAttendance.totalPay",
          },
          employeeData: { $arrayElemAt: ["$employeeData", 0] }, // get the first element of the array
        },
      },
      {
        // $skip: (page - 1) * limit, // Calculate skip based on page and limit
        $skip: skip, // Calculate skip based on page and limit
      },
      {
        $limit: limitNumber, // Limit the number of documents returned for the current page
      },
      {
        $unwind: "$employeeData", // Unwind employee data (assuming one-to-one relationship)
      },
    ];

    const allAttendanceWithEmployeDataG = await AttendanceModel.aggregate([
      {
        $match: {
          $and: [
            {
              "employeAttendance.aDate": { $gte: startDate, $lte: endDate },
            },
          ],
        },
      },
      {
        $unwind: "$employeAttendance",
      },
      {
        $match: {
          "employeAttendance.employeeId": {
            $in: employeId ? employeIdArray : employeeIds,
          },
        },
      },
      {
        $facet: {
          attendanceData: attendanceData, // attendanceData is an array of objects
          totalCount: [
            {
              $lookup: {
                from: "employes", // collection name in db
                localField: "employeAttendance.employeeId", // field in the Attendance collection
                foreignField: "_id", // field in the Employee collection
                as: "employeeData", // alias for the resulting array
                // pipeline: keyword ? [{ $match: query }] : [{}], // add this line
              }, // lookup
            }, // Include an empty object if no search keyword

            keyword ? { $match: { ...query } } : { $match: {} }, // filter based on search keyword
            {
              $project: {
                employeAttendance: {
                  employeeId: "$employeAttendance.employeeId",
                  aDate: "$employeAttendance.aDate",
                  totalHours: "$employeAttendance.totalHours",
                  totalPay: "$employeAttendance.totalPay",
                },
                employeeData: { $arrayElemAt: ["$employeeData", 0] }, // get the first element of the array
              },
            },
            {
              $unwind: "$employeeData", // Unwind employee data (assuming one-to-one relationship)
            },
            { $count: "totalAttendance" },
          ],
        },
      },
    ]);

    let totalPay = 0;
    let totalHours = 0; // initialize total hours
    allAttendanceWithEmployeDataG[0].attendanceData.forEach((attendance) => {
      totalPay += attendance.employeAttendance.totalPay;
      totalHours += attendance.employeAttendance.totalHours;
    }); // calculate total pay and hours
    const employeeDataWithPay =
      allAttendanceWithEmployeDataG[0].attendanceData.map(
        // map attendance data
        (attendance) => {
          return {
            // from this attendance send only date total and total hour
            name: `${attendance.employeeData.firstName} ${attendance.employeeData.lastName}`, // employeeName
            paymentType: attendance.employeeData.paymentType, // paymentType
            payRate: attendance.employeeData.payRate,
            totalHours: attendance.employeAttendance.totalHours,
            totalPay: attendance.employeAttendance.totalPay, // send total pay
            date: attendance.employeAttendance.aDate.toDateString(),
            // ...attendance.employeAttendance,
          };
        }
      );
    const totalData =
      allAttendanceWithEmployeDataG[0]?.totalCount[0]?.totalAttendance || 0;
    return {
      status: true,
      data: employeeDataWithPay,
      totalHours,
      totalPay,
      totalData,
    }; // send employeeDataWithPay
  } catch (error) {
    console.log("Error in getEmployeeAttendanceWithPay", error);
    return {
      status: false,
      data: [],
      totalHours: 0,
      totalPay: 0,
      totalData: 0,
    }; // return empty array
  }
}
async function calculateTotalPaywithEmployeeId(
  employeId,
  paymentType,
  startDate,
  endDate
) {
  const startdate = new Date(startDate); // Replace with desired start date object
  const enddate = new Date(endDate); // Replace with desired end date object

  try {
    const matchingAttendance = await AttendanceModel.find({
      "employeAttendance.aDate": { $gte: startDate, $lte: endDate },
    });
    let totalPay = 0;
    let totalHours = 0;
    for (const attendance of matchingAttendance) {
      // Loop through each attendance document
      for (const employeAttendance of attendance.employeAttendance) {
        if (employeAttendance.employeeId.toString() === employeId) {
          console.log(employeAttendance);
          totalPay += employeAttendance.totalPay; // Add totalPay to totalPay
          totalHours += employeAttendance.totalHours; // Add totalHours to totalHours
        } else {
          // If paymentType does not match, skip to next iteration
          continue;
        }
      } // End of inner loop
    } // End of outer loop
    console.log(
      `Total ${paymentType} Pay for ${startdate.toDateString()} to ${enddate.toDateString()}: with Total Hours ${totalHours}`,
      totalPay
    ); // Log the result
  } catch (error) {
    // catch any errors
    console.error("Error calculating total pay:", error); // log the error
  } // end of catch block
}

// Schedule the script to run every Monday to calculate weekly pay
// cron.schedule("0 0 * * 1", async () => {
//   await calculateTotalPay("Weekly");
// });

// // Schedule the script to run on the first day of every month to calculate monthly pay
// cron.schedule("0 0 1 * *", async () => {
//   await calculateTotalPay("Monthly");
// });
