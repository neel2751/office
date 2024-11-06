import { memo, useCallback, useEffect, useState } from "react";
import { FetchExpenseCategory } from "./ExpenseCategory";
import { useDebounce } from "@/helper/debounceHelper";
import { Button } from "@/components/ui/button";
import Model from "../Task/Model";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactHookForm } from "@/components/ModelForm/FormModel";
import { EXPENSEFIELD } from "@/allFormField/field";
import { Label } from "@/components/fromInput/FormInput";
import ReactDatePicker from "react-datepicker";
import { Searchbox } from "@/components/SearchBox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, Edit, Filter, Trash } from "lucide-react";
import Search from "@/components/Search/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addExpenseAction,
  deleteExpenseAction,
  fetchAllExpenses,
} from "@/actions/siteExpenseAction/siteExpenseAction";
import { toast } from "react-toastify";
import { shallowEqual } from "@/actions/commonAction/commonAction";
import { formatDistanceToNowStrict, formatISO } from "date-fns";
import PaginationHelper from "@/helper/paginationHelper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Invoice from "./invoice";

const AllExpense = memo(({ id = "" }) => {
  const { category } = FetchExpenseCategory();
  const [resetFlag, setResetFlag] = useState(false);
  const [intitalValue, setInitialValue] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [formCategory, setFormCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const searchDebounced = useDebounce(searchFilter, 1000);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState("");
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    category: "",
    page: 1,
    limit: 10,
  });
  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetchAllExpenses(searchDebounced, filter);
      if (response.status) {
        setExpenses(JSON.parse(response?.data));
        setTotal(response?.totalData);
      } else {
        toast.error("Error fetching expenses");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching expenses");
    }
  }, [
    searchDebounced,
    filter.page,
    filter.limit,
    filter.category,
    filter.endDate,
  ]);

  const handleAddExpense = async (data) => {
    if (!formCategory) return toast.warn("Select a category");
    const newData = {
      ...data,
      expenseDescription: data.expenseDescription.trim(),
      siteId: id,
      expenseDate: formatISO(new Date(data.expenseDate), {
        representation: "date",
      }),
      expenseCategory: formCategory,
    };

    const initialData = {
      ...intitalValue,
      siteId: id,
      expenseCategory: intitalValue.expenseCategory._id,
    };

    const isEqual = shallowEqual(newData, initialData);
    if (isEqual) return toast.warn("No changes made");

    try {
      const response = await addExpenseAction(newData);
      if (response?.status) {
        const updateData = JSON.parse(response?.data);
        if (intitalValue) {
          setExpenses((prev) =>
            prev.map((cat) => (cat._id === intitalValue._id ? updateData : cat))
          );
        } else {
          fetchExpenses();
        }
        toast.success(
          intitalValue
            ? "Expense updated successfully"
            : "Expense added successfully"
        );
        onClose(); // Close the modal or form after a successful operation
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add expense");
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setInitialValue(null);
    setResetFlag(!resetFlag);
    setFormCategory("");
  };
  const startEdit = (val) => {
    setIsOpen(true);
    setFormCategory(val?.expenseCategory?._id);
    setInitialValue(val);
  };
  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        const response = await deleteExpenseAction(id);
        if (response?.status) {
          setExpenses((prev) => prev.filter((expense) => expense._id !== id));
          toast.success("Expense deleted successfully");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete expense");
      }
    }
  };

  const handleDateChange = (dates) => {
    try {
      // Check if the input date is null or empty
      if (!dates) {
        return null;
      } else {
        if (Array.isArray(dates)) {
          const [start, end] = dates;
          // setFilter({startDate: start, endDate: end });
          setFilter((prev) => ({ ...prev, startDate: start, endDate: end }));
        } else {
          console.log("Error in handling date");
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, [
    searchDebounced,
    filter.page,
    filter.limit,
    filter.category,
    filter.endDate,
  ]);

  return (
    <>
      <Model isOpen={isOpen} setIsOpen={onClose}>
        <Card>
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <ReactHookForm
              fields={EXPENSEFIELD}
              initialValues={intitalValue}
              setResetFlag={setResetFlag}
              resetFlag={resetFlag}
              btnName={"Add Expense"}
              onSubmit={handleAddExpense}
            >
              <div className="mt-2">
                <Label labelText={"Category"} />
                <Searchbox
                  value={formCategory}
                  onChange={setFormCategory}
                  placeholder={"Search Category"}
                  frameworks={category.map((category) => ({
                    value: category._id,
                    label: category.categoryName,
                  }))}
                />
              </div>
            </ReactHookForm>
          </CardContent>
        </Card>
      </Model>
      <Card className="mb-8">
        <CardHeader className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-0 gap-4 justify-between">
          <CardTitle>Expense List</CardTitle>
          <div className="flex sm:space-x-2 space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <div className="space-y-4 max-w-max">
                  <div>
                    <Label labelText={"Search"} />
                    <Search
                      onChange={setSearchFilter}
                      placeholder="Enter Descrition"
                      className={"!w-80"}
                    />
                  </div>
                  <div>
                    {/* category */}
                    <Label labelText={"Category"} />
                    <Searchbox
                      value={filter.category === "" ? "all" : filter.category}
                      onChange={(e) =>
                        setFilter({ ...filter, category: e === "all" ? "" : e })
                      }
                      placeholder={"Search Category"}
                      frameworks={[
                        { _id: "all", categoryName: "All" },
                        ...category,
                      ].map((cat) => ({
                        value: cat._id,
                        label: cat.categoryName,
                      }))}
                    />
                  </div>
                  <div>
                    <Label labelText=" Date Range" />
                    <div className="flex gap-2 items-center w-full">
                      <ReactDatePicker
                        // disabled={loading} // Disable date picker when loading
                        className="text-neutral-700 p-2 w-80 ring-neutral-300 rounded ring-2 text-center focus:ring-cyan-600 outline-none"
                        selectsRange
                        selected={filter.startDate}
                        onChange={handleDateChange}
                        closeOnSelect={true}
                        startDate={filter.startDate}
                        endDate={filter.endDate}
                        placeholderText="Select date range"
                        isClearable={true}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={() => setIsOpen(true)}>Add Expense</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  "Description",
                  "Amount",
                  "Days",
                  "Date",
                  "Status",
                  "Category",
                  "Actions",
                ].map((item, index) => (
                  <TableHead className="uppercase text-xs" key={index}>
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense?._id}>
                  <TableCell className="font-medium text-neutral-600 sm:w-60 w-20 truncate">
                    {expense?.expenseDescription}
                  </TableCell>
                  <TableCell className="font-semibold text-neutral-800">
                    £{expense?.expenseAmount?.toFixed(2)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDistanceToNowStrict(new Date(expense.expenseDate), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(expense.expenseDate).toDateString()}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setInvoiceData(expense);
                      setOpenInvoice(true);
                    }}
                  >
                    <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500 cursor-pointer">
                      <svg
                        className="size-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      Paid
                    </span>
                  </TableCell>
                  <TableCell>
                    {expense?.expenseCategory?.categoryName}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(expense)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteExpense(expense._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="w-full">
            <ExpensePagination
              filter={filter}
              setFilter={setFilter}
              totalData={total}
            />
          </div>
        </CardContent>
        {openInvoice && (
          <Invoice
            open={openInvoice}
            setOpen={setOpenInvoice}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
          />
        )}
      </Card>
    </>
  );
});

export default AllExpense;

const ExpensePagination = memo(({ filter, setFilter, totalData }) => {
  const pages = [10, 20, 30, 40, 50].filter((num) => num < totalData);
  console.log(pages);
  return (
    <div className="flex justify-between w-full">
      <PaginationHelper
        pageSize={filter?.limit}
        currentPage={filter?.page}
        onPageChange={(e) => setFilter({ ...filter, page: e })}
        items={totalData}
      >
        {pages.length > 0 && (
          <div className="flex items-center gap-2 bg-white">
            <span className="text-neutral-500 text-xs font-medium">Limit:</span>
            <Select
              value={filter?.limit || "All"}
              onValueChange={(val) =>
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  limit: val === "All" ? "" : val,
                }))
              }
            >
              <SelectTrigger className="max-w-max">
                <SelectValue placeholder={filter?.limit || "All"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/*  we can't show other limit if is greater than total  data */}

                  {[10, 20, 30, 40, 50]
                    .filter((num) => num < totalData)
                    .map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </PaginationHelper>
    </div>
  );
});
