"use client";
import {
  addAttendance,
  attendanceData,
} from "@/actions/attendanceAction/attendanceAction";
import {
  calculateTotalHours,
  calculateTotalPayForRows,
} from "@/actions/commonAction/commonAction";
import { CONSTANTATTENDANCETABLE } from "@/allFormField/field";
import Search from "@/components/Search/search";
import Shimmer from "@/components/Shimmer/Shimmer";
import {
  TableAction,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableTH,
} from "@/components/Table";
import { useDebounce } from "@/helper/debounceHelper";
import {
  CheckCircleIcon,
  FaceFrownIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Zoom, toast } from "react-toastify";

const AddAttendance = ({ page }) => {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const searchDebounce = useDebounce(search, 500); // This is Debounce Search
  const [mainDate, setMainDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const attendanceEmployeData = async () => {
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
      setTimeout(() => {
        setIsloading(false);
      }, 1000);
    }
  };
  const successAttendance = () => {
    attendanceEmployeData();
  };
  useEffect(() => {
    attendanceEmployeData();
  }, [mainDate, searchDebounce]);

  const handleDateSelect = (date) => {
    setMainDate(date);
  };

  return (
    <>
      <AttendanceHeader
        mainDate={mainDate}
        data={data}
        onSuccess={successAttendance}
        isLoading={isLoading}
      >
        <TableHeading
          title={`All ${page.split("/")[2]}`}
          slug={`All ${page.split("/")[2]}`}
        />
        <div className="sm:flex">
          <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
            <Search onChange={setSearch} placeholder={`Search name`} />
          </div>
          <AttendanceDateForm
            onDateSelect={handleDateSelect} // Pass the function to handle date selection
          />
        </div>
      </AttendanceHeader>
    </>
  );
};

export default AddAttendance;

const AttendanceDateForm = ({ onDateSelect }) => {
  const [mainDate, setMainDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Initialize mainDate with today's date
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setMainDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <input
      value={mainDate}
      onChange={handleDateChange} // Call handleDateChange on date change
      type="date"
      className={`p-2 ml-2 mr-2 border focus:border-cyan-800 focus:ring-cyan-800 focus:ring-1 border-gray-300 text-black rounded-lg`}
    />
  );
};

const AttendanceHeader = ({
  data,
  children,
  mainDate,
  isLoading,
  onSuccess,
}) => {
  return (
    <div className="h-full w-full mt-16 bg-gray-50 relative overflow-y-auto lg:ml-64">
      {/* Header */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">{children}</div>
      </div>
      {/* Table */}
      <Suspense fallback={<LoadingSpinner />}>
        <AttendanceTableHeader
          mainDate={mainDate}
          isLoading={isLoading}
          data={data}
          onSuccess={onSuccess}
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
      updatedEditableRows[id].totalHours = calculateTotalHours(
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

  const handleEdit = (index, payRate) => {
    const updatedEditableRows = {};
    // Set the clicked row as editable with its payRate
    updatedEditableRows[index] = {
      payRate: payRate,
      totalHours: calculateTotalHours(hours, breakHours, extraHours),
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
    // breakhour and extrahour allow  decimal values like 0.22 but not the minus sign or anything before if  it's a decimal
    const vali = /^([0-9][\d]{0,7})(\.\d{0,2})?$/;
    try {
      // Validation
      if (hours <= 0 || isNaN(hours))
        return toast.info("Hours Cannot be Zero!", {
          closeButton: false,
        });
      if (isValidValue(breakHours))
        return toast.info("Please Check your Input  for Break Hours", {
          closeButton: false,
        });
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
      if (isValidValue(extraHours))
        return toast.error("Invalid Input for Extra Hours", {
          closeButton: false,
        });
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
              <TableHead>
                {CONSTANTATTENDANCETABLE.map((th) => (
                  <TableTH key={th.id} title={th.title} />
                ))}
              </TableHead>
              {isLoading ? (
                <Shimmer length={9} />
              ) : (
                <TableBody>
                  {data.map((th) => (
                    <tr key={th._id}>
                      <TableData title={th.firstName} subTitle={th.lastName} />
                      <TableData title={th.payRate} />
                      {editableRows[th._id] ? (
                        <td>
                          <input
                            className="text-black p-2 rounded-lg w-36 border border-gray-300 focus:border-cyan-800  focus:ring-cyan-800"
                            type="number"
                            inputMode="decimal"
                            value={hours}
                            placeholder={th.hours}
                            pattern="[0-2]*"
                            min={0}
                            max={8}
                            onChange={(e) => setHours(e.target.value)}
                          />
                        </td>
                      ) : (
                        <TableData title={th.hours || 0} />
                      )}
                      {editableRows[th._id] ? (
                        <td>
                          <input
                            className="text-black p-2 rounded-lg w-36 border border-gray-300 focus:border-cyan-800  focus:ring-cyan-800"
                            type="number"
                            inputMode="decimal"
                            placeholder={th.breakHours}
                            value={breakHours && parseFloat(breakHours)}
                            min={0}
                            max={8}
                            onChange={(e) => setBreakHours(e.target.value)}
                          />
                        </td>
                      ) : (
                        <TableData title={th.breakHours || 0} />
                      )}
                      {editableRows[th._id] ? (
                        <td>
                          <input
                            className="text-black p-2 rounded-lg w-36 border border-gray-300 focus:border-cyan-800  focus:ring-cyan-800"
                            type="number"
                            inputMode="decimal"
                            placeholder={th.extraHours}
                            value={extraHours}
                            min={0}
                            max={8}
                            onChange={(e) => setExtraHours(e.target.value)}
                          />
                        </td>
                      ) : (
                        <TableData title={th.extraHours || 0} />
                      )}
                      <TableData
                        title={
                          editableRows[th._id]?.totalHours || th.totalHours
                        }
                      />
                      <TableData
                        title={editableRows[th._id]?.totalPay || th.totalPay}
                      />
                      <TableData title={mainDate} />
                      <td className="flex p-4 gap-2">
                        <TableAction
                          cls={"text-white bg-cyan-600 hover:bg-cyan-800"}
                          svg={<PencilIcon className="w-5 h-5" />}
                          handleClick={() => handleEdit(th._id, th.payRate)}
                        />
                        {editableRows[th._id] && (
                          <TableAction
                            cls={"text-white bg-cyan-600 hover:bg-cyan-800"}
                            svg={<CheckCircleIcon className="w-5 h-5" />}
                            handleClick={() => handleSave()}
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
