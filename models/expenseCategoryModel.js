import mongoose from "mongoose";

// create a schema for the site expense model
const expenseCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryBudget: {
      type: Number,
      required: true,
    },
    categoryStatus: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ExpenseCategory =
  mongoose.models.ExpenseCategory ||
  mongoose.model("ExpenseCategory", expenseCategorySchema);

export default ExpenseCategory;
