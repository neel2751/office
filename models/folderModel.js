import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentWorkspace",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OfficeEmploye",
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const FolderModel =
  mongoose.models.Folder || mongoose.model("Folder", FolderSchema);

export default FolderModel; //export the model
