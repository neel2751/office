import mongoose from "mongoose";

// create monggose schema
const documentTeamSchema = new mongoose.Schema(
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
    members: {
      // give a ref
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "OfficeEmploye" }],
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// create model

const DocumentTeamModel =
  mongoose.models.DocumentTeam ||
  mongoose.model("DocumentTeam", documentTeamSchema);

export default DocumentTeamModel;
