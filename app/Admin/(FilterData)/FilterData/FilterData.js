"use client";
import { allEmployeeDataWithDateRange } from "@/actions/dashboardAction/dashboardAction";
import Button from "@/components/Button/button";
import { Breadcrumbs } from "@/components/ChangePassword/ChnagePassword";
import EmptyWrapper from "@/components/EmptyState/EmptyWrapper";
import FilterTable from "@/components/FilterTable/FilterTable";
import FilterEmployeIdContext from "@/context/filterEmployeIdContext";
import { SvgEntry } from "@/imageUtils/SvgImages";
import React, { useState, useCallback, memo, useContext } from "react";
import ReactDatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";

// export const FilterContext = createContext();

const FilterData = () => {
  return <DateRangeInput />;
  // return <TextContext />;
};
export const DateRangeInput = ({ employeId }) => {
  const path = usePathname();
  const [employeeData, setEmployeeData] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    startDate: new Date(),
    endDate: new Date(),
    limit: 3,
    page: 1,
    search: "",
    paymentType: "All",
    employeId: employeId || [],
    // employeId: ["660427191bae027945f29026", "660434131bae027945f29082"],
  });

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
  const handleCalendarClose = () => {
    if (!filter.startDate && !filter.endDate) {
      setDateRange({ startDate: new Date(), endDate: null });
    }
  };
  const calculateDays = () => {
    if (filter.startDate && filter.endDate) {
      const differenceInTime =
        filter.endDate.getTime() - filter.startDate.getTime();
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
      if (!filter.startDate || !filter.endDate)
        return toast.warn("Please select a date range");
      if (calculateDays() <= 0)
        return toast.error("The End Date must be greater than the Start Date");
      try {
        setLoading(true); // Set loading to true
        const filterToUse = updateFilter || filter;
        const response = await allEmployeeDataWithDateRange({
          ...filterToUse,
        });
        // filter.startDate,
        // filter.endDate,
        // filterToUse.paymentType === "All" ? "" : filterToUse.paymentType,
        // "",
        // filterToUse.search,
        // Number(filterToUse.limit),
        // Number(filterToUse.page)
        // ); // Fetch employee data
        if (response.status) {
          setEmployeeData({
            data: response.data,
            totalData: response.totalData,
          }); // Set employee data
          setTotalPages(Math.ceil(response.totalData / Number(filter.limit))); // Calculate total pages
        } else {
          toast.warn("Failed to fetch employee data"); // Show error toast
        }
      } catch (error) {
        toast.error("Failed to fetch employee data"); // Show error toast
      } finally {
        setLoading(false); // Set loading to false
      }
    },
    [totalPages, filter, setTotalPages]
  ); // Add dependencies

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          {
            label: "Filter Data",
            href: path,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col mt-2 px-3 py-2 gap-x-2 items-start gap-2">
        <div className="flex  gap-2">
          <ReactDatePicker
            disabled={loading} // Disable date picker when loading
            className="text-neutral-700 p-2 w-[15rem] ring-neutral-300 rounded ring-2 text-center focus:ring-cyan-600 outline-none"
            selectsRange
            selected={filter.startDate}
            onChange={handleDateChange}
            closeOnSelect={true}
            onCalendarClose={handleCalendarClose}
            startDate={filter.startDate}
            endDate={filter.endDate}
            placeholderText="Select a weekday"
            // filterDate={isWeekday}
            // isClearable={true}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()} // Disable future dates
          />
          <Button
            buttonClick={() => fetchEmployeeData()}
            text={"Filter"}
            disabled={loading ? "true" : ""}
            onclick={() => fetchEmployeeData()}
            cls={`bg-cyan-600 text-white px-3 py-2 rounded-lg ${
              loading ? "cursor-progress bg-gray-400 text-black" : ""
            }`}
          ></Button>
        </div>
        <p className="text-neutral-800 text-sm">
          Number of days selected:{" "}
          <span className="text-green-600 text-lg">{calculateDays()}</span> days
        </p>
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

const FilterAttendance = memo(({ onclick }) => {
  const { filter, dateRange } = useContext(FilterEmployeIdContext); // Get the filter context
  const [employeData, setEmployeeData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchEmployeeData = useCallback(
    async (updateFilter) => {
      if (!filter.startDate || !filter.endDate)
        return toast.warn("Please select a date range");
      try {
        setLoading(true); // Set loading to true
        const filterToUse = updateFilter || filter;
        const response = await allEmployeeDataWithDateRange({
          ...filterToUse,
        });
        if (response.status) {
          setEmployeeData({
            data: response.data,
            totalData: response.totalData,
          }); // Set employee data
          setTotalPages(Math.ceil(response.totalData / Number(filter.limit))); // Calculate total pages
        } else {
          toast.warn("Failed to fetch employee data"); // Show error toast
        }
      } catch (error) {
        toast.error("Failed to fetch employee data"); // Show error toast
      } finally {
        setLoading(false); // Set loading to false
      }
    },
    [filter]
  );
  // console.log(filter); // Log the filter object
  return <p className="text-black">Test: {JSON.stringify(filter)}</p>;
});

const TextContext = () => {
  // employeId: ["660427191bae027945f29026", "660434131bae027945f29082"]
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    search: "",
    paymentType: "All",
    // employeId: [],
    employeId: ["660427191bae027945f29026", "660434131bae027945f29082"],
    sort: "",
    asc: "",
    desc: "",
  });

  const handleCalendarClose = () => {
    try {
      if (!dateRange.startDate && !dateRange.endDate) {
        setDateRange({
          startDate: new Date(),
          endDate: new Date(),
        });
      }
    } catch (error) {
      toast.warn("Error: " + error.message);
    }
  };

  const handleDateChange = (dates) => {
    try {
      // Check if the input date is null or empty
      if (!dates) {
        setDateRange({
          startDate: new Date(),
          endDate: new Date(),
        });
        return toast.warn("Please select a date range"); // Display a warning message
      } else {
        if (Array.isArray(dates)) {
          const [start, end] = dates;
          // setFilter({startDate: start, endDate: end });
          setDateRange({ startDate: start, endDate: end });
        } else {
          toast.warn("Invalid date range"); // Display a warning message
          console.log("Error in handling date");
        }
      }
    } catch (error) {
      toast.error("Error on selecting date range"); // Display an error message
      console.log(`Error: ${error}`);
    }
  };

  return (
    <FilterEmployeIdContext.Provider value={{ filter, dateRange }}>
      <div className="">
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
      <FilterAttendance />
    </FilterEmployeIdContext.Provider>
  );
};

export default FilterData;
