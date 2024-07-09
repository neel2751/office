"use client";
import React, { useEffect, useState } from "react";
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
import { TableSiteStatus } from "@/components/Table/Table";
import {
  DocumentArrowDownIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  CONSTANTROLETABLE,
  ASSIGNSITEFIELD as fields,
} from "@/allFormField/field";
import NewFormModel from "@/components/ModelForm/FormModel";
import { getAllProjects } from "@/actions/siteProject/siteProjectAction";
import { getAllOfficeEmploye } from "@/actions/employeAction/employeAction";
import {
  assignSiteDelete,
  assignSiteStatusUpdate,
  getAssignSiteData,
  handleAssignSite,
} from "@/actions/assignSiteAction/assignSiteAction";
import { changeDateToString } from "@/actions/commonAction/commonAction";
import { useDebounce } from "@/helper/debounceHelper";

const AssignSite = ({ page }) => {
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const [assignData, setAssignData] = useState([]); // Main Data
  const [siteOptions, setSiteOptions] = useState([]); // This is all site data
  const [employeOptions, setEmployeOptions] = useState([]); // This is for Employe data
  const [initialValue, setInitialValue] = useState(null); // this is intial Value
  //   const [assignRole, setAssignRole] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [resetFlag, setResetFlag] = useState(false);

  let i = 1;

  const handleOpenModel = (opendata) => {
    // if (!opendata) return setIsOpen(false);
    setEditId(opendata._id);
    setInitialValue(opendata);
    setIsOpen(true);
  };

  const handleOpenNewModel = () => {
    setEditId(null); // Clearing editId for new entry
    setInitialValue(null); // Clearing initialValue for new entry
    setIsOpen(true); // Opening modal for new entry
  };

  const onHandleCloseModal = () => {
    setEditId(null);
    setInitialValue(null); // Clearing initialValue
    setResetFlag(true);
    setIsOpen(false); // Setting isOpen to false directly
  };
  const handleActiveStatus = async (id) => {
    const confirmed = window.confirm("Are you sure to change the status?");
    if (!confirmed) return;
    try {
      const response = await assignSiteStatusUpdate(id); // Call the onDelete function provided by the parent component
      if (!response.status) return alert(response.message);
      getAllAssignData();
    } catch (err) {
      console.log("office employe status chnage error", err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure to change the status?");
    if (!confirmed) return;
    try {
      const response = await assignSiteDelete(id); // Call the onDelete function provided by the parent component
      if (!response.status) return alert(response.message);
      getAllAssignData();
    } catch (err) {
      console.log("office employe status chnage error", err.message);
    }
  };
  const handleSubmit = async (data) => {
    if (!data) return alert("Please Provide Data");
    try {
      const response = await handleAssignSite(editId, data);
      if (!response.status) return alert(response.message);
      onHandleCloseModal();
    } catch (error) {
      console.log(error);
    } finally {
      //   onHandleCloseModal();
    }
  };
  const getAllAssignData = async () => {
    try {
      const response = await getAssignSiteData(searchDebounce);
      if (response.status) {
        setAssignData(JSON.parse(response.data));
      }
    } catch (error) {
      console.log("error form ui assignSite", error);
    }
  };
  const getAllSite = async () => {
    try {
      const response = await getAllProjects();
      //change key name like siteName to lable
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
  const getAllEmploye = async () => {
    try {
      const response = await getAllOfficeEmploye();

      //change key name like siteName to lable
      setEmployeOptions(
        JSON.parse(response.data).map((item) => ({
          code: item._id,
          label: item.name,
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
    if (field.name === "roleId") {
      return { ...field, options: employeOptions };
    }
    return field;
  });
  useEffect(() => {
    getAllSite();
    getAllEmploye();
    getAllAssignData();
  }, [isOpen, searchDebounce]);
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
                handleClick={handleOpenNewModel}
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
                  {assignData &&
                    assignData.map((item) => (
                      <tr key={item._id}>
                        <TableData title={i++} />
                        <TableData title={item.roleId.name || "--"} />
                        <TableData title={changeDateToString(item.startDate)} />
                        <TableSiteStatus
                          title={item?.projectSiteID?.status || true}
                        />
                        <TableData
                          title={item.projectSiteID.siteName || "Not Assigned"}
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
                            handleClick={() => handleDelete(item._id)}
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
        onSubmit={handleSubmit}
        isOpen={isOpen}
        btnName={"Create New Role"}
        editBtnName={"Update Role Information"}
        id={editId}
        onHandleCloseModal={onHandleCloseModal}
        resetFlag={resetFlag}
        setResetFlag={setResetFlag}
      />
      {initialValue && (
        <NewFormModel
          title={"Add New Role"}
          fields={updatedRoleField}
          initialValues={initialValue && initialValue}
          onSubmit={handleSubmit}
          isOpen={isOpen}
          btnName={"Create New Role"}
          editBtnName={"Update Role Information"}
          id={editId}
          onHandleCloseModal={onHandleCloseModal}
          resetFlag={resetFlag}
          setResetFlag={setResetFlag}
        />
      )}
    </div>
  );
};

export default AssignSite;
