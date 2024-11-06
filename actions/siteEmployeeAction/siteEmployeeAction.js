"use server";

import { connect } from "@/dbConfig/dbConfig";
import Task from "@/models/taskModel";
import mongoose from "mongoose";

export async function employeeTaskChartData(siteId) {
  try {
    await connect();
    const chartData = await Task.aggregate([
      {
        $match: {
          siteId: new mongoose.Types.ObjectId(siteId),
          isDelete: false, // Ensure you're filtering out deleted tasks
        },
      },
      {
        $lookup: {
          from: "employes", // Assuming your employee collection is named "employes"
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedToDetails",
        },
      },
      {
        $unwind: {
          path: "$assignedToDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            employeeId: "$assignedToDetails._id",
            firstName: "$assignedToDetails.firstName",
            lastName: "$assignedToDetails.lastName",
          },
          tasks: {
            $push: {
              taskId: "$_id",
              taskTitle: "$title",
              taskStatus: "$status",
              taskPriority: "$priority",
              subtasks: {
                $filter: {
                  input: "$subtasks", // Filter only relevant subtasks
                  as: "subtask",
                  cond: {
                    $and: [
                      { $ne: ["$$subtask.isDelete", true] }, // Exclude deleted subtasks
                      {
                        $or: [
                          // Include if the employee is in assignedTo
                          {
                            $in: [
                              "$assignedToDetails._id",
                              "$$subtask.assignedTo",
                            ],
                          },
                          // Optionally, include unassigned subtasks (no assignedTo array)
                          { $eq: [[], "$$subtask.assignedTo"] },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
          totalTasks: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          employeeId: "$_id.employeeId",
          employeeName: {
            $concat: ["$_id.firstName", " ", "$_id.lastName"],
          },
          totalTasks: 1, // Show the total number of tasks
          tasks: {
            $map: {
              input: "$tasks", // Map over the tasks
              as: "task",
              in: {
                taskId: "$$task.taskId",
                taskTitle: "$$task.taskTitle",
                taskStatus: "$$task.taskStatus",
                taskPriority: "$$task.taskPriority",
                subtasks: {
                  $map: {
                    input: "$$task.subtasks", // Map over subtasks assigned to the employee or unassigned
                    as: "subtask",
                    in: {
                      subtaskId: "$$subtask._id",
                      subtaskTitle: "$$subtask.title",
                      status: "$$subtask.status",
                      progress: "$$subtask.progress",
                      startDate: "$$subtask.startDate",
                      endDate: "$$subtask.endDate",
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);

    const data = JSON.stringify(chartData);
    return data;
  } catch (error) {
    console.log(error);
  }
}
