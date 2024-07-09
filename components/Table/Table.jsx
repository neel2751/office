"use client";
import React, { Suspense, useEffect, useState } from "react";
import Search from "../Search/search";
import { TextFormInput } from "../fromInput/FormInput";
import { useForm } from "react-hook-form";
import {
  addSiteProject,
  convertToCSV,
  searchSiteProjectByKeywordNew,
  siteUpdateStatus,
  updateSiteProjectById,
} from "@/actions/siteProject/siteProjectAction";
import { useDebounce } from "@/helper/debounceHelper";
import PaginationHelper from "@/helper/paginationHelper";
import { changeDateToString } from "@/actions/commonAction/commonAction";
import Link from "next/link";

const Table = () => {
  const [isOpen, setIsOpen] = useState(false); // OPEN MODEL STATE
  const [editId, setEditId] = useState(""); // EDIT ID FOR OPEN MODEL
  const [editSiteName, setEditSiteName] = useState(""); // EDIT SITE NAME
  const [search, setSearch] = useState(); // Main Search Pass into Debounce
  const searchDebounce = useDebounce(search, 500); // This is Debounce Search
  const [siteProjects, setSiteProjects] = useState([]); // ALL DATA IS HERE
  const [currentPage, setCurrentPage] = useState(1); //  CURRENT PAGE NUMBER

  let i = 1;

  //   const siteProjects = useMemo(() => store.getState().siteProjectReducer.data, []);

  // HANDLE PAGINATION
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const pageSize = Math.max(10);
  const lastPage = Math.ceil(siteProjects.length / pageSize);

  const currentData = siteProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage === lastPage ? siteProjects.length : currentPage * pageSize
  );

  // HANDLE EXPORT CSV FILE
  async function exportCSVFile() {
    var csv = await convertToCSV(currentData);
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var linkElement = document.createElement("a");
    "download", `${new Date()} Site Projects`;
    linkElement.href = URL.createObjectURL(blob);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  }

  // Handle Add Site Project
  const handleSubmit = async (data) => {
    if (editId) {
      const response = await updateSiteProjectById(editId, data);
      if (response.status) {
        onHandleCloseModal();
      }
    } else {
      const response = await addSiteProject(data);
      if (response.status === 201) {
        onHandleCloseModal();
      } else {
        alert("Somthing  went wrong please try again later");
      }
    }
  };
  // Handle Active /Inactive Status
  const handleActiveStatus = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Chnage Status This Site?"
    );
    if (confirmed) {
      const response = await siteUpdateStatus(id); // Call the onDelete function provided by the parent component
      if (response.status) {
        fetchData();
      }
    }
  };
  // handle Open Model
  const handleOpenModel = async (data) => {
    setEditId(data._id);
    setEditSiteName(data.siteName);
    setIsOpen(!isOpen);
  };
  // Handle Close Model
  const onHandleCloseModal = () => {
    setIsOpen(false);
    setEditSiteName("");
    setEditId("");
  };

  // FETCH ALL DATA WITH USER SEARCH OR ALL DATA WITH  PAGINATION
  const fetchData = async () => {
    try {
      // setLoading(true);
      // startTransition (() => {setLoading(true)})
      const searchPro = await searchSiteProjectByKeywordNew(searchDebounce);
      if (searchPro.data) {
        setSiteProjects(JSON.parse(searchPro.data));
      } else {
        console.error("Invalid data structure:", searchPro);
      }
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching or searching projects:", error);
      // Handle the error and potentially set an error state
    }
  };

  //   useEffect(() => {
  //     let pageNumber = queryParams.get("page") || 1;
  //     const searchKeyword = queryParams.get("searchKeyword");
  //     if (!queryString) {
  //       fetchDataWithPagination(pageNumber, limit);
  //     } else {
  //       fetchSearchedData(searchKeyword, pageNumber, limit);
  //     }
  //   }, [queryString]);

  // Get all projects data
  useEffect(() => {
    fetchData(); // Call The Function
  }, [isOpen, searchDebounce]);

  return (
    <>
      {/* Header */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <TableHeading title="All Project" slug="SiteProject" />
          <div className="sm:flex">
            <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              <Search onChange={setSearch} placeholder="Search Projects" />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                data-modal-toggle="add-user-modal"
                className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add Site
              </button>
              <button
                type="button"
                onClick={exportCSVFile}
                className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  Table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <TableHead>
                  <TableTH title="id" />
                  <TableTH title="sitename" />
                  <TableTH title="date" />
                  <TableTH title="address" />
                  <TableTH title="status" />
                  <TableTH title="action" />
                </TableHead>
                <TableBody>
                  {siteProjects &&
                    currentData.map((item) => (
                      <tr key={item._id}>
                        <TableData title={i++} />
                        <TableData title={item.siteName} />
                        <TableData title={changeDateToString(item.createdAt)} />
                        <TableData
                          title={item.address ? "Available" : "Unavailable"}
                        />
                        <TableDataStatus
                          isActive={item.isActive}
                          handleClick={() => handleActiveStatus(item._id)}
                        />
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <TableAction
                            svg={
                              <svg
                                className="mr-1 h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                <path
                                  fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            }
                            btnName="Edit Site"
                            cls="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
                            handleClick={() => handleOpenModel(item)}
                          />
                          <TableAction
                            svg={
                              <svg
                                className="mr-1 h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            }
                            btnName="Delete Site"
                            cls="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                            handleClick={() => handleOpenModel(item)}
                          />
                        </td>
                      </tr>
                    ))}
                </TableBody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* New Pagination Helper Add Here... */}
      <PaginationHelper
        items={siteProjects.length} // 100
        currentPage={currentPage} // 1
        pageSize={pageSize} // 10
        onPageChange={onPageChange}
      />

      {/* Pagination */}
      <div className="bg-white sticky sm:flex items-center w-full sm:justify-between bottom-0 right-0 border-t border-gray-200 p-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center mr-2"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <span className="text-sm font-normal text-gray-500">
            Showing <span className="text-gray-900 font-semibold">1-20</span> of{" "}
            <span className="text-gray-900 font-semibold">2290</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
          >
            <svg
              className="-ml-1 mr-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </a>
          <a
            href="#"
            className="flex-1 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center"
          >
            Next
            <svg
              className="-mr-1 ml-1 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      {/* <!-- Edit User Modal --> hidden to flex */}
      <div
        className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full"
        id="user-modal"
      >
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="bg-white rounded-lg shadow relative">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold">Edit user</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="user-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="edit-first-name"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="edit-first-name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="Bonnie"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="edit-last-name"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="edit-last-name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="Green"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="editemail"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="editemail"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="example@company.com"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="edit-phone-number"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone-number"
                      id="edit-phone-number"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="e.g. +(12)3456 789"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="editdepartment"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      id="editdepartment"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="Development"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="editcompany"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="number"
                      name="company"
                      id="editcompany"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="123456"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="current-password"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="new-password"
                      className="text-sm font-medium text-gray-900 block mb-2"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="items-center p-6 border-t border-gray-200 rounded-b">
                  <button
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                  >
                    Save all
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Add User Modal --> hidden to flex */}
      <div
        className={`${
          isOpen
            ? "flex items-center shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]"
            : "hidden opacity-0"
        } overflow-x-hidden overflow-y-auto drop-shadow-2xl fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full`}
        id="add-user-modal"
      >
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="bg-white rounded-lg shadow relative">
            {/* <!-- Modal header --> */}

            {/* <!-- Modal body --> */}
            <AddEditModel
              id={editId}
              title="Add New Site"
              inputName="siteproject"
              btnName={`${editId ? "Edit" : "Add"} Site`}
              placeholder={`${
                editSiteName ? editSiteName : "Enter your Site Project"
              }`}
              labelText="SiteProject"
              onSubmit={handleSubmit}
              setIsOpen={onHandleCloseModal}
            />
          </div>
        </div>
      </div>
      {/* <!-- Delete User Modal --> hidden to flex*/}
      <div
        className="hidden overflow-x-hidden overflow-y-auto fixed top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center h-modal sm:h-full"
        id="delete-user-modal"
      >
        <div className="relative w-full max-w-md px-4 h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="bg-white rounded-lg shadow relative">
            {/* <!-- Modal header --> */}
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="delete-user-modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 pt-0 text-center">
              <svg
                className="w-20 h-20 text-red-600 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                Are you sure you want to delete this user?
              </h3>
              <a
                href="#"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </a>
              <a
                href="#"
                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                data-modal-toggle="delete-user-modal"
              >
                No, cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

// # THIS IS HEADING IS FOR TABLE ROW NOT THE WHOLE TABLE
export function TableHeading({ title, slug = "Site Project" }) {
  return (
    <div className="mb-4">
      <nav className="flex mb-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 inline-flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium"
              >
                {slug}
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span
                className="text-gray-400 ml-1 md:ml-2 text-sm font-medium"
                aria-current="page"
              >
                List
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
        {title}
      </h1>
    </div>
  );
}

// # THIS IS THE TABLE HEAD IN USING {TableTH}
export function TableHead({ children }) {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
}

// # THIS IS TABLE <th> DATA FOR  THE ABOVE USER ROW EXAMPLE
export function TableTH({ title }) {
  return (
    <th
      scope="col"
      className="p-4 text-left text-xs font-medium text-gray-400 uppercase"
    >
      {title}
    </th>
  );
}
// # THIS IS THE MAIN TABLE BODY
export function TableBody({ children }) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
  );
}
// # TABLE DATA WITH TITLE or SUBTITLE
export function TableData({ title, subTitle, onclick }) {
  return (
    // <tr className="hover:bg-gray-100">
    <>
      {subTitle ? (
        <td
          onClick={onclick}
          className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0"
        >
          <div className="text-sm font-normal text-gray-500">
            <div className="text-sm font-medium text-gray-800">{title}</div>
            <div
              className={`${
                subTitle ? "block" : "hidden"
              }text-sm font-normal text-gray-500`}
            >
              {subTitle}
            </div>
          </div>
        </td>
      ) : (
        <td
          onClick={onclick}
          className="p-4 whitespace-nowrap text-sm font-medium text-gray-800"
        >
          {title}
        </td>
      )}
    </>
  );
}
// # TABLE STATUS
export function TableDataStatus({ isActive, handleClick }) {
  return (
    <td className=" cursor-pointer" onClick={handleClick}>
      {isActive ? (
        <div className="inline-flex text-sm items-center bg-teal-100 text-teal-800 py-1.5 px-2.5 rounded-full">
          <div className="h-2 w-2 rounded-full text-sm bg-gray-800 mr-2"></div>
          Active
        </div>
      ) : (
        <div className="inline-flex items-center text-sm bg-gray-100 text-gray-800 py-1.5 px-2.5 rounded-full">
          <div className="h-2 w-2 rounded-full text-sm bg-gray-800 mr-2"></div>
          Inactive
        </div>
      )}
    </td>
  );
}

// # TABLE SITE STATUS LIKE COMPLETED, ON HOLD, ACTIVE, NO STATUS
export function TableSiteStatus({ title }) {
  let statusColorClass = "";

  if (title === "Completed") {
    statusColorClass = "bg-teal-100 text-teal-800";
  } else if (title === "On Hold") {
    statusColorClass = "bg-yellow-100 text-yellow-800";
  } else if (title === "Active") {
    statusColorClass = "bg-sky-100 text-sky-800";
  } else {
    statusColorClass = "bg-gray-100 text-gray-800";
  }
  return (
    <td>
      <div
        className={`inline-flex text-xs items-center font-medium ${statusColorClass} py-0.5 px-1.5 rounded`}
      >
        {title}
      </div>
    </td>
  );
}
// # TABLE ACTION BUTTON WITHOUT <td>
export function TableAction({ btnName, cls, link, handleClick, svg }) {
  return (
    <>
      {link ? (
        <Link
          href={link}
          className={`${cls}font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
          }`}
        >
          {svg}
          {btnName}
        </Link>
      ) : (
        <button
          onClick={handleClick}
          type="button"
          data-modal-toggle="user-modal"
          className={`${cls} font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center`}
          //   className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
        >
          {svg}
          {btnName}
        </button>
      )}
    </>
  );
}
// # THIS IS THE MODEL FOR BOTH ADD & EDIT FOR SINGLE INPUT FIELD
export function AddEditModel({
  id,
  inputName,
  title,
  btnName,
  labelText,
  placeholder,
  onSubmit,
  setIsOpen,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();
  const clsError = () => {
    reset();
    clearErrors();
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex items-center justify-between py-2 px-4 border-b rounded-t">
        <h3 className=" text-base text-black font-semibold">
          {id ? `Edit ${title.split(" ")[2]}` : `${title}`}
        </h3>
        <button
          onClick={clsError}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          data-modal-toggle="add-user-modal"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <div className="flex flex-col">
                <TextFormInput
                  {...register(inputName, {
                    required: `${labelText} is required`,
                  })}
                  cls={`${errors[inputName] ? "border-red-500" : ""}`}
                  type="text"
                  labelText={labelText}
                  placeholder={placeholder}
                />
                {errors[inputName] && (
                  <p className="text-red-600 text-sm mt-1 ml-2" role="alert">
                    {errors[inputName].message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="items-center py-5 border-gray-200 rounded-b">
            <button
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              {btnName}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// # THIS IS NOT IN USE BUT WE CAN USE FOR WHOLE TABLE AS ALL IN ONE COMPONENTS <-- UNDER DEVELOPMENT
export function UsersTable({ data }) {
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
      <table className="table-fixed min-w-full divide-y divide-gray-200">
        <TableHead />

        <tbody className="bg-white divide-y divide-gray-200">
          {/* MAP START */}
          <tr className="hover:bg-gray-100">
            <td className="p-4 w-4">
              <div className="flex items-center">
                <input
                  id="checkbox-{{ .id }}"
                  aria-describedby="checkbox-1"
                  type="checkbox"
                  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                />
                <label htmlFor="checkbox-{{ .id }}" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <td className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
              <img
                className="h-10 w-10 rounded-full"
                src="/images/users/{{ .avatar }}"
                alt="{{ .name }} avatar"
              />
              <div className="text-sm font-normal text-gray-500">
                <div className="text-base font-semibold text-gray-900">
                  name
                </div>
                <div className="text-sm font-normal text-gray-500">email</div>
              </div>
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
              position
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
              {" "}
              country
            </td>
            <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                Status
              </div>
            </td>
            <td className="p-4 whitespace-nowrap space-x-2">
              <button
                type="button"
                data-modal-toggle="user-modal"
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Edit user
              </button>
              <button
                type="button"
                data-modal-toggle="delete-user-modal"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Delete user
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// THIS IS THE ADD & EDIT MODEL FOR MULTIPLE INPUT FIELD <-- UNDER DEVELOPMENT
export function AddUserModel() {
  return (
    <div className="p-6 space-y-6">
      <form action="#">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="Bonnie"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="Green"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="example@company.com"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="phone-number"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Phone Number
            </label>
            <input
              type="number"
              name="phone-number"
              id="phone-number"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="e.g. +(12)3456 789"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="department"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Department
            </label>
            <input
              type="text"
              name="department"
              id="department"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="Development"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="company"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Company
            </label>
            <input
              type="number"
              name="company"
              id="company"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              placeholder="123456"
              required
            />
          </div>
        </div>
        {/* <!-- Modal footer --> */}
        <div className="items-center p-6 border-t border-gray-200 rounded-b">
          <button
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Add user
          </button>
        </div>
      </form>
    </div>
  );
}
