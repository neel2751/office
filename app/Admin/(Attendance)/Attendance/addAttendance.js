"use client";
import {
  addAttendance,
  attendanceData,
} from "@/actions/attendanceAction/attendanceAction";
import {
  calculateTotalHoursGemini,
  calculateTotalPayForRows,
  changeDateToString,
} from "@/actions/commonAction/commonAction";
import { CONSTANTATTENDANCETABLE } from "@/allFormField/field";
import { Breadcrumbs } from "@/components/ChangePassword/ChnagePassword";
import Search from "@/components/Search/search";
import Shimmer from "@/components/Shimmer/Shimmer";
import { TableAction, TableBody, TableData, TableTH } from "@/components/Table";
import { useDebounce } from "@/helper/debounceHelper";
import {
  CheckCircleIcon,
  FaceFrownIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Check, Pencil, Save } from "lucide-react";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import ReactDatePicker from "react-datepicker";
import { Zoom, toast } from "react-toastify";

const AddAttendance = ({ page }) => {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const searchDebounce = useDebounce(search, 500); // This is Debounce Search
  const [mainDate, setMainDate] = useState(new Date()); // This is Main Date
  const attendanceEmployeData = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await attendanceData(mainDate, searchDebounce);
      if (response.count === 0)
        toast.warn("No Employee found", {
          icon: <FaceFrownIcon className="h-6 w-6 text-warning" />,
          position: "top-center",
          theme: "dark",
          transition: Zoom,
          autoClose: 3000,
        });

      if (response.status) {
        setData(JSON.parse(response.data));
      } else {
        toast.error("No data found... somthing Went wrong...");
      }
    } catch (error) {
      console.log("error handling", error);
    } finally {
      setIsloading(false);
    }
  }, [searchDebounce, mainDate]);
  const successAttendance = () => {
    attendanceEmployeData();
  };
  useEffect(() => {
    attendanceEmployeData();
  }, [searchDebounce, mainDate]);

  const handleDateSelect = (date) => {
    if (
      mainDate.toISOString().split("T")[0] === date.toISOString().split("T")[0]
    )
      return;
    setMainDate(date);
  };

  return (
    <>
      <AttendanceHeader
        mainDate={mainDate}
        data={data}
        onSuccess={successAttendance}
        isLoading={isLoading}
        page={page}
      >
        <div className="sm:flex">
          <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
            <Search onChange={setSearch} placeholder={`Search name`} />
          </div>
          <AttendanceDateForm
            onDateSelect={handleDateSelect} // Pass the function to handle date selection
          />
        </div>
        <div className="my-2">
          <span className="text-xs font-medium text-neutral-500 mt-10 ms-1 mb-2">
            {/* Add Note : Hours Dones't Allowed Decimal Number like 0.9 after 1 it's okay */}
            {/* Add Note : BreakHours & ExtraHours like 0.3 as same as 0.30 it' called 30 min */}
            <span className="text-rose-600">*Note</span> : Hours start with 1,
            Break & Extra Hours start with 0.1 same as 0.10 it's called 10 min
          </span>
        </div>
      </AttendanceHeader>
    </>
  );
};

export default AddAttendance;

const AttendanceDateForm = ({ onDateSelect }) => {
  const [mainDate, setMainDate] = useState(new Date()); // Initialize mainDate with today's date
  const handleDateChange = (newDate) => {
    setMainDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <div className="flex items-center pt-1">
      <ReactDatePicker
        selected={mainDate}
        onChange={handleDateChange} // Ensure onChange handler is passed
        placeholderText={mainDate}
        dateFormat={"dd/MM/yyyy"}
        todayButton="Today"
        shouldCloseOnSelect
        className="text-neutral-800 rounded-md border border-neutral-300 p-1 pl-2"
      />
    </div>
  );
};

const AttendanceHeader = ({
  data,
  children,
  mainDate,
  isLoading,
  onSuccess,
  page,
}) => {
  return (
    <div className="h-full w-full mt-16 bg-gray-50 relative overflow-y-auto lg:ml-64">
      <Breadcrumbs
        breadcrumbs={[
          { label: " Dashboard", href: "/" },
          { label: "Attendance", href: page, active: true },
        ]}
      />
      {/* Header */}
      <div className="px-4 pt-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">{children}</div>
      </div>
      {/* Table */}
      <Suspense fallback={<LoadingSpinner />}>
        <AttendanceTableHeader
          mainDate={mainDate}
          isLoading={isLoading}
          data={data}
          onSuccess={onSuccess}
          page={page}
        />
      </Suspense>
    </div>
  );
};

function LoadingSpinner() {
  return <h2>🌀 Loading...</h2>;
}

const AttendanceTableHeader = ({ data, mainDate, onSuccess, isLoading }) => {
  const [editableRows, setEditableRows] = useState({});
  const [hours, setHours] = useState("");
  const [breakHours, setBreakHours] = useState("");
  const [extraHours, setExtraHours] = useState("");

  const [note, setNote] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    // Attach click event listener to document body
    const handleClickOutsideTable = (e) => {
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        // Click occurred outside the table, so reset editable rows
        setEditableRows({});
      }
    };
    document.body.addEventListener("click", handleClickOutsideTable);
    // Calculate and update total hours for each editable row
    const updatedEditableRows = { ...editableRows };
    Object.keys(editableRows).forEach((id) => {
      updatedEditableRows[id].totalHours = calculateTotalHoursGemini(
        hours,
        breakHours,
        extraHours
      );
      updatedEditableRows[id].totalPay = calculateTotalPayForRows(
        editableRows,
        setHours,
        setBreakHours,
        setExtraHours
      );
    });
    setEditableRows(updatedEditableRows);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutsideTable);
    };
  }, [hours, breakHours, extraHours]);

  const handleEdit = (index, payRate, hours, breakHours, extraHours, note) => {
    const updatedEditableRows = {};
    // Set the clicked row as editable with its payRate
    updatedEditableRows[index] = {
      payRate: payRate,
      hours,
      breakHours,
      extraHours,
      note,
      totalHours: calculateTotalHoursGemini(hours, breakHours, extraHours),
      totalPay: calculateTotalPayForRows(
        editableRows,
        setHours,
        setBreakHours,
        setExtraHours
      ),
    };
    // Set all other rows as non-editable
    Object.keys(editableRows).forEach((key) => {
      if (key !== index) {
        delete updatedEditableRows[key];
      }
    });
    setHours(hours); // Update break hours state
    setBreakHours(breakHours); // Update break hours state
    setExtraHours(extraHours); // Update break hours state
    setNote(note);
    setEditableRows(updatedEditableRows);
  };

  const isValidValue = (value) => {
    if (!value || value < 0) {
      console.log(value);
      return true;
    } else {
      !isNaN(value);
    }
  };

  const handleSave = async () => {
    console.log(extraHours);
    // breakhour and extrahour allow  decimal values like 0.22 but not the minus sign or anything before if  it's a decimal
    const vali = /^([0-9][\d]{0,7})(\.\d{0,2})?$/;
    try {
      // Validation
      if (hours <= 0 || isNaN(hours))
        return toast.info("Hours Cannot be Zero!", {
          closeButton: false,
        });
      // if (isValidValue(breakHours))
      //   return toast.info("Please Check your Input  for Break Hours", {
      //     closeButton: false,
      //   });
      if (breakHours >= hours)
        return toast.warning(
          "Break time should not exceed working hours or same.",
          {
            closeButton: false,
          }
        );
      if (extraHours > hours)
        return toast.warning(
          `Extra hours (${extraHours}) cannot exceed remaining hours.`,
          {
            closeButton: false,
          }
        );
      // if (isValidValue(extraHours))
      //   return toast.error("Invalid Input for Extra Hours", {
      //     closeButton: false,
      //   });
      const validation = /^([1-9][\d]{0,7})(\.\d{0,2})?$/;
      if (!validation.test(hours))
        return toast.warning("Only numbers are allowed for hours", {
          closeButton: false,
        });
      if (!vali.test(breakHours))
        return toast.warning("Only numbers are allowed for break hours", {
          closeButton: false,
        });
      if (!vali.test(extraHours))
        return toast.warning("Only numbers are allowed for extra hours", {
          closeButton: false,
        });
      // if (vali.test(breakHours) || validation.test(extraHours))
      //   return toast.warning(
      //     "Decimal values only upto two decimal places are allowed"
      //   );
      const response = await addAttendance(
        {
          aDate: mainDate,
          hours: hours,
          breakHours: breakHours,
          extraHours: extraHours,
          note,
        },
        editableRows
      );
      if (response.status) {
        toast.success(response.message);
        setEditableRows({});
        setHours("");
        setBreakHours("");
        setExtraHours("");
        onSuccess(); //  Callback to parent component
      } else {
        toast.error("Failed to save attendance. please refresh  the page");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <table
              ref={tableRef}
              className="table-fixed min-w-full divide-y divide-gray-200"
            >
              <TableTH data={CONSTANTATTENDANCETABLE} />
              {isLoading ? (
                <Shimmer length={9} />
              ) : (
                <TableBody>
                  {data?.map((th) => (
                    <tr key={th._id}>
                      <TableData
                        title={th?.firstName || "No Name"}
                        subTitle={th?.lastName || "No Name"}
                      />
                      <TableData title={`£${th?.payRate.toFixed(2) ?? 0.0}`} />
                      {editableRows[th._id] ? (
                        <>
                          <td>
                            <input
                              className="text-black p-2 rounded-lg w-20 border border-gray-300 focus:border-none focus:ring-2 focus:ring-cyan-600 outline-none"
                              type="number"
                              inputMode="decimal"
                              value={editableRows[th._id].hours}
                              placeholder={th.hours}
                              pattern="[0-2]*"
                              min={0}
                              max={8}
                              onChange={(e) => {
                                setHours(e.target.value);
                                setEditableRows({
                                  ...editableRows,
                                  [th._id]: {
                                    ...editableRows[th._id],
                                    hours: e.target.value,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              className="text-black p-2 rounded-lg w-20 border border-gray-300 focus:border-none focus:ring-2 focus:ring-cyan-600 outline-none"
                              type="number"
                              inputMode="decimal"
                              placeholder={th.breakHours}
                              value={editableRows[th._id].breakHours}
                              min={0}
                              max={8}
                              onChange={(e) => {
                                setBreakHours(e.target.value);
                                setEditableRows({
                                  ...editableRows,
                                  [th._id]: {
                                    ...editableRows[th._id],
                                    breakHours: e.target.value,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              className="text-black p-2 rounded-lg w-20 border border-gray-300 focus:border-none focus:ring-2 focus:ring-cyan-600 outline-none"
                              type="number"
                              inputMode="decimal"
                              placeholder={th.extraHours}
                              value={editableRows[th._id].extraHours}
                              min={0}
                              max={8}
                              onChange={(e) => {
                                setExtraHours(e.target.value);
                                setEditableRows({
                                  ...editableRows,
                                  [th._id]: {
                                    ...editableRows[th._id],
                                    extraHours: e.target.value,
                                  },
                                });
                              }}
                            />
                          </td>
                          <td>
                            <input
                              className="text-black p-2 rounded-lg w-24 border text-sm border-gray-300 focus:border-none focus:ring-2 focus:ring-cyan-600 outline-none"
                              type="text"
                              placeholder={th?.note || "Add Note"}
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <TableData title={th?.hours || 0} />
                          <TableData title={th?.breakHours || 0} />
                          <TableData title={th?.extraHours || 0} />
                          <TableData title={th?.note || "No Note"} />
                        </>
                      )}
                      <TableData
                        title={
                          (editableRows[th._id]?.totalHours > 0 &&
                            editableRows[th._id]?.totalHours) ||
                          th?.totalHours ||
                          0
                        }
                      />
                      <TableData
                        title={`£${
                          editableRows[th?._id]?.totalPay < 0
                            ? 0
                            : editableRows[th?._id]?.totalPay ||
                              th?.totalPay.toFixed(2) ||
                              0
                        }`}
                      />
                      {/* new Date().toISOString().split("T")[0] */}
                      <TableData title={changeDateToString(mainDate)} />
                      <td className="flex p-4 gap-2">
                        {editableRows[th?._id] ? (
                          <TableAction
                            cls={
                              "text-white bg-green-600 hover:bg-green-800 cursor-pointer"
                            }
                            svg={<Save className="w-5 h-5" />}
                            handleClick={() => handleSave()}
                          />
                        ) : (
                          <TableAction
                            cls={
                              "text-white bg-cyan-600 hover:bg-cyan-800 cursor-pointer"
                            }
                            svg={<Pencil className="w-5 h-5" />}
                            handleClick={() =>
                              handleEdit(
                                th._id,
                                th.payRate,
                                th.hours,
                                th.breakHours,
                                th.extraHours,
                                th.note
                              )
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </TableBody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
    // )}
    // </>
  );
};
