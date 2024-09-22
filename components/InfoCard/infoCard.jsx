import {
  allEmployeeDataWithDateRange,
  fetchCardData,
  getTotalSiteWorkingRightCount,
} from "@/actions/dashboardAction/dashboardAction";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { Select } from "../fromInput/FormInput";
import FilterTable from "../FilterTable/FilterTable";
import Button, { ButtonLink } from "../Button/button";
import EmptyWrapper from "../EmptyState/EmptyWrapper";
import { SvgEntry } from "@/imageUtils/SvgImages";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import {
  Activity,
  ArrowUpRight,
  Badge,
  BadgeCheck,
  BadgeX,
  Ban,
  CalendarCheck,
  CircleSlash,
  CreditCard,
  OctagonPause,
  PoundSterling,
  Siren,
  Users,
} from "lucide-react";
import { ChartComponent, DateWiseChart } from "../Chart/Chart";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { changeDateToString } from "@/actions/commonAction/commonAction";

const InfoCard = () => {
  const [showModal, setShowModal] = useState(false);
  // const [generalData, setGeneralData] = useState({data: []});
  const [data, setData] = useState();
  const sidebarRef = useRef(null);
  const [chartData, setChartData] = useState();
  const [today, setToday] = useState();
  const [siteData, setSiteData] = useState();

  const info = async () => {
    try {
      const {
        NumberOfEmployeeData,
        NumberOfficeEmployeeData,
        last90DaysDataForChartData,
        CurrentDayTotalPay,
        TotalFullSiteData,
      } = await fetchCardData();
      const mergeData = [
        { label: "Employee Summary", ...JSON.parse(NumberOfEmployeeData.data) },
        {
          label: "Office Employee Summary",
          ...JSON.parse(NumberOfficeEmployeeData.data),
        },
      ]; // merge data
      setToday({
        ...CurrentDayTotalPay,
        employees: JSON.parse(CurrentDayTotalPay.employees),
      });
      setData(mergeData);
      setChartData(last90DaysDataForChartData);
      setSiteData(TotalFullSiteData);
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
  const memoizedChartData = useMemo(() => chartData, [chartData]); // memoize data
  const memoizedSiteData = useMemo(() => siteData, [siteData]); // memoize data
  const memoizedToday = useMemo(() => today, [today]); // memoize data
  return (
    <>
      {/* Office Employee Data */}
      {memoizedEmployeeData?.map((test) => (
        <EmployeeDataCount memoizedEmployeeData={test} />
      ))}
      <main className="flex flex-1 flex-col gap-4 px-4 md:gap-x-8 md:px-8 py-4">
        <h1 className="text-lg font-semibold md:text-md text-neutral-700 ms-2">
          Site Summary
        </h1>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {memoizedSiteData?.statuses?.map((test, index) => {
            return (
              <CardInfo
                id={index}
                title={test._id}
                value={test.count}
              ></CardInfo>
            );
          })}
        </div>
      </main>
      <div className="px-8 py-4 lg:flex gap-x-8 w-full">
        <div className="flex flex-col lg:w-1/2 gap-8">
          <div className="flex gap-8">
            <TodayCard
              title={"Total Pay"}
              value={memoizedToday?.totalPay || 0}
              supportText={"Today"}
            />
            <TodayCard
              title={"Total Hours"}
              value={memoizedToday?.totalHours || 0}
              supportText={"Hours"}
            />
          </div>
          <DateWiseChart dayData={memoizedChartData} />
          {/* <ChartComponent chartData={chartData} /> */}
        </div>
        <div className="lg:w-1/2">
          <RecentAttendance data={memoizedToday?.employees} />
        </div>
      </div>
      {/* Employee memoizedEmployeeData */}
      {/* <div className="mt-2 px-3 py-2">
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
              )}
            </SideDrawerGlobal>
          )}
        </div>
      </div> */}
    </>
  );
};

export default InfoCard;

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

const EmployeeDataCount = ({ memoizedEmployeeData }) => {
  const {
    label,
    totalEmployees,
    activeEmployees,
    inactiveEmployees,
    expiredEmployees,
  } = memoizedEmployeeData;
  return (
    <main className="flex flex-1 flex-col gap-4 px-4 md:gap-x-8 md:px-8 py-4">
      <h1 className="text-lg font-semibold md:text-md text-neutral-700 ms-2">
        {label}
      </h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CardInfo
          title={"Total Employees"}
          value={totalEmployees}
          icon={<Users className="w-5 h-5 text-gray-600" />}
        />
        <CardInfo
          title={"Active Employees"}
          value={activeEmployees}
          icon={<BadgeCheck className="w-5 h-5 text-green-600" />}
        />
        <CardInfo
          title={"Inactive Employees"}
          value={inactiveEmployees}
          icon={<BadgeX className="w-5 h-5 text-rose-600" />}
        />
        <CardInfo
          title={"Visa Expired"}
          value={expiredEmployees}
          icon={<Ban className="w-5 h-5 text-red-600" />}
        />
      </div>
    </main>
  );
};

const CardInfo = ({ id, title, value, color, icon, description }) => {
  return (
    <>
      <Card x-chunk={`dashboard-01-chunk-${id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium ${color}`}>
            {title || "No Title"}
          </CardTitle>
          {/* <PoundSterling className="h-4 w-4 text-green-700" /> */}
          {title === "Active" && <Siren className="w-5 h-5 text-green-600" />}
          {title === "On Hold" && (
            <OctagonPause className="w-5 h-5 text-amber-600" />
          )}
          {title === "Completed" && (
            <CalendarCheck className="w-5 h-5 text-blue-600" />
          )}
          {title === "No Status" && (
            <CircleSlash className="w-5 h-5 text-neutral-500" />
          )}
          {icon && icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value || 0}</div>
          <p className="text-xs text-muted-foreground">
            {/* +20.1% from last month */}
            {description && description}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

const RecentAttendance = ({ data }) => {
  const handleclick = async () => {
    const response = await getTotalSiteWorkingRightCount();
    console.log(response);
  };
  return (
    <Card className="w-full">
      <CardHeader className="px-7 flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Attendance</CardTitle>
          <CardDescription>Recent Attendance from you.</CardDescription>
        </div>
        <ButtonLink
          href="#"
          title={"View All"}
          cls={
            "inline-flex whitespace-nowrap ml-auto gap-1 items-center rounded-md text-xs h-8 px-3 text-white hover:bg-neutral-700"
          }
        >
          <ArrowUpRight className="h-4 w-4" />
        </ButtonLink>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead className="hidden sm:table-cell">PayRate</TableHead>
              <TableHead className="hidden sm:table-cell">Hours</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {item.paymentType || "No Type"}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  £{item.payRate.toFixed(2)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.totalHours.toFixed(2)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {changeDateToString(new Date())}
                </TableCell>
                <TableCell className="text-right font-medium">
                  £{item.totalPay.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Button
        onclick={handleclick}
        text={"Test"}
        cls={
          "inline-flex whitespace-nowrap ml-auto gap-1 items-center rounded-md text-xs h-8 px-3 text-white hover:bg-neutral-700"
        }
      ></Button>
    </Card>
  );
};

const TodayCard = ({ title, description, value, supportText }) => {
  return (
    <Card className="max-w-xs" x-chunk="charts-01-chunk-6">
      <CardHeader className="p-4 pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          You're burning an average of 754 calories per day. Good job!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">
        <div className="flex items-baseline gap-2 text-2xl font-bold tabular-nums leading-none">
          {title.toLowerCase().split(" ").join("") === "totalhours"
            ? value
            : `£${value}`}
          {/* {value || 0} */}
          <span className="text-sm font-normal text-muted-foreground">
            {supportText}
          </span>
        </div>
        <Progress
          // value={Math.floor(value / 2)}
          value={Math.round(value) / 2 > 100 ? 90 : Math.round(value) / 2}
          className="bg-neutral-200"
        />
      </CardContent>
    </Card>
  );
};
