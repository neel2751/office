const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    siteId: {
      type: mongoose.Types.ObjectId,
      ref: "ProjectSite",
      required: true, // Ensure siteId is mandatory
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "TaskCategory",
      required: true,
    },
    assignedTo: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Employe",
        required: true,
      },
    ],
    chat: [
      {
        user: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        userType: {
          type: String,
          enum: ["OfficeEmploye", "Employe"],
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          required: true,
        },
        mentions: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Employe", // Reference to Employee model
            required: true, // Ensure assignTo is mandatory
          },
        ],
      },
    ],
    log: [
      {
        timestamp: {
          type: Date,
          required: true,
        },
        action: {
          type: String,
          required: true,
        },
        user: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        userType: {
          type: String,
          enum: ["OfficeEmploye", "Employe"],
          required: true,
        },
      },
    ],
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        uploaderId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        uploaderType: {
          type: String,
          enum: ["OfficeEmploye", "Employee"],
          required: true,
        },
        uploader: {
          type: String,
          required: true,
        },
        uploadTime: {
          type: Date,
          required: true,
        },
      },
    ],
    subtasks: [
      {
        title: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["Not Started", "In Progress", "Completed"],
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        assignedTo: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Employe",
            required: true,
          },
        ],
        progress: {
          type: Number,
          default: 0,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        isDelete: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },

  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
