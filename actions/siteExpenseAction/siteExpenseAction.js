"use server";
import { connect } from "@/dbConfig/dbConfig";
import ExpenseCategory from "@/models/expenseCategoryModel";
import SiteExpense from "@/models/siteExpenseModel";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

// first we have to add the expense category
export async function addExpenseCategory(categoryData) {
  try {
    await connect();
    if (categoryData._id) {
      const data = await ExpenseCategory.findByIdAndUpdate(
        categoryData._id,
        categoryData,
        { new: true }
      );
      return {
        status: true,
        message: "Expense Category Updated Successfully",
        data: JSON.stringify(data),
      };
    } else {
      const result = await ExpenseCategory(categoryData);
      // we have to save the category
      const savedCategory = await result.save();
      console.log(savedCategory);
      if (savedCategory) {
        return {
          status: true,
          message: " Expense category added successfully",
          data: JSON.stringify(savedCategory),
        };
      }
    }
    return { status: false, message: "Failed to add expense category" };
  } catch (error) {
    console.log(" Error adding expense category", error);
    return { status: false, message: "Failed to add expense category" };
  }
}

//  get all expense categories
export async function getAllExpenseCategories(budgetMin, budgetMax) {
  try {
    await connect();
    const budgetQuery =
      budgetMin > 0 && budgetMax > 0
        ? { categoryBudget: { $gte: budgetMin, $lte: budgetMax } }
        : {};
    const categories = await ExpenseCategory.find({
      ...budgetQuery,
      isDelete: false,
    }).sort({ createdAt: -1 });
    // const categories = await ExpenseCategory.find({ isDelete: false });
    if (categories) {
      return {
        status: true,
        message: "Expense categories retrieved successfully",
        data: JSON.stringify(categories),
      };
    }
    return { status: false, message: "Failed to retrieve expense categories" };
  } catch (error) {
    console.log(" Error retrieving expense categories", error);
    return { status: false, message: "Failed to retrieve expense categories" };
  }
}

// delete expense category by id
export async function deleteExpenseCategoryById(categoryId) {
  try {
    await connect();
    const category = await ExpenseCategory.findById(categoryId);
    if (category) {
      category.isDelete = true;
      await category.save();
      return {
        status: true,
        message: "Expense category deleted successfully",
      };
    }
    return { status: false, message: "Failed to delete expense category" };
  } catch (error) {
    console.log(" Error deleting expense category", error);
    return { status: false, message: "Failed to delete expense category" };
  }
}

// we have to add the expense without revalidate path
// export async function addExpenseAction(data) {
//   try {
//     if (data?._id) {
//       const updateData = await SiteExpense.findByIdAndUpdate(data._id, data, {
//         new: true,
//       }).populate("expenseCategory", "categoryName");
//       if (updateData) {
//         return {
//           status: true,
//           message: "Expense added successfully",
//           data: JSON.stringify(updateData),
//         };
//       }
//     } else {
//       console.log("else part work");
//       const response = await SiteExpense(data);
//       const siteData = await response.save();
//       if (siteData) {
//         return {
//           status: true,
//           message: "Expense added successfully",
//         };
//       }
//     }
//     return { status: false, message: "Failed to add expense" };
//   } catch (error) {
//     console.log(" Error adding expense", error);
//     return { status: false, message: "Failed to add expense" };
//   }
// }

// we have to add the expense with revalidate path
export async function addExpenseAction(data) {
  try {
    if (data?._id) {
      const updateData = await SiteExpense.findByIdAndUpdate(data._id, data, {
        new: true,
      }).populate("expenseCategory", "categoryName");

      if (updateData) {
        // Revalidate the path where the data is displayed
        const dynamicPath = `/SiteProject/${data.siteId}/expense`; // Adjust the path according to where you display expenses
        console.log(dynamicPath);
        revalidatePath(dynamicPath);

        return {
          status: true,
          message: "Expense updated successfully",
          data: JSON.stringify(updateData),
        };
      }
    } else {
      console.log("else part work");
      const response = await SiteExpense(data);
      const siteData = await response.save();

      if (siteData) {
        // Revalidate the path where the data is displayed
        const dynamicPath = `/SiteProject/${data.siteId}/expense`; // Adjust the path according to where you display expenses
        revalidatePath(dynamicPath);

        return {
          status: true,
          message: "Expense added successfully",
        };
      }
    }

    return { status: false, message: "Failed to add expense" };
  } catch (error) {
    console.log("Error adding expense", error);
    return { status: false, message: "Failed to add expense" };
  }
}

export async function deleteExpenseAction(id) {
  try {
    const expense = await SiteExpense.findById(id);
    if (expense) {
      expense.isDelete = true;
      await expense.save();
      return {
        status: true,
        message: "Expense deleted successfully",
      };
    }
    return { status: false, message: "Failed to delete expense" };
  } catch (error) {
    console.log(" Error deleting expense", error);
    return { status: false, message: "Failed to delete expense" };
  }
}

// ftech all expenses
// for bar chart we need this data
export async function fetchAllExpensesWithCategory() {
  try {
    const response = await SiteExpense.aggregate([
      {
        $lookup: {
          from: "expensecategories", // Replace with actual collection name
          localField: "expenseCategory", // Field in SiteExpense
          foreignField: "_id", // Field in ExpenseCategory
          as: "category", // Alias for the joined data
        },
      },
      {
        $unwind: "$category", // Flatten the category array
      },
      {
        $group: {
          _id: {
            categoryId: "$category._id", // Group by category ID
            categoryName: "$category.categoryName", // Include the category name
          },
          totalAmount: { $sum: "$expenseAmount" }, // Sum up the expenseAmount
          //   expense: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          // add all field data
          _id: 0, // Exclude the default MongoDB `_id` field
          categoryId: "$_id.categoryId",
          categoryName: "$_id.categoryName",
          //   expense: 1,
          totalAmount: 1, // Include the totalAmount in the result
        },
      },
    ]);
    if (response) {
      return {
        status: true,
        message: "Expenses fetched successfully",
        data: JSON.stringify(response),
      };
    }
    return { status: false, message: "Failed to fetch expenses" };
  } catch (error) {
    console.log(" Error fetching expenses", error);
    return { status: false, message: "Failed to fetch expenses" };
  }
}

export async function fetchAllExpenses(search, filter) {
  const sort = "desc";
  const dateQuery =
    filter.startDate && filter.endDate
      ? {
          expenseDate: {
            $gte: new Date(filter.startDate),
            $lte: new Date(filter.endDate),
          },
        }
      : {};
  const categoryQuery = filter?.category
    ? { expenseCategory: new mongoose.Types.ObjectId(filter.category) }
    : {};
  const searchQuery = search
    ? { expenseDescription: { $regex: search, $options: "i" } }
    : {};
  const query = {
    ...dateQuery,
    ...categoryQuery,
    ...searchQuery,
  };

  try {
    const totalData = await SiteExpense.find(query).countDocuments();
    const response = await SiteExpense.aggregate([
      {
        $match: {
          ...query,
        },
      },
      {
        $lookup: {
          from: "expensecategories",
          localField: "expenseCategory",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $lookup: {
          from: "projectsites",
          localField: "siteId",
          foreignField: "_id",
          as: "siteDetail",
        },
      },
      {
        $unwind: "$siteDetail",
      },
      {
        $project: {
          _id: 1,
          expenseDate: 1,
          expenseAmount: 1,
          expenseCategory: {
            _id: "$category._id",
            categoryName: "$category.categoryName",
          },
          siteDetail: {
            _id: "$siteDetail._id",
            siteName: "$siteDetail.siteName",
          },
          expenseDescription: 1,
          totalAmount: 1,
        },
      },
      {
        $sort: {
          expenseDate: sort === "desc" ? -1 : 1,
        },
      },
      {
        $skip: (filter?.page - 1) * filter?.limit,
      },
      {
        $limit: filter?.limit,
      },
    ]);
    if (response) {
      return {
        status: true,
        message: "Expenses fetched successfully",
        data: JSON.stringify(response),
        totalData,
      };
    }
    return { status: false, message: "Failed to fetch expenses" };
  } catch (error) {
    console.log(" Error fetching expenses", error);
    return { status: false, message: "Failed to fetch expenses" };
  }
}

// we need all month wise total expense and what is every month avg  expense
export async function getExpenseMonthWiseTotal(categoryId) {
  // = "670115f46bd6eb04bec271dc"
  try {
    const categoryQuery = categoryId
      ? { expenseCategory: new mongoose.Types.ObjectId(categoryId) }
      : {};
    const response = await SiteExpense.aggregate([
      {
        $match: categoryQuery,
      },
      {
        // Step 1: Group by month to calculate the total amount per month
        $group: {
          _id: { $month: "$expenseDate" },
          totalAmount: { $sum: "$expenseAmount" },
        },
      },
      {
        // Step 2: Sort by month (optional, helps to keep the results in order)
        $sort: {
          _id: 1,
        },
      },
      {
        // Step 3: Limit the result to 12 months (assuming 12 months, adjust if needed)
        $limit: 12,
      },
      {
        // Step 4: Project the result with average per month
        $project: {
          _id: 0,
          month: {
            $arrayElemAt: [
              [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              {
                $subtract: ["$_id", 1],
              },
            ],
          },
          totalExpense: "$totalAmount", // Project the total expense for that month
          averageExpense: { $divide: ["$totalAmount", 12] }, // Find the average of total amount (for that month)
        },
      },
      {
        // Step 5: Calculate the grand total for all 12 months and find the overall average expense
        $group: {
          _id: null,
          // we have to check data is there  or not
          //   averageExpense: { $avg: "$totalAmount" },
          //   averageExpense: { $avg: { $sum: "$totalExpense" } },
          monthlyExpenses: { $push: "$$ROOT" }, // Collect all individual month documents
          grandTotal: { $sum: "$totalExpense" }, // Calculate the sum of all month expenses (grand total for 12 months)
        },
      },
      {
        // Step 6: Final projection to include the overall average for 12 months
        $project: {
          _id: 0,
          monthlyExpenses: 1, // Include the monthly expenses array
          grandTotal: 1, // Include the total expense for 12 months
          overallAverageExpense: { $divide: ["$grandTotal", 12] }, // Calculate the overall average for 12 months
        },
      },
    ]);
    return JSON.stringify(response[0]);
  } catch (error) {
    console.log(" Error fetching expenses", error);
  }
}

// we get all month wise total expense and avg  expense category  wise
export const getMonthWiseCategoryExpense = async (categoryId) => {
  //   console.log(categoryId);
  try {
    const response = await SiteExpense.aggregate([
      //  Step 1: Filter the collection by the given category ID
      {
        $match: {
          expenseCategory: new mongoose.Types.ObjectId(categoryId),
        },
      },
      //  Step 2: Group by month and calculate the total expense for each month
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$expenseDate",
            },
          },
          totalExpense: { $sum: "$expenseAmount" },
        },
      },
      //  Step 3: Sort the results by month in ascending order
      {
        $sort: {
          _id: 1,
        },
      },
      //  Step 4: Final projection to include only the required fields
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalExpense: 1,
          averageExpense: { $divide: ["$totalExpense", 12] }, // Calculate the
          // average expense for 12 months
        },
      },
    ]);
    console.log(response);
  } catch (error) {
    console.log("Error fetching month wise category expense", error);
  }
};
