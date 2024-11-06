import mongoose from "mongoose";

// create monggose schema
const documentWorkspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    // who  is the team leader
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OfficeEmploye",
    },
    team: {
      // give a ref
      type: mongoose.Schema.Types.ObjectId,
      ref: "DocumentTeam",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// create model

const DocumentWorkspaceModel =
  mongoose.models.DocumentWorkspace ||
  mongoose.model("DocumentWorkspace", documentWorkspaceSchema);

export default DocumentWorkspaceModel;
