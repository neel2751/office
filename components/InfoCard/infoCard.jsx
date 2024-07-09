import {
  allEmployeeDataWithDateRange,
  calculateTotalPay,
  calculateTotalPaywithPaymentType,
  getCurrentDateTotalPay,
  getEmpSummaryData,
} from "@/actions/dashboardAction/dashboardAction";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { SideDrawerGlobal } from "../ChangePassword/ChnagePassword";
import { changeDateToString } from "@/actions/commonAction/commonAction";
// import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { Select } from "../fromInput/FormInput";
import FilterTable from "../FilterTable/FilterTable";
import { useDebounce } from "@/helper/debounceHelper";
import Button from "../Button/button";
import EmptyWrapper from "../EmptyState/EmptyWrapper";
import { SvgEntry } from "@/imageUtils/SvgImages";

const InfoCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const sidebarRef = useRef(null);

  const info = async () => {
    try {
      const response = await getEmpSummaryData();
      console.log(response.data.reminderEmployees);

      // const payResponse = await getCurrentDateTotalPay();
      // console.table(payResponse);
      if (!response.status) return toast.error(response.message);
      setData(JSON.parse(response.data));
    } catch (error) {
      toast.error("Error Occurred! Please Try Again Later.");
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.body.addEventListener("mousedown", handleOutsideClick);
    info();
    return () =>
      document.body.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const memoizedEmployeeData = useMemo(() => data, [data]);
  return (
    <>
      {/* Office Employee Data */}
      <div className="mt-2 px-3 py-2">
        <h2 className=" text-left text-lg text-gray-800 font-semibold mb-2">
          Office Employee Information
        </h2>
        <div className=" xl:grid-cols-4 sm:grid-cols-2 gap-4 grid">
          <DashBoardCard
            title={"Total Employee"}
            show={true}
            value={memoizedEmployeeData?.totalEmployees || 0}
          />
          <DashBoardCard
            title={"Active Employee"}
            value={memoizedEmployeeData?.activeEmployees || 0}
          />
          <DashBoardCard
            title={"Inactive Employee"}
            value={memoizedEmployeeData?.inactiveEmployees || 0}
          />

          <DashBoardCard
            title={"Visa Expired"}
            value={memoizedEmployeeData?.expiredEmployees || 0}
          />
        </div>
      </div>
      {/* Employee memoizedEmployeeData */}
      <div className="mt-2 px-3 py-2">
        <h2 className=" text-left text-lg text-gray-800 font-semibold mb-2">
          Employee Information
        </h2>
        <div className=" xl:grid-cols-4 sm:grid-cols-2 gap-4 grid">
          <DashBoardCard
            title={"Total Employee"}
            value={
              memoizedEmployeeData?.totalEmployees
                ? memoizedEmployeeData?.totalEmployees
                : 0
            }
          />
          <DashBoardCard
            title={"Active Employee"}
            value={
              memoizedEmployeeData?.activeEmployees
                ? memoizedEmployeeData?.activeEmployees
                : "0"
            }
          />
          <DashBoardCard
            title={"Inactive Employee"}
            value={
              memoizedEmployeeData?.inactiveEmployees
                ? memoizedEmployeeData?.inactiveEmployees
                : "0"
            }
          />
          <DashBoardCard
            cls={"hover:cursor-pointer"}
            onClick={() => setShowModal(true)}
            title={"Visa Reminders"}
            value={
              memoizedEmployeeData?.reminderEmployees
                ? memoizedEmployeeData.reminderEmployees.length
                : 0
            }
          />
          {showModal && (
            /* Modal for Visa Reminder List*/
            <SideDrawerGlobal
              reff={sidebarRef}
              isOpen={showModal}
              onRequestClose={() => setShowModal(false)}
              onClose={() => setShowModal(false)}
            >
              {memoizedEmployeeData.reminderEmployees && (
                <ul role="list" className="divide-y p-5 divide-gray-100">
                  {memoizedEmployeeData.reminderEmployees.map(
                    (employee, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex justify-center items-center min-w-0 gap-x-4">
                          <div className="size-10 flex justify-center items-center text-cyan-800 font-semibold text-base rounded-full bg-gray-100">
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {employee.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {changeDateToString(employee.eVisaExp)}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
                // <ul>
                //   {memoizedEmployeeData.reminderEmployees.map((employee, index) => (
                //     <li
                //       className="text-black"
                //       key={index}
                //     >{`${employee.name} - ${employee.eVisaExp}`}</li>
                //   ))}
                // </ul>
              )}
            </SideDrawerGlobal>
          )}
        </div>
      </div>
      {/* Project Site memoizedEmployeeData */}
      <div className="mt-2 px-3 py-2">
        <h2 className=" text-left text-lg text-gray-800 font-semibold mb-2">
          Project's Information
        </h2>
        <div className=" xl:grid-cols-4 sm:grid-cols-2 gap-4 grid">
          <DashBoardCard
            title={"Total Employee"}
            value={memoizedEmployeeData.totalEmployees}
          />
          <DashBoardCard
            title={"Active Employee"}
            value={data.activeEmployees}
          />
          <DashBoardCard
            title={"Inactive Employee"}
            value={data.inactiveEmployees}
          />
          <DashBoardCard
            title={"Visa Reminders"}
            value={data.reminderEmployees ? data.reminderEmployees.length : 0}
          />
        </div>
      </div>

      <DateRangeInput />
    </>
  );
};

export default InfoCard;

const DashBoardCard = ({ title, value, show, cls, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 bg-white border border-gray-200 rounded-xl flex flex-col ${cls}`}
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-gray-800 font-semibold text-4xl">{value}</h2>
        {show && (
          <div className="flex items-center -space-x-2">
            <img
              className="rounded-full flex-shrink-0 size-7"
              src="/images/Logo.svg"
              alt="CDC OFFICE LOGO"
            />
          </div>
        )}
      </div>
      <h3 className="text-gray-500">{title}</h3>
    </div>
  );
};

const DateRangeInput = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [employeeData, setEmployeeData] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ limit: 10, page: 1, search: "" });

  const handleDateChange = (dates) => {
    try {
      // Check if the input date is null or empty
      if (!dates) {
        return null;
      } else {
        if (Array.isArray(dates)) {
          const [start, end] = dates;
          setDateRange({ startDate: start, endDate: end });
        } else {
          console.log("Error in handling date");
        }
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  const handleCalendarClose = () => {
    if (!dateRange.startDate && !dateRange.endDate) {
      setDateRange({ startDate: new Date(), endDate: null });
    }
  };
  const calculateDays = () => {
    if (dateRange.startDate && dateRange.endDate) {
      const differenceInTime =
        dateRange.endDate.getTime() - dateRange.startDate.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // days
      return differenceInDays + 1; // Add 1 to include both start and end dates
    }
    return 0; // Return 0 if either startDate or endDate is not selected
  };

  const onFilterChange = (state) => {
    setFilter(state); // Update the filter state
    fetchEmployeeData(state); // Fetch employee data when filter changes
  };

  const fetchEmployeeData = useCallback(
    async (updateFilter) => {
      if (!dateRange.startDate || !dateRange.endDate)
        return toast.warn("Please select a date range");
      if (calculateDays() <= 0)
        return toast.error("The End Date must be greater than the Start Date");
      try {
        setLoading(true); // Set loading to true
        console.log(updateFilter);
        const filterToUse = updateFilter || filter;
        const response = await allEmployeeDataWithDateRange(
          dateRange.startDate,
          dateRange.endDate,
          Number(filterToUse.page),
          Number(filterToUse.limit),
          filterToUse.search
          // page,
          // limit
        ); // Fetch employee data
        if (response.status) {
          setEmployeeData({
            data: response.data,
            totalData: response.totalData,
          }); // Set employee data
          setTotalPages(Math.ceil(response.totalData / Number(filter.limit))); // Calculate total pages
          console.log(totalPages, "this is the main after succes data");
        } else {
          toast.warn("Failed to fetch employee data"); // Show error toast
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch employee data"); // Show error toast
      } finally {
        setLoading(false); // Set loading to false
      }
    },
    [dateRange, totalPages, filter, setTotalPages]
  ); // Add dependencies

  return (
    <div>
      <div className="flex mt-2 px-3 py-2 gap-x-2 items-center gap-2">
        <p className="text-gray-700">
          Number of days selected: {calculateDays()}
        </p>
        <div className="flex  gap-2">
          <ReactDatePicker
            className="text-black p-2 w-[15rem] ring-gray-200 rounded ring-2 text-center border-cyan-600 focus:ring-cyan-600 focus:ring-1 border-none"
            selectsRange
            selected={dateRange.startDate}
            onChange={handleDateChange}
            closeOnSelect={true}
            onCalendarClose={handleCalendarClose}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            placeholderText="Select a weekday"
            // filterDate={isWeekday}
            // isClearable={true}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()} // Disable future dates
          />
          <Button
            text={"Filter"}
            onclick={() => fetchEmployeeData()}
            cls="bg-cyan-600 text-white px-3 py-2 rounded-lg"
          ></Button>
        </div>
        &nbsp;
      </div>
      {employeeData ? (
        <div className="py-8 px-2">
          <FilterTable
            attendanceData={employeeData.data}
            totalData={employeeData.totalData}
            currentPage={Number(filter.page)}
            totalPages={totalPages}
            onPageChange={onFilterChange} /// Pass the nextPage function to FilterTable
            isLoading={loading}
            filter={filter}
          />
        </div>
      ) : (
        <EmptyWrapper
          icon={<SvgEntry className="w-48 mx-auto" />}
          title="Filter Attendance"
          description=" Select a date range to view attendance records"
        /> // Display empty state if no data
      )}
    </div>
  );
};
