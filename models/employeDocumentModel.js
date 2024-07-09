import mongoose from "mongoose";

// const documentSchema = new mongoose.Schema(
//   {
//     documentName: { type: String, required: true },
//     documentUrl: { type: String, required: true },
//     DocumentType: { type: String, required: true },
//     documentDate: { type: Date, required: true },
//     documentSize: { type: String, required: true },
//     documentStatus: { type: Boolean, required: true },
//     documentDelete: { type: Boolean, required: true },
//   },
//   { timestamps: true }
// );

const employeDocumentSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    // documents: { type: Object },
    documents: [{ type: Object }], // Array of objects
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
    deleted: { type: Boolean, default: false },
    deletedBy: { type: String, default: null },
    deletedReason: { type: String, default: null },
  },
  { timestamps: true }
);

const EmployeDocumentModel =
  mongoose.models.EmployeDocument ||
  mongoose.model("EmployeDocument", employeDocumentSchema);
export default EmployeDocumentModel;
