"use client";
import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  addExpenseCategory,
  deleteExpenseCategoryById,
  fetchAllExpensesWithCategory,
} from "@/actions/siteExpenseAction/siteExpenseAction";
import { ReactHookForm } from "@/components/ModelForm/FormModel";
import Model from "../Task/Model";
import { toast } from "react-toastify";
import { EXPENSECATEGORYFIELD } from "@/allFormField/field";
import { useDebounce } from "@/helper/debounceHelper";
import Search from "@/components/Search/search";
import ExpenseChart from "./ExpenseChart";
import { FetchExpenseCategory } from "./ExpenseCategory";
import AllExpense from "./AllExpense";
import { ExpenseCategoryChart } from "./ExpenseCategoryChart";

const Expense = ({ id }) => {
  return (
    <>
      <div className="sm:container mx-auto p-4 sm:max-w-7xl ">
        {/* <CardHeader>
          <CardTitle>Expense</CardTitle>
        </CardHeader> */}
        <div className="flex sm:flex-row flex-col gap-10 overflow-hidden mb-10">
          <ExpenseChart />
          <ExpenseCategoryChart />
        </div>

        <Tabs defaultValue="expenses" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="budgets">Category</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses">
            {useMemo(() => (
              <AllExpense id={id} />
            ))}
          </TabsContent>
          <TabsContent value="budgets">
            {useMemo(() => (
              <AddExpenseCategory />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Expense;

const AddExpenseCategory = memo(() => {
  const { category } = FetchExpenseCategory();
  const [resetFlag, setResetFlag] = useState(false);
  const [intitalValue, setInitialValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryTotals, setCategoryTotals] = useState([]);
  const [filterMinAmount, setFilterMinAmount] = useState(null);
  const [filterMaxAmount, setFilterMaxAmount] = useState(null);
  const [filterName, setFilterName] = useState("");
  const filterMin = useDebounce(filterMinAmount, 1000);
  const filterMax = useDebounce(filterMaxAmount, 1000);
  const filterNameDebounced = useDebounce(filterName, 1000);

  const handleAddCategory = async (data) => {
    try {
      const response = await addExpenseCategory(data);
      if (response.status) {
        const newData = JSON.parse(response?.data);
        setResetFlag(!resetFlag);
        setIsOpen(false);
        if (intitalValue) {
          const updatedCategory = category.map((item) => {
            if (item._id === newData._id) {
              return newData;
            }
            return item;
          });
          setCategory(updatedCategory);
          setInitialValue(null);
        } else {
          setCategory([...category, newData]);
          toast.success(response.message);
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(" Failed to add category");
    }
  };

  const fetchAllCategoryExpense = useCallback(async () => {
    try {
      const response = await fetchAllExpensesWithCategory();
      if (response.status) {
        const data = JSON.parse(response?.data);
        setCategoryTotals(data);
      }
    } catch {
      console.error("Failed to fetch all category expense");
    }
  });

  const budgetComparison = useMemo(() => {
    return category
      .filter((expense) => {
        const amountMatch =
          (!filterMin || expense.categoryBudget >= parseFloat(filterMin)) &&
          (!filterMax || expense.categoryBudget <= parseFloat(filterMax));

        const nameMatch =
          !filterNameDebounced ||
          expense.categoryName
            .toLowerCase()
            .includes(filterNameDebounced.toLowerCase());

        return amountMatch && nameMatch;
      })
      .map((budget) => {
        const matchedCategory = categoryTotals.find(
          (cat) => cat.categoryId === budget._id
        );
        if (matchedCategory) {
          const spent = matchedCategory.totalAmount;
          const budgetInBaseCurrency = budget.categoryBudget;
          const remaining = Math.max(budgetInBaseCurrency - spent, 0);
          const percentageUsed = Math.min(
            (spent / budgetInBaseCurrency) * 100,
            100
          );

          return {
            _id: budget._id,
            categoryName: budget.categoryName,
            categoryBudget: budgetInBaseCurrency,
            spent: spent,
            remaining: remaining,
            percentageUsed: percentageUsed,
          };
        }

        // If no matching category is found, return a fallback object or null
        return {
          _id: budget._id,
          categoryName: budget.categoryName,
          categoryBudget: budget.categoryBudget,
          spent: 0,
          remaining: budget.categoryBudget,
          percentageUsed: 0,
        };
      });
  }, [category, categoryTotals, filterMin, filterMax, filterNameDebounced]);

  useEffect(() => {
    fetchAllCategoryExpense();
  }, []);

  const startEdit = (editData) => {
    setInitialValue(editData);
    setIsOpen(true);
  };

  const deleteExpenseCategory = async (id) => {
    try {
      const response = await deleteExpenseCategoryById(id);
      if (response.status) {
        setCategory(category.filter((expense) => expense._id !== id));
        toast.success("Expense category deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete expense category");
    }
  };

  return (
    <>
      <Model isOpen={isOpen} setIsOpen={setIsOpen}>
        <Card>
          <CardHeader>Add Expense Category</CardHeader>
          <CardContent>
            <ReactHookForm
              fields={EXPENSECATEGORYFIELD}
              initialValues={intitalValue}
              resetFlag={resetFlag}
              setResetFlag={setResetFlag}
              onSubmit={handleAddCategory}
              btnName={"Add Expense Category"}
            />
          </CardContent>
        </Card>
      </Model>

      <Card>
        <CardHeader>
          <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-4 justify-between">
            <CardTitle>Budget Tracking</CardTitle>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Add Expense Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex sm:flex-row flex-col sm:gap-0 gap-2">
            <Search
              onChange={setFilterName}
              placeholder="Enter Category"
              className={"!max-w-max"}
            />
            <Search
              onChange={setFilterMinAmount}
              placeholder="Enter Min Amount"
              className={"!max-w-max"}
            />
            <Search
              onChange={setFilterMaxAmount}
              placeholder="Enter Max Amount"
              className={"!max-w-max"}
            />
          </div>
        </CardContent>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <ExpensecategoryTable
              budgetComparison={budgetComparison}
              startEdit={startEdit}
              deleteExpenseCategory={deleteExpenseCategory}
            />
          </Table>
        </CardContent>
      </Card>
    </>
  );
});

const ExpensecategoryTable = memo(
  ({ budgetComparison, startEdit, deleteExpenseCategory }) => {
    return (
      <TableBody>
        {budgetComparison?.map((item) => (
          <TableRow key={item?.categoryName}>
            <TableCell>{item?.categoryName}</TableCell>
            <TableCell>£{item?.categoryBudget.toFixed(2)}</TableCell>
            <TableCell>£{item?.spent?.toFixed(2) ?? 0}</TableCell>
            <TableCell>£{item?.remaining?.toFixed(2) ?? 0}</TableCell>
            <TableCell>
              <ProgressBar value={item?.percentageUsed} />
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteExpenseCategory(item._id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
);

const ProgressBar = memo(({ value }) => {
  return (
    <div className="flex items-center space-x-2">
      <Progress
        aria-label={`Budget usage for ${value}: 0%`}
        className="mt-0.5 h-1.5 w-full"
        indicatorColor={`
        ${
          value === 100
            ? "bg-rose-600"
            : value > 60
            ? "bg-amber-600"
            : "bg-green-600"
        }
        `}
        value={value}
      />
      <span
        className={`text-sm font-medium ${
          value === 100
            ? "text-rose-600"
            : value > 60
            ? "text-amber-600"
            : "text-green-600"
        }`}
      >
        {value?.toFixed(0)}%
      </span>
    </div>
  );
});
