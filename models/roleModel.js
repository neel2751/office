import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: [true, "Please provide a firstName"],
    },
    roleEmail: {
      type: String,
      unique: true,
    },
    rolePhone: {
      type: Number,
      unique: true,
      required: true,
    },
    rolePassword: {
      type: String,
      default: "cdc@1234",
    },
    roleType: {
      type: String,
      required: true,
    },
    projectSiteID: {
      type: mongoose.Types.ObjectId,
      ref: "ProjectSite",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerfied: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const RoleModel = mongoose.models.Role || mongoose.model("Role", roleSchema);

export default RoleModel;
