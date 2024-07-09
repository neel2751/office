import mongoose from "mongoose";

const projectSiteSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: [true, "Please provide a siteName"],
    },
    siteAddress: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["Completed", "Active", "On Hold"],
      default: "Active",
    },
    siteType: {
      type: String,
      enum: ["Residential", "Commercial"],
      default: "Residential",
    },
    siteDescription: {
      type: String,
      required: false,
      maxLength: 500,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
const ProjectSiteModel =
  mongoose.models.ProjectSite ||
  mongoose.model("ProjectSite", projectSiteSchema);

export default ProjectSiteModel;
