"use server";
import { connect } from "@/dbConfig/dbConfig";
import AttendanceModel from "@/models/attendanceModel";
import EmployeModel from "@/models/employeeModel";
import OfficeEmployeeModel from "@/models/officeEmployeModel";
import ProjectSiteModel from "@/models/siteProjectModel";
import mongoose from "mongoose";

/*
@description: This function is used to get all function for promises
@params: none
@returns: 4 promises Data
* 1. get all employee summary Data like total, active, inactive, VisaExp. Employee Function Name : getEmployeeSummary
* 2. get all offices employee summary Data  like total, active, inactive, VisaExp. Employee  Function Name : getOfficeEmployeeSummary
* 3. get last 90 days attendance data like date, totalpay, totalhours for Chart  Function Name : getLast90DaysDataForChart
* 4. get Today total Pay  and total hours for only for report...  Function Name : getTodayTotalPayAndHours
*/
export async function fetchCardData() {
  try {
    const emploeyeeData = await getEmpSummaryData();
    const officeEmployeeData = await getOfficeEmpSummaryData();
    const last90DaysDataForChart = await getLast90DaysDataForChart();
    const currentDateTotalPay = await getTodayTotalPayAndHours();
    const totalFullSiteData = await getTotalSiteWorkingRightCount();

    const data = await Promise.all([
      emploeyeeData,
      officeEmployeeData,
      last90DaysDataForChart,
      currentDateTotalPay,
      totalFullSiteData,
    ]); // wait for both promises to resolve

    const NumberOfEmployeeData = data[0];
    const NumberOfficeEmployeeData = data[1];
    const last90DaysDataForChartData = data[2]; // 2nd element of the array
    const CurrentDayTotalPay = data[3];
    const TotalFullSiteData = data[4]; // 4th element of the array
    return {
      NumberOfEmployeeData,
      NumberOfficeEmployeeData,
      last90DaysDataForChartData,
      CurrentDayTotalPay,
      TotalFullSiteData,
    };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Server Error" };
  }
}

// Get All the Employee data form Once like active, inactive, total, enddate
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
    if (result[0]?._id === null) {
      // send data into array);
      const {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        expiredEmployees,
        reminderEmployees,
      } = result[0];
      const data = {
        totalEmployees: totalEmployees,
        activeEmployees: activeEmployees,
        inactiveEmployees: inactiveEmployees,
        expiredEmployees: expiredEmployees,
        reminderEmployees: reminderEmployees,
      };
      return { status: true, data: JSON.stringify(data) };
    } else {
      const data = {
        totalEmployees: 0,
        activeEmployees: 0,
        inactiveEmployees: 0,
        expiredEmployees: 0,
        reminderEmployees: [], // send reminder data
      };
      return {
        status: false,
        message: "No Data Found!",
        data: JSON.stringify(data),
      };
    }
  } catch (error) {
    console.log("Error at getting employee summary data : ", error);
    return { status: false, message: "Internal Server Error" };
  }
};

// Get All the Office Employee data form Once like active, inactive, total, enddate
export const getOfficeEmpSummaryData = async () => {
  try {
    await connect();
    const threeFromNow = new Date();
    threeFromNow.setMonth(threeFromNow.getMonth() + 3);
    const result = await OfficeEmployeeModel.aggregate([
      // if delete true don't  count
      { $match: { delete: false } }, // filter out deleted employees
      // { $match: { end_date: { $lte: threeFromNow } } }, // filter by end_date
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
            $sum: { $cond: [{ $lte: ["$endDate", new Date()] }, 1, 0] },
          }, // Count expired employees (endDate <= current date)
          reminderEmployees: {
            $push: { name: "$firstName", eVisaExp: "$endDate" }, // Push name and eVisaExp fields to an array
          },
        },
      },
    ]).exec();
    if (result[0]?._id === null) {
      // send data into array);
      const {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        expiredEmployees,
        reminderEmployees,
      } = result[0];
      const data = {
        totalEmployees: totalEmployees || 0,
        activeEmployees: activeEmployees || 0,
        inactiveEmployees: inactiveEmployees || 0,
        expiredEmployees: expiredEmployees || 0,
        reminderEmployees: reminderEmployees || [], // send reminder data
      };
      return {
        status: true,
        data: JSON.stringify(data),
      };
    } else {
      const data = {
        totalEmployees: 0,
        activeEmployees: 0,
        inactiveEmployees: 0,
        expiredEmployees: 0,
        reminderEmployees: [], // send reminder data
      };
      return {
        status: false,
        message: "No Data Found!",
        data: JSON.stringify(data),
      };
    }
  } catch (error) {
    console.log("Error at getting employee summary data : ", error);
    return { status: false, message: "Internal Server Error" };
  }
};

// Get Last 3 Month Data for Chart
export async function getLast90DaysDataForChart() {
  const startDate = new Date();
  const endDate = new Date();
  let daysToSubtract = 90;
  startDate.setDate(endDate.getDate() - daysToSubtract);
  const pipeline = [
    { $unwind: "$employeAttendance" },
    {
      $project: {
        day: { $dayOfMonth: "$employeAttendance.aDate" },
        month: { $month: "$employeAttendance.aDate" },
        year: { $year: "$employeAttendance.aDate" },
        totalHours: "$employeAttendance.totalHours",
        totalPay: "$employeAttendance.totalPay",
        aDate: "$employeAttendance.aDate", // Include aDate for filtering
      },
    },
    {
      $match: {
        aDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { day: "$day", month: "$month", year: "$year" },
        totalHours: { $sum: "$totalHours" },
        // totalPay: { $sum: "$totalPay" }, // Include totalPay for filtering
        totalPay: { $sum: { $round: ["$totalPay", 2] } },
      },
    },
  ];
  try {
    const result = await AttendanceModel.aggregate(pipeline);
    // make a date  string for the result
    const formattedResult = result.map((item) => {
      return {
        TotalHours: item.totalHours, // Remove the _id field
        TotalPay: item.totalPay, // Remove the _id field
        date: `${item._id.year}-${item._id.month}-${item._id.day}`,
      };
    }); // format the date
    //send a date like Asc order
    return formattedResult.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    }); // sort the result by date in descending order
  } catch (error) {
    return { status: false, message: "Error in fetching data" };
  }
}

// Get  total hours and pay for a specific date Now for Only today and top 7 total high pay employee
export async function getTodayTotalPayAndHours() {
  await connect();
  // const now = new Date("2024-08-15" + "T" + "00:00:00.000Z");
  const today = new Date().toISOString().split("T")[0];
  const now = new Date(today + "T" + "00:00:00.000Z"); // get today date
  const pipeline = [
    { $match: { attendanceDate: now } },
    { $unwind: "$employeAttendance" },
    // { $match: { "employeAttendance.aDate": { $eq: now } } }, // Filter by today's date
    {
      $group: {
        _id: "$employeAttendance.employeeId", // Group by employeeId
        totalHours: { $sum: "$employeAttendance.totalHours" },
        totalPay: { $sum: "$employeAttendance.totalPay" },
      },
    },
    {
      $lookup: {
        from: "employes", // Replace with your employee collection name
        localField: "_id",
        foreignField: "_id",
        as: "employeeData",
      },
    },
    {
      $unwind: "$employeeData", // Unwind the employee data array
    },
    {
      $project: {
        employeeId: "$_id",
        firstName: "$employeeData.firstName",
        lastName: "$employeeData.lastName",
        payRate: "$employeeData.payRate",
        paymentType: "$employeeData.paymentType",
        totalHours: 1,
        totalPay: 1,
      },
    },
    {
      $sort: { totalPay: -1 },
    },
    {
      $group: {
        _id: null,
        employees: { $push: "$$ROOT" }, // Group by null to get all employees
        totalHours: { $sum: "$totalHours" },
        totalPay: { $sum: { $round: ["$totalPay", 2] } },
      },
    }, // Group by total hours and total pay
    // we need only three employee under the employess  array , add totalPays  and totalHours
    {
      $project: {
        _id: 0,
        employees: { $slice: ["$employees", 3] },
        // employees: 1,
        totalHours: 1,
        totalPay: { $round: ["$totalPay", 2] }, // Round total pay to 2 decimal places
      },
    }, // Project the desired fields
  ];

  try {
    let totalPay = 0;
    const result = await AttendanceModel.aggregate(pipeline); // Aggregate the data
    totalPay = result[0]?.totalPay || 0;
    return {
      totalPay,
      totalHours: result[0]?.totalHours || 0,
      employees: JSON.stringify(result[0]?.employees || []),
    }; // Return the total pay and hours
    // console.log("Total pay for all employees today:", totalPay);
  } catch (error) {
    console.error("Error getting current date total pay: ", error);
    return { status: false, message: "Error calculating total pay" };
  }
}

// Get Total Site Working Right count total Site, active, complete, on hold, no status
export async function getTotalSiteWorkingRightCount() {
  try {
    const pipeline = [
      // {
      //   $match: {
      //     siteDelete: false, // Filter active sites
      //   },
      // }, // when upload production please Add  this line
      {
        $facet: {
          total: [{ $count: "total" }], // Count total number of sites
          siteTypes: [
            {
              $group: {
                _id: "$siteType",
                count: { $sum: 1 },
              },
            },
          ],
          statuses: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ];
    const result = await ProjectSiteModel.aggregate(pipeline);
    return {
      total: result[0]?.total[0]?.total || 0, // Total number of sites
      siteTypes: result[0]?.siteTypes || [], // Site types with count
      statuses: result[0]?.statuses || [
        { _id: "Active", count: 0 },
        { _id: "On Hold", count: 0 },
        { _id: "Completed", count: 0 },
        { _id: "No Status", count: 0 },
      ], // Statuses with count
    };
  } catch (error) {
    return {
      status: false,
      message: "Error getting total site working right count",
    }; // Return error message
    console.error("Error getting total site working right count: ", error);
  }
}

// End Fetch Card Function we using

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

export const getTotalHoursPerMonth = async () => {
  try {
    const pipeline = [
      {
        $unwind: "$employeAttendance",
      },
      {
        $project: {
          month: { $month: "$employeAttendance.aDate" },
          year: { $year: "$employeAttendance.aDate" },
          totalHours: "$employeAttendance.totalHours",
          totalPay: "$employeAttendance.totalPay", // totalPay
        },
      },
      // {$match: {year: year}}, // filter by year
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalHours: { $sum: "$totalHours" },
          totalPay: { $sum: "$totalPay" },
        }, // group by month and year
      },
    ];
    const result = await AttendanceModel.aggregate(pipeline); // execute the pipeline
    // we have to add in month name not number if there is not any month name  then we have to add month name
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]; // month name array

    const data = result.map((item) => {
      const month = item._id.month; // get month number
      const monthNameValue = monthName[month - 1] || month; // get month name
      return {
        month: monthNameValue, // get month name
        totalHours: parseFloat(item.totalHours), // get total hours
        totalPay: parseFloat(item.totalPay), // get total pay
      };
    }); // map the result

    const completeMonthData = monthName.map((month) => ({
      month,
      totalHours: 0,
      totalPay: 0,
    }));
    const mergedData = completeMonthData.map((monthData) => {
      const existingData = data.find((item) => item.month === monthData.month);
      // return existingData ? { ...monthData, ...existingData } : monthData; // merge data
      return {
        ...monthData,
        ...(existingData || {}),
      };
    });
    return mergedData; // return the merged data
  } catch (error) {
    return { status: false, message: "Server  Error" };
  }
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
  /* @type {Object} props
  @ we artificially dealy a response for demo  purpose.
  @ Don't do this in production :)
  */
  await new Promise((resolve) => setTimeout(resolve, 3000));
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
            aPayRate: "$employeAttendance.aPayRate",
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
            $in: employeId.length > 0 ? employeIdArray : employeeIds,
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
                  aPayRate: "$employeAttendance.aPayRate",
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

    // const getTotalHoursWithDateFilter = await getTotalHoursPerMonth(
    //   startDate,
    //   endDate
    // );
    // console.log(getTotalHoursWithDateFilter); // This will print the total hours for each month

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
            oldPayrate: attendance.employeAttendance.aPayRate,
            totalHours: attendance.employeAttendance.totalHours,
            totalPay: attendance.employeAttendance.totalPay, // send total pay
            date: attendance.employeAttendance.aDate.toDateString(),
            // ...attendance.employeAttendance,
          };
        }
      );
    // console.log(employeeDataWithPay);
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

// async function getTotalHoursPerMonth(startDate, endDate) {
//   const pipeline = [
//     { $unwind: "$employeAttendance" },
//     {
//       $project: {
//         month: { $month: "$employeAttendance.aDate" },
//         year: { $year: "$employeAttendance.aDate" },
//         totalHours: "$employeAttendance.totalHours",
//         aDate: "$employeAttendance.aDate", // Include aDate for filtering
//       },
//     },
//     {
//       $match: {
//         aDate: {
//           $gte: startDate,
//           $lte: endDate,
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { month: "$month", year: "$year" },
//         totalHours: { $sum: "$totalHours" },
//       },
//     },
//   ];

//   const result = await AttendanceModel.aggregate(pipeline);
//   return result;
// }

export async function getTotalHoursPerDay(startDate, endDate) {
  const pipeline = [
    { $unwind: "$employeAttendance" },
    {
      $project: {
        day: { $dayOfMonth: "$employeAttendance.aDate" },
        month: { $month: "$employeAttendance.aDate" },
        year: { $year: "$employeAttendance.aDate" },
        totalHours: "$employeAttendance.totalHours",
        totalPay: "$employeAttendance.totalPay",
        aDate: "$employeAttendance.aDate", // Include aDate for filtering
      },
    },
    {
      $match: {
        aDate: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { day: "$day", month: "$month", year: "$year" },
        totalHours: { $sum: "$totalHours" },
        totalPay: { $sum: "$totalPay" }, // Include totalPay for filtering
      },
    },
  ];

  const result = await AttendanceModel.aggregate(pipeline);
  // make a date  string for the result
  const formattedResult = result.map((item) => {
    return {
      TotalHours: item.totalHours, // Remove the _id field
      TotalPay: item.totalPay, // Remove the _id field
      date: `${item._id.year}-${item._id.month}-${item._id.day}`,
    };
  }); // format the date
  //send a date like Asc order
  return formattedResult.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  }); // sort the result by date in descending order
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
