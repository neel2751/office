import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentWorkspace",
      default: null,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OfficeEmploye",
      required: true,
    },
    size: Number,
    fileType: String, // MIME type
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const FileModel = mongoose.models.File || mongoose.model("File", FileSchema);
export default FileModel;
