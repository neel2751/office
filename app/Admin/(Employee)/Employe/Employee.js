"use client";
import {
  employeDelete,
  employeUpdateStatus,
  getAllEmployees,
} from "@/actions/employeAction/employeAction";
import { CONSTANTEMPLOYETABLE } from "@/allFormField/field";
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
import React, { useCallback, useEffect, useState } from "react";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilSquareIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import { EmployeeForm } from "../AddEmployee/addEmployee";
import { changeDateToString } from "@/actions/commonAction/commonAction";
import {
  EmployeeModelCard,
  SideDrawer,
} from "@/components/ChangePassword/ChnagePassword";
import { useDebounce } from "@/helper/debounceHelper";
import { Zoom, toast } from "react-toastify";
import Shimmer from "@/components/Shimmer/Shimmer";
import Popup from "@/components/Popup/Popup";

const Employee = ({ page }) => {
  const [search, setSearch] = useState();
  const searchDebounce = useDebounce(search, 500);
  const [employes, setEmployes] = useState([]);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [editData, setEditData] = useState();
  const [loading, setLoading] = useState(true);
  const [delId, setDelId] = useState({});
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const employeData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllEmployees(searchDebounce);
      if (response.count === 0)
        toast.warn("No User found", {
          icon: <FaceFrownIcon className="h-6 w-6 text-warning" />,
          position: "top-center",
          theme: "dark",
          transition: Zoom,
          autoClose: 3000,
        });
      if (response.status) {
        setEmployes(JSON.parse(response.data));
      }
    } catch (e) {
      console.log("Http-Error: Can't access the server");
      return false;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [searchDebounce, showAddEmployee]);
  useEffect(() => {
    employeData();
  }, [employeData]);

  const handleEdit = (data) => {
    setShowAddEmployee(true);
    setEditData(data);
  };

  const onRequestClose = () => {
    setEditData("");
    setShowAddEmployee(false);
  };

  const handleModelUpdate = async () => {
    if (delId.type === "Delete") {
      try {
        const response = await employeDelete(delId.id); // Call the onDelete function provided by the parent component
        if (!response.status) return toast.error(response.message);
        setDelId();
        setIsOpenDelete(false);
        employeData();
        toast.success(response.message);
      } catch (err) {
        console.log("office employe status chnage error", err.message);
      }
    } else {
      try {
        const response = await employeUpdateStatus(delId.id); // Call the onDelete function provided by the parent component
        if (!response.status) return toast.error(response.message);
        setDelId({});
        setIsOpenDelete(false);
        employeData();
        toast.success(response.message);
      } catch (err) {
        console.log("office employe status chnage error", err.message);
      }
    }
  };

  const onClose = () => {
    setDelId({});
    setIsOpenDelete(false);
  };
  const handleModel = async (id, type) => {
    setDelId({ id: id, type: type });
    setIsOpenDelete(true);
  };
  const openDrawer = (data) => {
    setEditData(data);
    setDrawer(true);
  };
  const closeDrawer = () => {
    setEditData("");
    setDrawer(false);
  };

  // const handleSearchChange = async (_event) => {
  //   _event.preventDefault();
  //   setSearch(_event.target.value);
  //   let result = await searchData(
  //     search ? employes.filter((item) => item.name.includes(search)) : employes
  //   );
  //   setEmployes(result);
  // };

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
                link="/Admin/AddEmployee"
                svg={<PlusCircleIcon className="-ml-1 mr-2 h-6 w-6" />}
                cls={
                  "w-1/2 sm:w-auto text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
                }
                btnName={`Add ${page.split("/")[2]}`}
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
                  {CONSTANTEMPLOYETABLE.map((th) => (
                    <TableTH key={th.id} title={th.title} />
                  ))}
                </TableHead>
                {loading ? (
                  <Shimmer length={9} />
                ) : (
                  <TableBody>
                    {employes.map((td) => (
                      <tr key={td._id}>
                        <TableData
                          onclick={() => openDrawer(td)}
                          title={td.firstName}
                          subTitle={td.lastName}
                        />
                        <TableData title={td.phone} />
                        <TableData title={td.employeType} />
                        <TableData title={td.paymentType} />
                        <TableData title={td.payRate} />
                        <TableData title={td.eAddress.country} />
                        <TableDataStatus
                          isActive={td?.isActive}
                          // handleClick={() => handleActiveStatus(item?._id)}
                          handleClick={() => handleModel(td._id, "Status")}
                        />
                        <TableData title={changeDateToString(td.startDate)} />
                        <td className="p-4 whitespace-nowrap space-x-2">
                          <TableAction
                            svg={<PencilSquareIcon className="w-5 h-5 mr-1" />}
                            btnName={`Edit`}
                            cls="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
                            handleClick={() => handleEdit(td)}
                          />

                          <TableAction
                            svg={<TrashIcon className="h-5 w-5 mr-1" />}
                            btnName={`Delete`}
                            cls="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                            handleClick={() => handleModel(td._id, "Delete")}
                          />
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
      {showAddEmployee && (
        <EditEmployeModel
          isOpen={showAddEmployee}
          onRequestClose={onRequestClose}
          data={editData}
        />
      )}
      {drawer && (
        <SideDrawer
          isOpen={drawer}
          onRequestClose={closeDrawer}
          data={editData}
        />
      )}
    </div>
  );
};

export default Employee;

const EditEmployeModel = ({ data, isOpen, onRequestClose }) => {
  return (
    <EmployeeModelCard
      cls={"max-w-4xl"}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="px-2 sm:px-4 sm:pt-2 flex items-center gap-3">
        <img className="h-10 w-10" src="/images/Logo.svg" />
        <span className="text-gray-800 font-semibold sm:text-lg text-sm">
          Creative Design & Construction.
        </span>
      </div>
      <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6">
        Edit Employe
      </div>
      <EmployeeForm data={data ? data : null} onRequestClose={onRequestClose} />
    </EmployeeModelCard>
  );
};
