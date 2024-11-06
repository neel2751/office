"use server";
import { connect } from "@/dbConfig/dbConfig";
import TaskCategory from "@/models/taskCategoryModel";
import Task from "@/models/taskModel";
import mongoose from "mongoose";

//Fetch  all task categories

export const getAllTaskAction = async (siteId, filter) => {
  const {
    page = 1,
    limit = 1,
    search,
    status,
    priority,
    sort,
    category,
  } = filter;
  try {
    await connect();
    const statusQuery = status ? { status } : {};
    const priorityQuery = priority ? { priority } : {};
    const categoryQuery = category ? { category } : {};
    // const assigneesQuery = assignees.length > 0 ? { assignees } : {};
    const query = { ...statusQuery, ...priorityQuery, ...categoryQuery };
    const searchQuery =
      search && search.trim() !== ""
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { description: { $regex: search, $options: "i" } },
            ],
          }
        : {};

    const filterData = await Task.find({
      siteId: siteId,
      ...query,
      ...searchQuery,
      // ...assigneesQuery,
    })
      .skip((page - 1) * limit) // skip the first (page -
      .limit(limit) // get only 10 documents
      .sort({ createdAt: sort === "asc" ? 1 : -1 }) // sort
      .populate("siteId", "siteName")
      .populate("category", "name")
      .populate("assignedTo", "firstName lastName")
      .populate("subtasks.assignedTo", "firstName lastName")
      .lean();
    // we have to fetch all task
    // const task = await Task.find({ siteId })
    //   .populate("siteId", "siteName")
    //   .populate("category", "name")
    //   .populate("assignedTo", "firstName lastName")
    //   .lean();

    const totalCount = await Task.countDocuments({
      // Apply the same date filter as the query above
      ...query,
      ...searchQuery,
    });

    const mergedData = filterData?.map((item) => ({
      ...item, // Preserve other task properties
      assignedTo: item.assignedTo.map((assignedToId) => ({
        value: assignedToId._id, // Convert ObjectId to string
        label: assignedToId.firstName + " " + assignedToId.lastName, // Placeholder label if user information is unavailable
      })),
    }));
    // Return the aggregated data
    const data = {
      totalCount: totalCount,
      taskData: JSON.stringify(mergedData),
    };
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSiteCategory = async (siteId) => {
  try {
    const siteRelatedCategory = await Task.find({ siteId }).populate(
      "category",
      "name"
    );
    const taskCate = siteRelatedCategory.map(({ category }) => {
      return {
        label: category?.name,
        value: category?._id,
      };
    });
    // remove  duplicates
    const uniqueTaskCate = [
      ...new Map(taskCate.map((item) => [item.value, item])).values(),
    ];
    return JSON.stringify(taskCate);
  } catch (error) {
    console.log(error);
  }
};

export const getTaskChartAction = async (siteId) => {
  try {
    const taskData = await Task.aggregate([
      // Match tasks by siteId and exclude soft-deleted tasks (isDelete: false)
      {
        $match: {
          siteId: new mongoose.Types.ObjectId(siteId), // Match on the specific siteId
          isDelete: false, // Exclude deleted tasks
        },
      },

      // Lookup category details from the TaskCategory collection
      {
        $lookup: {
          from: "taskcategories", // The name of the category collection (assuming it's named `taskcategories`)
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },

      // Unwind category details so that each task has a single category object
      {
        $unwind: {
          path: "$categoryDetails",
          preserveNullAndEmptyArrays: true, // In case there's no category (optional)
        },
      },
      // Group data by status, priority, category, and assignedTo, while also counting total tasks
      {
        $facet: {
          statusData: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ],
          priorityData: [
            {
              $group: {
                _id: "$priority",
                count: { $sum: 1 },
              },
            },
          ],
          categoryData: [
            {
              $group: {
                // _id: {
                //   categoryId: "$categoryDetails._id",
                //   categoryName: "$categoryDetails.name",
                // },
                _id: "$categoryDetails.name",
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                categoryName: "$_id",
                totalAmount: "$count",
              },
            },
          ],
          totalTasks: [
            {
              $group: {
                _id: null,
                totalCount: { $sum: 1 },
              },
            },
          ],
        },
      },
      // Remove the _id field from the totalTasks group (you can handle this in code if necessary)
      {
        $project: {
          statusData: 1,
          priorityData: 1,
          categoryData: 1,
          totalTasks: { $arrayElemAt: ["$totalTasks.totalCount", 0] }, // Get the total task count
        },
      },
    ]);
    // we have to add
    const newStatus = taskData[0].statusData.map((item) => {
      item.percent = (item.count / taskData[0].totalTasks) * 100;
      return item;
    });
    const newPriority = taskData[0].priorityData.map((item) => {
      item.percent = (item.count / taskData[0].totalTasks) * 100;
      return item;
    });

    const newCategory = taskData[0].categoryData.map((item) => {
      item.percent = (item.count / taskData[0].totalTasks) * 100;
      return item.percent.toFixed(2);
    });

    const pieChartData = taskData[0]?.statusData?.map((item) => {
      // we have to change name id to status
      const status = item._id;
      const count = item.count;
      const percent = (count / taskData[0].totalTasks) * 100;
      const fill = `var(--color-${status.toLowerCase().split(" ").join("")})`;
      return { status, count, percent, fill };
    });

    const pieChart = taskData[0]?.priorityData?.map((item) => {
      // we have to change name id to status
      const status = item._id;
      const count = item.count;
      const percent = (count / taskData[0].totalTasks) * 100;
      const fill = `var(--color-${status.toLowerCase().split(" ").join("")})`;
      return { status, count, percent, fill };
    });
    const updatedTaskData = taskData.map((item) => {
      return {
        ...item, // Keep all other fields intact
        statusData: pieChartData, // Replace statusData with pieChartData
        priorityData: pieChart, // Replace priorityData with pieChart
      };
    });
    const data = { chartData: JSON.stringify(updatedTaskData[0]) };
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addTaskAction = async (taskData) => {
  try {
    await connect();
    const newTask = new Task(taskData);
    const result = await newTask.save();
    if (result) {
      return {
        status: true,
        message: "Task added successfully",
        data: JSON.stringify(result),
      };
    }
    return {
      status: false,
      message: "Failed to add task",
      data: JSON.stringify({}),
    };
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error adding task:", error);
    // Return a failure response with a meaningful error message
    return {
      status: false,
      message: "Error adding task",
      error: error.message || "An error occurred", // Provide more specific error message if available
      data: {},
    };
  }
};

export const addSubTaskAction = async (taskData, logData, taskId) => {
  try {
    await connect();
    const updatedSubTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $push: {
          subtasks: taskData,
          log: logData,
        },
      },
      { new: true } // To return the updated task document
    )
      .populate("siteId", "siteName")
      .populate("category", "name")
      .populate("assignedTo", "firstName lastName")
      .populate("subtasks.assignedTo", "firstName lastName")
      .lean();
    if (updatedSubTask) {
      return {
        status: true,
        message: "Sub Task added successfully",
        data: JSON.stringify(updatedSubTask),
      };
    }
    return {
      status: false,
      message: "Failed to add sub task",
      data: JSON.stringify({}),
    };
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error adding task:", error);
    // Return a failure response with a meaningful error message
    return {
      status: false,
      message: "Error adding sub task",
      error: error.message || "An error occurred", // Provide more specific error message if available
      data: {},
    };
  }
};

export const toggleSubtaskCompletionAction = async (taskId, subtaskId) => {
  try {
    await connect();
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          "subtasks.$[subtask].completed": true,
          "subtasks.$[subtask].status": "Completed",
          "subtasks.$[subtask].progress": 100,
        },
      },
      {
        arrayFilters: [
          {
            "subtask._id": subtaskId,
          },
        ],
      },
      { new: true }
    );

    if (updatedTask) {
      return {
        status: true,
        message: "Sub Task completed successfully",
        data: JSON.stringify(updatedTask),
      };
    }
    return {
      status: false,
      message: "Failed to complete sub task",
      data: JSON.stringify({}),
    };
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error toggling sub task completion:", error);
    // Return a failure response with a meaningful error message
    return {
      status: false,
      message: "Error toggling sub task completion",
      error: error.message || "An error occurred", // Provide more specific error message if available
      data: {},
    };
  }
};

export const updateChatAction = async (taskId, taskData) => {
  try {
    await connect();
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { chat: taskData } },
      { new: true } // To return the updated task document
    );
    return JSON.stringify(updatedTask);
  } catch (error) {
    console.error(error);
  }
};

export const updateStatusAction = async (taskId, oldStatus, logdata) => {
  console.log(taskId, oldStatus, logdata);
  try {
    await connect();
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { log: logdata }, $set: { status: oldStatus } },
      { new: true } // To return the updated task document
    );
    return JSON.stringify(updatedTask);
  } catch (error) {
    console.error(error);
  }
};
export const updateSubStatusAction = async (
  taskId,
  subTaskId,
  status,
  progress,
  logdata
) => {
  try {
    await connect();
    const complete =
      status === "Completed"
        ? {
            $set: {
              "subtasks.$[subtasks].completed": true,
              "subtasks.$[subtasks].status": "Completed",
              "subtasks.$[subtasks].progress": 100,
            },
          }
        : {
            $set: {
              "subtasks.$[subtasks].status": status,
              "subtasks.$[subtasks].progress": progress,
            },
          };
    const updateSubTaskStatus = await Task.findByIdAndUpdate(
      taskId,
      {
        $push: {
          log: logdata,
        },
        ...complete,
      },
      {
        arrayFilters: [
          {
            "subtasks._id": subTaskId,
          },
        ],
        new: true, // This should be included in the options object
      }
    ).populate("subtasks.assignedTo", "firstName lastName");
    if (updateSubTaskStatus) {
      return {
        status: true,
        message: "Subtask status updated successfully",
        data: JSON.stringify(updateSubTaskStatus),
      };
    }
    return {
      status: false,
      message: "Failed to update subtask status",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Failed to update subtask status",
    };
  }
};

export const fetchCategoryAction = async () => {
  try {
    const response = await TaskCategory.find();
    const data = response.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return JSON.stringify(data);
  } catch (error) {}
};

export const addCategoryAction = async (category) => {
  try {
    await connect();
    const newCategory = new TaskCategory({ name: category });
    const result = await newCategory.save();
    if (result) {
      const data = {
        value: result._id,
        label: result.name,
      };
      return {
        status: true,
        message: "Category added successfully",
        data: JSON.stringify(data),
      };
    }
    return { status: false, message: "Failed to add category" };
  } catch (error) {
    console.clear();
    console.error(error);
    return { status: false, message: "Failed to add category" };
  }
};
