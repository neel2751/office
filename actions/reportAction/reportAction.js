"use server";
import { connect } from "@/dbConfig/dbConfig";
import AttendanceModel from "@/models/attendanceModel";
import SiteExpense from "@/models/siteExpenseModel";
import Task from "@/models/taskModel";
import mongoose from "mongoose";

// Showing task performance like Good , Bad, Neutral
export const getTaskPerformance = async (siteId) => {
  try {
    await connect();
    const tasks = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      // we need completed  tasks only
      //   { $match: { _id: { $eq: "Completed" } } },
      {
        $project: {
          _id: 0,
          taskStatus: "$_id",
          count: 1,
        },
      },
    ]);
    // we have do like how many are completed / total * 100
    const completedTasks = tasks.filter(
      (task) => task.taskStatus === "Completed"
    );
    const totalTasks = tasks.length;
    const completedPercentage = (completedTasks.length / totalTasks) * 100;
    console.log(completedPercentage);
    const performance = tasks.map((task) => {
      if (task.count > 0) {
        const percentage = (task.count / tasks.length) * 100;
        return {
          taskStatus: task.taskStatus,
          count: task.count,
          percentage: percentage.toFixed(2),
        };
      } else {
        return {
          taskStatus: task.taskStatus,
          count: task.count,
          percentage: 0,
        };
      }
    });
    console.log(tasks);
    return JSON.stringify(performance);
  } catch (error) {
    console.log(error);
  }
};

// @Report Task
// #1 Find the total expenses cost
// #2 Find the expense category wise cost and which  category has the highest cost
// #3  Find the employee wise cost and which employee has the highest cost
// #4 Find the total cost of all employees
// @BigTask
//  #1 Find on the filter Date wise

// Task 1,2
export async function expenseCategoryWiseCost() {
  try {
    const cost = await SiteExpense.aggregate([
      {
        $facet: {
          totalCost: [
            {
              $group: {
                _id: null,
                totalCost: { $sum: "$expenseAmount" },
              },
            },
          ],
          chartData: [
            {
              $lookup: {
                from: "expensecategories",
                localField: "expenseCategory",
                foreignField: "_id",
                as: "expensecategory",
              },
            },
            {
              $unwind: "$expensecategory",
            },
            {
              $group: {
                _id: "$expensecategory.categoryName",
                totalAmount: { $sum: "$expenseAmount" },
              },
            },
            {
              $project: {
                _id: 0,
                categoryName: "$_id",
                totalAmount: 1,
              },
            },
            {
              $sort: {
                totalAmount: -1,
              },
            },
          ],
        },
      },
      {
        $project: {
          expensesCost: { $arrayElemAt: ["$totalCost.totalCost", 0] },
          chartData: 1,
        },
      },
    ]);
    return JSON.stringify(cost[0]);
  } catch (error) {
    console.log(error);
  }
}

// Task 3,4: Find the employee total cost depend on totalPay
export const findEmployeeTotalCost = async (siteId) => {
  try {
    const pipeline = [
      {
        $match: {
          siteId: new mongoose.Types.ObjectId(siteId),
        }, // Match the siteId
      },
      {
        $unwind: "$employeAttendance", // Unwind the assignTo array to handle each assigned employee
      },
      {
        $facet: {
          employeeWiseTotals: [
            {
              $lookup: {
                from: "employes",
                localField: "employeAttendance.employeeId",
                foreignField: "_id",
                as: "employes",
              },
            },
            { $unwind: "$employes" },
            {
              $group: {
                _id: "$employeAttendance.employeeId", // Group by employeeId for employee-wise results
                firstName: { $first: "$employes.firstName" },
                lastName: { $first: "$employes.lastName" },
                totalHours: { $sum: "$employeAttendance.hours" }, // Sum total hours for each employee
                totalBreakHours: {
                  $sum: "$employeAttendance.breakHours",
                }, // Sum total break hours for each employee
                totalPay: { $sum: "$employeAttendance.totalPay" }, // Sum total pay for each employee
                totalExtraHours: {
                  $sum: "$employeAttendance.extraHours",
                }, // Sum total extra hours for each employee
                totalAttendanceHours: {
                  $sum: "$employeAttendance.totalHours",
                }, // Sum total attendance hours for each employee
              },
            },
            {
              $sort: { totalPay: -1 },
            },
          ],
          overallTotal: [
            {
              $group: {
                _id: null,
                allEmployeeTotalHours: {
                  $sum: "$employeAttendance.hours",
                }, // Sum total hours for all employees
                allEmployeeTotalBreakHours: {
                  $sum: "$employeAttendance.breakHours",
                }, // Sum total break hours for all employees
                allEmployeeTotalPay: {
                  $sum: "$employeAttendance.totalPay",
                }, // Sum total pay for all employees
                allEmployeeTotalExtraHours: {
                  $sum: "$employeAttendance.extraHours",
                }, // Sum total extra hours for all employees
                allEmployeeTotalAttendanceHours: {
                  $sum: "$employeAttendance.totalHours",
                }, // Sum total attendance hours for all employees
              },
            },
          ],
        },
      },
    ];
    // we have to find Total employee Cost for Particular site
    const employeeCost = await AttendanceModel.aggregate(pipeline);
    console.log(employeeCost[0]);
    // return JSON.stringify(employeeCost[0]);
  } catch (error) {}
};

//@BigTask Task 1: Find the last month expense with date from today date
// In this one we need date wise  expense for last three month
// Task for this add siteId in match Object both  in pipeline and in find
export const findLastThreeMonthExpense = async (siteId) => {
  const startDate = new Date();
  const endDate = new Date();
  let daysToSubtract = 360;
  startDate.setDate(endDate.getDate() - daysToSubtract);
  try {
    const pipeline = [
      {
        $match: {
          siteId: new mongoose.Types.ObjectId(siteId),
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$expenseDate" },
          month: { $month: "$expenseDate" },
          year: { $year: "$expenseDate" },
          totalPay: "$expenseAmount",
          expenseDate: "$expenseDate", // Include aDate for filtering
        },
      },
      //   {
      //     $match: {
      //       expenseDate: {
      //         $gte: startDate,
      //         $lte: endDate,
      //       },
      //     },
      //   },
      {
        $group: {
          _id: { day: "$day", month: "$month", year: "$year" },
          totalExpense: { $sum: "$totalPay" },
        },
      },
      // we have to do full date
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
              },
            },
          },
          totalExpense: 1,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
      {
        $group: {
          _id: null,
          chartData: {
            $push: {
              totalExpense: "$totalExpense",
              date: "$date",
            },
          },
          grandTotalExpense: { $sum: "$totalExpense" },
        },
      },
      {
        $project: {
          _id: 0,
          chartData: 1,
          total: {
            totalExpense: "$grandTotalExpense",
          },
        },
      },
    ];
    const report = await SiteExpense.aggregate(pipeline);
    return JSON.stringify(report[0]);
  } catch (error) {
    console.log(error);
  }
};

export const findLastThreeMonthEmployeeExpense = async (siteId, dateRange) => {
  const startDate = new Date();
  const endDate = new Date();
  let daysToSubtract = 180;
  startDate.setDate(endDate.getDate() - daysToSubtract);
  const dateRangeQuery = dateRange
    ? {
        attendanceDate: {
          $gte: new Date(dateRange.startDate),
          $lte: new Date(dateRange.endDate),
        },
      }
    : {
        // attendanceDate: {
        //   $gte: startDate,
        //   $lte: endDate,
        // },
      };
  try {
    const employePipeline = [
      {
        $match: {
          //   siteId: new mongoose.Types.ObjectId(siteId),
          ...dateRangeQuery,
        },
      },
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
        $group: {
          _id: { day: "$day", month: "$month", year: "$year" },
          totalHours: { $sum: "$totalHours" },
          // totalPay: { $sum: "$totalPay" }, // Include totalPay for filtering
          totalPay: { $sum: { $round: ["$totalPay", 2] } },
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: "$_id.day",
                },
              },
            },
          },
          totalHours: 1,
          totalPay: 1,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
      {
        $group: {
          _id: null,
          chartData: {
            $push: {
              totalPay: "$totalPay",
              totalHours: "$totalHours",
              date: "$date",
            },
          },
          grandTotalHours: { $sum: "$totalHours" },
          grandTotalPay: { $sum: "$totalPay" },
        },
      },
      {
        $project: {
          _id: 0,
          chartData: 1,
          total: {
            totalHours: "$grandTotalHours",
            totalPay: "$grandTotalPay",
          },
        },
      },
    ];

    const report = await AttendanceModel.aggregate(employePipeline);
    return JSON.stringify(report[0]);
  } catch (error) {
    console.error(error);
    return JSON.stringify({ error: "Error generating report" });
  }
};

// we have to find the total pay and total hour by month wise
export const getMonthlyReport = async () => {
  try {
    const employePipeline = [
      {
        $unwind: "$employeAttendance",
      },
      {
        $facet: {
          chartData: [
            {
              $group: {
                _id: {
                  year: { $year: "$employeAttendance.aDate" }, // Extract the current year
                  month: {
                    $toUpper: {
                      $dateToString: {
                        format: "%b",
                        date: "$employeAttendance.aDate",
                      },
                    },
                  }, // Get month name like "JAN"
                },
                totalCost: { $sum: "$employeAttendance.totalPay" },
                totalHours: { $sum: "$employeAttendance.totalHours" },
              },
            },
            {
              $sort: { "_id.month": 1 }, // Sort by month in ascending order
            },
          ],
          total: [
            {
              $group: {
                _id: null,
                totalPay: { $sum: "$employeAttendance.totalPay" },
                totalHours: { $sum: "$employeAttendance.totalHours" },
              },
            },
          ],
        },
      },
      {
        $project: {
          employeeWiseTotals: 1,
          overallTotal: 1,
          chartData: {
            $map: {
              input: [
                { month: "JAN", totalCost: 0, totalHours: 0 },
                { month: "FEB", totalCost: 0, totalHours: 0 },
                { month: "MAR", totalCost: 0, totalHours: 0 },
                { month: "APR", totalCost: 0, totalHours: 0 },
                { month: "MAY", totalCost: 0, totalHours: 0 },
                { month: "JUN", totalCost: 0, totalHours: 0 },
                { month: "JUL", totalCost: 0, totalHours: 0 },
                { month: "AUG", totalCost: 0, totalHours: 0 },
                { month: "SEP", totalCost: 0, totalHours: 0 },
                { month: "OCT", totalCost: 0, totalHours: 0 },
                { month: "NOV", totalCost: 0, totalHours: 0 },
                { month: "DEC", totalCost: 0, totalHours: 0 },
              ],
              as: "month",
              in: {
                month: "$$month.month",
                totalCost: {
                  $cond: {
                    if: {
                      $in: [
                        "$$month.month",
                        {
                          $map: {
                            input: "$chartData",
                            as: "m",
                            in: "$$m._id.month",
                          },
                        },
                      ],
                    },
                    then: {
                      $let: {
                        vars: {
                          match: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$chartData",
                                  as: "m",
                                  cond: {
                                    $eq: ["$$m._id.month", "$$month.month"],
                                  },
                                },
                              },
                              0,
                            ],
                          },
                        },
                        in: "$$match.totalCost",
                      },
                    },
                    else: 0,
                  },
                },
                totalHours: {
                  $cond: {
                    if: {
                      $in: [
                        "$$month.month",
                        {
                          $map: {
                            input: "$chartData",
                            as: "m",
                            in: "$$m._id.month",
                          },
                        },
                      ],
                    },
                    then: {
                      $let: {
                        vars: {
                          match: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$chartData",
                                  as: "m",
                                  cond: {
                                    $eq: ["$$m._id.month", "$$month.month"],
                                  },
                                },
                              },
                              0,
                            ],
                          },
                        },
                        in: "$$match.totalHours",
                      },
                    },
                    else: 0,
                  },
                },
              },
            },
          },
          total: 1,
        },
      },
    ];
    const report = await AttendanceModel.aggregate(employePipeline);
    // console.log(report[0]);

    return JSON.stringify(report[0]);
  } catch (error) {
    console.error(error);
  }
};

// we have to find the total siteExpense month wise
export const getSiteExpense = async () => {
  try {
    const siteExpensePipeline = [
      //   {
      //     $match: {
      //       siteId: mongoose.Types.ObjectId("62a4b3f4f4f4f4f4f4f4f4f4"),
      //       expenseType: "siteExpense",
      //     },
      //   },
      {
        $group: {
          _id: {
            month: { $month: "$expenseDate" },
            year: { $year: "$expenseDate" },
          },
          totalExpense: { $sum: "$expenseAmount" },
        },
      },

      {
        $project: {
          _id: 0,
          month: {
            $toUpper: {
              $dateToString: {
                format: "%b", // Short month name (Jan, Feb, etc.)
                date: {
                  $dateFromParts: {
                    month: "$_id.month",
                    year: "$_id.year",
                  },
                },
              },
            },
          },
          totalExpense: 1, // Keep totalExpense as is
        },
      },
      {
        $sort: {
          month: -1,
        },
      },
    ];
    const siteExpense = await SiteExpense.aggregate(siteExpensePipeline);

    return JSON.stringify(siteExpense);
  } catch (error) {}
};

// fetch the total task count by month
export const fetchTotalTaskCountByMonth = async () => {
  try {
    const pipeline = [
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalAmount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          categoryName: {
            $toUpper: {
              $dateToString: {
                format: "%b", // Short month name (Jan, Feb, etc.)
                date: {
                  $dateFromParts: {
                    month: "$_id.month",
                    year: "$_id.year",
                  },
                },
              },
            },
          },
          totalAmount: 1,
        },
      },
      {
        $sort: {
          month: -1,
        },
      },
    ];
    const totalTaskCountByMonth = await Task.aggregate(pipeline);
    return JSON.stringify(totalTaskCountByMonth);
  } catch (error) {
    console.error(error);
  }
};

//@Technical Task
//In this find all the KPI for the Site, expenses, and revenue
