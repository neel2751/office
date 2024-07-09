"use client";
import React, { useState, useEffect } from "react";
import Search from "@/components/Search/search";
import {
  TableAction,
  TableBody,
  TableData,
  TableDataStatus,
  TableHead,
  TableHeading,
  TableTH,
} from "@/components/Table";
import { useDebounce } from "@/helper/debounceHelper";
import NewFormModel from "@/components/ModelForm/FormModel";
import {
  addRole,
  roleUpdateStatus,
  searchRoleByKeyword,
  updateRoleById,
} from "@/actions/roleAction/roleAction";
import { CONSTANTROLETABLE, ROLEFIELD as fields } from "@/allFormField/field";
import { getAllProjects } from "@/actions/siteProject/siteProjectAction";
import { TableSiteStatus } from "@/components/Table/Table";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

const RoleTable = ({ page }) => {
  const [isOpen, setIsOpen] = useState(false); // OPEN MODEL STATE
  const [editId, setEditId] = useState(""); // EDIT ID FOR OPEN MODEL
  const [search, setSearch] = useState(); // Main Search Pass into Debounce
  const searchDebounce = useDebounce(search, 500); // This is Debounce Search
  const [roles, setRoles] = useState([]); // ALL DATA IS HERE
  const [currentPage, setCurrentPage] = useState(1); //  CURRENT PAGE NUMBER
  const [initialValue, setInitialValue] = useState(null); // INITIAL VALUE FROM API
  const [resetFlag, setResetFlag] = useState(false);
  const [siteOptions, setSiteOptions] = useState([]); // FOR SITE OPTION SEARCH FILED
  let i = 1; // FOR ID GENERATION

  // HANDLE PAGINATION
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const pageSize = Math.max(10);
  const lastPage = Math.ceil(roles.length / pageSize);

  const currentData = roles.slice(
    (currentPage - 1) * pageSize,
    currentPage === lastPage ? roles.length : currentPage * pageSize
  );
  // Handle Add Site Project
  const handleSubmit = async (data) => {
    if (editId) {
      const response = await updateRoleById(editId, data);
      if (response.message) alert(response.message);
      if (response.status) {
        onHandleCloseModal();
      }
    } else {
      const response = await addRole(data);
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
      "Are you sure you want to Chnage Role Status?"
    );
    if (confirmed) {
      const response = await roleUpdateStatus(id); // Call the onDelete function provided by the parent component
      if (response.status) {
        fetchData();
      }
    }
  };
  // handle Open Model
  const handleOpenModel = async (data) => {
    setEditId(data._id);
    setInitialValue(data);
    // const newData = data.projectSiteID.siteName;
    // setInitialValue({ ...data, projectSiteID: newData });
    setIsOpen(!isOpen);
  };
  // Handle Close Model
  const onHandleCloseModal = () => {
    setIsOpen(false);
    setInitialValue("");
    setResetFlag(!resetFlag);
    setEditId("");
  };
  // FETCH ALL DATA WITH USER SEARCH OR ALL DATA WITH  PAGINATION
  const fetchData = async () => {
    try {
      const searchPro = await searchRoleByKeyword(searchDebounce);
      if (searchPro.data) {
        setRoles(JSON.parse(searchPro.data));
      } else {
        console.error("Invalid data structure:", searchPro);
      }
    } catch (error) {
      console.error("Error fetching or searching projects:", error);
    }
  };
  const getAllSite = async () => {
    try {
      const response = await getAllProjects();
      //change key name like siteName to lable
      if (!response)
        return alert("You have to add first Site Project At least One");
      setSiteOptions(
        JSON.parse(response.data).map((item) => ({
          code: item._id,
          label: item.siteName,
        }))
      );
    } catch (error) {
      console.log("Error fetching options", error);
    }
  };
  const updatedRoleField = fields.map((field) => {
    if (field.name === "projectSiteID") {
      return {
        ...field,
        options: siteOptions,
      };
    }
    return field;
  });
  // Get all projects data
  useEffect(() => {
    getAllSite();
    fetchData(); // Call The Function
  }, [isOpen, searchDebounce, resetFlag]);
  //   const getRoles = async () => {
  //     try {
  //       let res = await fetch("/api/role?page=" + pageNumber, { method: "GET" });
  //       if (!res.ok) throw new Error("Could not fetch the data");
  //       let json = await res.json();
  //       setroles(json.data);
  //       setPageNumber(json.current_page)
  //     } catch (error) {
  //       console.log(`Error! ${error}`);
  //     }
  //   };

  //   React.useEffect(() => {
  //     getRoles();
  //     }, [searchDebounce]);
  return (
    <div className="h-full w-full mt-16 bg-gray-50 relative overflow-y-auto lg:ml-64">
      {/* Header */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <TableHeading
            title={`All ${page.split("/")[2]}`}
            slug={`All ${page.split("/")[2]}`}
          />
          <div className="sm:flex">
            <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              <Search
                onChange={setSearch}
                placeholder={`Search ${page.split("/")[1]}`}
              />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <TableAction
                svg={<PlusCircleIcon className="-ml-1 mr-2 h-6 w-6" />}
                cls={
                  "w-1/2 sm:w-auto text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
                }
                btnName={`Add ${page.split("/")[2]}`}
                handleClick={() => setIsOpen(!isOpen)}
              />
              <TableAction
                svg={<DocumentArrowDownIcon className="-ml-1 mr-2 h-6 w-6" />}
                btnName={"Export"}
                cls={
                  "w-1/2 sm:w-auto text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200"
                }
                // handleClick={() => exportCSVFile(currentData)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <TableHead>
                  {CONSTANTROLETABLE.map((th) => (
                    <TableTH key={th.id} title={th.title} />
                  ))}
                </TableHead>
                <TableBody>
                  {roles &&
                    currentData.map((item) => (
                      <tr key={item._id}>
                        <TableData title={i++} />
                        <TableData title={item.roleName} />
                        <TableData title={item.roleType} />
                        <TableSiteStatus
                          title={
                            item.projectSiteID.status || item.siteInfo[0].status
                          }
                        />
                        <TableData
                          title={
                            item.projectSiteID.siteName ||
                            item.siteInfo[0].siteName
                          }
                        />

                        <TableDataStatus
                          isActive={item.isActive}
                          handleClick={() => handleActiveStatus(item._id)}
                        />
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <TableAction
                            svg={<PencilSquareIcon className="mr-1 h-5 w-5" />}
                            btnName={`Edit ${page.split("/")[2]}`}
                            cls="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
                            handleClick={() => handleOpenModel(item)}
                          />
                          <TableAction
                            svg={<TrashIcon className="mr-1 h-5 w-5" />}
                            btnName={`Delete ${page.split("/")[2]}`}
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
      {/* Table End */}
      <NewFormModel
        title={"Add New Role"}
        fields={updatedRoleField}
        initialValues={initialValue}
        onSubmit={handleSubmit}
        isOpen={isOpen}
        btnName={"Create New Role"}
        editBtnName={"Update Role Information"}
        id={editId}
        onHandleCloseModal={onHandleCloseModal}
        resetFlag={resetFlag}
        setResetFlag={setResetFlag}
      />
    </div>
  );
};

export default RoleTable;
