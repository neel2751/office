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
  CONSTANTROLTYPETABLE,
  ROLETYPEFIELD as fields,
} from "@/allFormField/field";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import {
  searchRoleTypeByKeywordNew,
  roleTypeUpdateStatusbyId,
  handleRoleType,
  deleteRoleById,
} from "@/actions/roleTypeAction/roleTypeAction";
import Popup from "@/components/Popup/Popup";
import { toast } from "react-toastify";

const RoleType = ({ page }) => {
  const [isOpen, setIsOpen] = useState(false); // OPEN MODEL STATE
  const [editId, setEditId] = useState(""); // EDIT ID FOR OPEN MODEL
  const [search, setSearch] = useState(); // Main Search Pass into Debounce
  const searchDebounce = useDebounce(search, 500); // This is Debounce Search
  const [roles, setRoles] = useState([]); // ALL DATA IS HERE
  const [currentPage, setCurrentPage] = useState(1); //  CURRENT PAGE NUMBER
  const [initialValue, setInitialValue] = useState(null); // INITIAL VALUE FROM API
  const [delId, setDelId] = useState({}); // FOR POP MODEL DELETE & UPDATE STATUS
  const [resetFlag, setResetFlag] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false); // OPEN DELETE & STATUS MODEL STATE
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
    try {
      const response = await handleRoleType(editId, data);
      if (!response.success) alert(response.message);
      toast.success(response.message ?? "Role Type Added Successfully");
      onHandleCloseModal();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  // Handle Active /Inactive Status
  const handleActiveStatus = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to Chnage Role Status?"
    );
    if (confirmed) {
      const response = await roleTypeUpdateStatus(id); // Call the onDelete function provided by the parent component
      if (!response.success) return alert(response.message);
      setResetFlag(!resetFlag);
      fetchData();
    }
  };
  // handle Open Model
  const handleOpenModel = async (data) => {
    setEditId(data._id);
    setInitialValue(data);
    setIsOpen(!isOpen);
  };

  // handle Delete and Update the status
  const handleModel = async (id, type) => {
    setDelId({ id: id, type: type });
    setIsOpenDelete(true);
  };

  // handle Delete and Update the status close model
  const onClose = () => {
    setDelId({});
    setIsOpenDelete(false);
  };

  const handleModelUpdate = async () => {
    if (delId.type === "Delete") {
      try {
        const response = await deleteRoleById(delId.id); // Call the onDelete function provided by the parent component
        if (!response.success) return toast.error(response.message);
        // return; // toast.success("Role Type deleted successfully");
        setDelId();
        setIsOpenDelete(false);
        fetchData();
        toast.success(response.message);
      } catch (err) {
        console.log("office employe status chnage error", err.message);
      }
    } else {
      try {
        const response = await roleTypeUpdateStatusbyId(delId.id); // Call the onStatus Change function provided by the parent component
        if (!response.success) return toast.error(response.message);
        setDelId({});
        setIsOpenDelete(false);
        fetchData();
        toast.success(response.message);
      } catch (err) {
        console.log("office employe status chnage error", err.message);
      }
    }
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
      const searchPro = await searchRoleTypeByKeywordNew(searchDebounce);
      console.log(searchPro, "this is come from Role Type cleint component");
      if (searchPro.data) {
        setRoles(JSON.parse(searchPro.data));
      } else {
        console.error("Invalid data structure:", searchPro);
      }
    } catch (error) {
      console.error("Error fetching or searching projects:", error);
    }
  };

  // Get all projects data
  useEffect(() => {
    fetchData(); // Call The Function
  }, [isOpen, searchDebounce, resetFlag]);
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
                {/* <TableHead>
                  {CONSTANTROLTYPETABLE.map((th) => (
                    <TableTH key={th.id} title={th.title} />
                  ))}
                </TableHead> */}
                <TableTH data={CONSTANTROLTYPETABLE} />
                <TableBody>
                  {roles &&
                    currentData.map((item) => (
                      <tr key={item._id}>
                        <TableData title={i++} />
                        <TableData title={item.roleTitle} />
                        <TableData title={item.roleDescription} />

                        <TableDataStatus
                          isActive={item.isActive}
                          // handleClick={() => handleActiveStatus(item._id)}
                          handleClick={() => handleModel(item._id, "Status")} // Toogle Status
                          // handleClick={() => console.log(item._id)}
                        />
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <TableAction
                            svg={<PencilSquareIcon className="h-5 w-5" />}
                            // btnName={`Edit ${page.split("/")[2]}`}
                            cls="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
                            handleClick={() => handleOpenModel(item)}
                          />
                          <TableAction
                            svg={<TrashIcon className=" h-5 w-5" />}
                            // btnName={`Delete ${page.split("/")[2]}`}
                            cls="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                            // handleClick={() => handleOpenModel(item)}
                            handleClick={() => handleModel(item._id, "Delete")} // delete
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
      {/* Pop Model For Delete and Status */}

      {isOpenDelete && (
        <Popup
          delId={delId}
          open={isOpenDelete}
          setOpen={setIsOpenDelete}
          onClose={onClose}
          onConfirm={handleModelUpdate}
        />
      )}

      {/* Table End */}
      <NewFormModel
        title={"Add New Role Type"}
        fields={fields}
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

export default RoleType;
