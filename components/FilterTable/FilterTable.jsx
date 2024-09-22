"use client";
import React, { useEffect, useState } from "react";
import { Select } from "../fromInput/FormInput";
import EmptyWrapper from "../EmptyState/EmptyWrapper";
import Button from "../Button/button";
import { exportCSVFile } from "@/actions/commonAction/commonAction";

const FilterTable = ({
  attendanceData,
  totalData,
  onPageChange,
  currentPage,
  filter,
}) => {
  const option = [10, 20, 30, 40, 50, "All"].filter(
    (num) => num !== "All" && num < totalData
  ); // options for filter

  // const paymentTypes = ["All", "Present", "Absent", "Leave", "Holiday"]; // options for payment type
  const paymentTypes = ["All", "Weekly", "Monthly"]; // options for payment type
  const [optionFilter, setOptionFilter] = useState({
    paymentType: filter.paymentType,
    limit: filter.limit,
  }); // state for filter options

  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalData / Number(filter.limit))
  );

  useEffect(() => {
    setOptionFilter({ paymentType: filter.paymentType, limit: filter.limit }); // update state when filter changes
    setTotalPages(Math.ceil(totalData / Number(filter.limit))); // update total pages
  }, [attendanceData]); // update filter state

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange({ ...filter, page: currentPage + 1 }); // send page to parent
    }
  };

  const prevPage = () => {
    onPageChange({ ...filter, page: currentPage - 1 }); // send page to parent
  };

  // Data limit options change function like [10,20,30,...,All];
  const handleChnage = async (event) => {
    const selectedOption = event.target.value;
    selectedOption === "All"
      ? onPageChange({ ...filter, limit: totalData, page: 1 }) // send page to parent
      : onPageChange({ ...filter, limit: selectedOption, page: 1 }); // send page to parent
  };

  // PaymentType option change function like [All,Weekly,Monthly]
  const handleChnagePaymentType = async (event) => {
    const selectedOption = event.target.value;
    // selectedOption === "All"
    // ? onPageChange({ ...filter, paymentType: "", page: 1 }) // send page to parent
    onPageChange({ ...filter, paymentType: selectedOption, page: 1 }); // send page to parent
  };

  const onChnageSearch = (e) => {
    const searchValue = e.target.value; // get search input value
    onPageChange({ ...filter, search: searchValue, page: 1 }); // call onPageChange function with search
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              {totalData > 0 && (
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 ">
                  {/* {children} */}
                  {/* <Search /> */}
                  <div className="mt-1 relative lg:w-64 xl:w-96">
                    <input
                      name="search"
                      type="search"
                      placeholder="Search Employee Name"
                      className="bg-gray-50 border border-gray-200 ps-9 text-gray-900 sm:text-sm rounded-lg focus:border-none focus:ring-cyan-600 focus:border-cyan-600 block w-full py-2 px-3"
                      onChange={onChnageSearch}
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                      <svg
                        className="size-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>
                  {option.length > 0 && (
                    <Select
                      options={option}
                      currentValue={filter.limit}
                      cls={"w-20"}
                      placeholder={"Filter"}
                      onChange={handleChnage}
                    />
                  )}
                  <Select
                    options={paymentTypes}
                    currentValue={optionFilter.paymentType}
                    cls={"w-20"}
                    onChange={handleChnagePaymentType}
                  />
                  <Button
                    text={"Export"}
                    cls={
                      "text-neutral-700 border border-2 border-neutral-600 py-2 px-3 rounded-md text-sm font-semibold hover:bg-neutral-700 hover:text-white"
                    }
                    type="button"
                    onclick={() => exportCSVFile(attendanceData)}
                    // onClick={exportCSVFile(attendanceData)}
                  />{" "}
                </div>
              )}
              {/* {attendanceData.length > 0 ? ( */}
              {totalData === 0 ? (
                <EmptyWrapper
                  title={"No Employee Data Found"}
                  description={`No employee data found on this date try with another Date range...`}
                  divcls={"sm:min-h-36"}
                />
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <FilterAttendanceTableHead
                      attendanceData={attendanceData}
                    />
                    <FilterAttendanceTableBody
                      attendanceData={attendanceData}
                    />
                  </table>
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">
                        Showing{" "}
                        <span className="font-semibold text-gray-800">
                          {currentPage}-{totalPages}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-800">
                          {totalData}
                        </span>{" "}
                      </p>
                    </div>

                    <div>
                      <div className="inline-flex gap-x-2">
                        <button
                          type="button"
                          onClick={prevPage}
                          className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                          disabled={currentPage === 1}
                        >
                          <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                          Prev
                        </button>

                        <button
                          type="button"
                          onClick={nextPage}
                          className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const FilterAttendanceTableHead = ({ attendanceData }) => {
  // from this data we need only keys not value for table head
  const tableHead = Object.keys(attendanceData[0] ?? "");
  return (
    <thead className="bg-gray-50">
      <tr>
        {tableHead.map((head, index) => (
          <th key={index} scope="col" className="px-6 py-3 text-start">
            <div className="flex items-center gap-x-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {head.charAt(0).toLocaleUpperCase() + head.slice(1)}
              </span>
            </div>
          </th>
          //   <th key={index}>{head.charAt(0).toUpperCase() + head.slice(1)}</th>
        ))}
      </tr>
    </thead>
  );
};
export const FilterAttendanceTableBody = ({ attendanceData }) => {
  console.log(attendanceData, "this is from table body");
  // Ensure data is passed as a prop for flexibility
  if (!attendanceData || !Array.isArray(attendanceData)) {
    console.error(
      "FilterAttendanceTableBody: Invalid data provided. Please provide an array of attendance objects."
    );
    return null; // Or return an empty element (e.g., <tbody />) for visual feedback
  }
  return (
    <tbody className="divide-y divide-gray-200">
      {attendanceData.map((item, index) => (
        <tr key={index}>
          {Object.keys(item).map((key) => (
            <td key={key} className="size-px whitespace-nowrap">
              <div className="ps-6 lg:ps-3 xl:ps-6 pe-6 py-3">
                <div className="flex items-center gap-x-3">
                  <div className="grow">
                    <span className="block text-sm font-semibold text-gray-800">
                      {item[key]} {item[key] === "Weekly" && " (CIS)"}
                    </span>
                  </div>
                </div>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
const Pagination = (props) => {
  // props: attendanceData, currentPage, setCurrentPage, itemsPerPage
  const { attendanceData, currentPage, setCurrentPage, itemsPerPage } = props; // destructuring
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage); // calculate total pages
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1); // generate page numbers
  const handlePageChange = (newPage) => {
    // handle page change
    setCurrentPage(newPage); // update current page
  }; // handlePageChange
  return (
    // JSX
    <nav aria-label="Pagination" className="flex justify-center">
      <ul className="flex gap-2">
        {pages.map(
          (
            page // map over pages
          ) => (
            <li key={page} className="page-item">
              <button
                type="button" // button type
                className={`page-link ${currentPage === page ? "active" : ""}`} // active class
                onClick={() => handlePageChange(page)} // handle page change
              >
                {page} // page number
              </button>
            </li>
          )
        )}{" "}
        // map over pages
      </ul>
    </nav>
  ); // JSX
}; // Pagination

export default FilterTable;
