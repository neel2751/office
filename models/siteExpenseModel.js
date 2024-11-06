import mongoose from "mongoose";

// create a schema for the site expense model
const siteExpenseSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Types.ObjectId,
      ref: "ProjectSite",
      required: true, // Ensure siteId is mandatory
    },
    expenseDate: { type: Date, default: Date.now },
    expenseAmount: { type: Number, required: true },
    expenseDescription: { type: String },
    expenseStatus: { type: String, enum: ["pending", "paid", "rejected"] },
    // expenseUser: { type: mongoose.Schema.Types.ObjectId, ref: "Employe" },
    expenseCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpenseCategory",
      required: true,
    },
    expenseCurrency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "GBP",
    },
    expenseRate: { type: Number },
    expenseTotal: { type: Number },
    expenseTax: { type: Number },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const SiteExpense =
  mongoose.models.SiteExpense ||
  mongoose.model("SiteExpense", siteExpenseSchema);

export default SiteExpense;
