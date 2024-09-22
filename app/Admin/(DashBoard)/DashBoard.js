"use client";
import { useEffect, useState } from "react";
import {
  CONSTANTOFFICEEMPLOYEE,
  OFFICEFIELD as fields,
} from "@/allFormField/field";
import { ReactHookForm } from "@/components/ModelForm/FormModel";
import { getAllRoleType } from "@/actions/roleTypeAction/roleTypeAction";
import {
  TableAction,
  TableBody,
  TableData,
  TableDataStatus,
  TableHead,
  TableHeading,
  TableTH,
} from "@/components/Table";
import Search from "@/components/Search/search";
import { changeDateToString } from "@/actions/commonAction/commonAction";
import {
  handleOfficeEmployee,
  officeEmployeDelete,
  officeEmployeUpdateStatus,
  searchOfficeEmployeByKeyword,
} from "@/actions/employeAction/employeAction";
import { useDebounce } from "@/helper/debounceHelper";
import ChnagePassword, {
  EmployeeModelCard,
  SideDrawer,
} from "@/components/ChangePassword/ChnagePassword";
import Popup from "@/components/Popup/Popup";
import { Zoom, toast } from "react-toastify";
import Shimmer from "@/components/Shimmer/Shimmer";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import InfoCard from "@/components/InfoCard/infoCard";
import EmptyState from "@/components/EmptyState/EmptyState";
import FilterTableLine from "@/components/FilterTable/FilterTableLine";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { ComboboxDemo } from "@/components/ComboBox";

const DashBoard = () => {
  return (
    <>
      {/* <FilterTableLine /> */}
      <InfoCard />
      <ComboboxDemo />
    </>
  );
  // return <ChnagePassword />;
  // return <FilterTable />;
  // return <EmptyState />;
  // return <AddOfficeRole />;
};

export default DashBoard;

const AddOfficeRole = () => {
  const [resetFlag, setResetFlag] = useState(false);
  const [search, setSearch] = useState();
  const [roles, setRoles] = useState([]);
  const [eData, setEData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [delId, setDelId] = useState({});
  const searchDebounce = useDebounce(search, 500); // This is Debounce Search
  const [initialValue, setInitialValue] = useState(null); // INITIAL VALUE FROM API
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  let i = 1;

  const roleType = async () => {
    try {
      const response = await getAllRoleType();

      //change key name like siteName to lable
      if (!response.success)
        return alert("You have to add first Site Project At least One");
      setRoles(
        JSON.parse(response?.data).map((item) => ({
          code: item._id,
          label: item.roleTitle,
        }))
      );
    } catch (error) {
      console.log("Error fetching options", error);
    }
  };
  const onCreate = async (data) => {
    try {
      const response = await handleOfficeEmployee(editId, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const updatedRoleField = fields.map((field) => {
    if (field.name === "roleType") {
      return {
        ...field,
        options: roles,
      };
    }
    return field;
  });
  // FETCH ALL DATA WITH USER SEARCH OR ALL DATA WITH  PAGINATION
  const fetchData = async () => {
    setLoading(true);
    try {
      const searchPro = await searchOfficeEmployeByKeyword(searchDebounce);
      if (searchPro.count === 0)
        toast.warn("No Employee found", {
          icon: <FaceFrownIcon className="h-6 w-6 text-warning" />,
          position: "top-center",
          theme: "dark",
          transition: Zoom,
          autoClose: 3000,
        });
      if (searchPro.success) {
        setEData(JSON.parse(searchPro.data));
      }
    } catch (error) {
      console.error("Error fetching or searching projects:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  // handle Open Model
  const handleOpenModel = async (data) => {
    setEditId(data._id);
    setInitialValue(data);
    setIsOpen(!isOpen);
  };
  const onHandleCloseModal = () => {
    setIsOpen(false);
    setInitialValue("");
    setEditId("");
  };

  const handleModelUpdate = async () => {
    if (delId.type === "Delete") {
      try {
        const response = await officeEmployeDelete(delId.id); // Call the onDelete function provided by the parent component
        if (!response.status) return toast.error(response.message);
        setDelId();
        setIsOpenDelete(false);
        fetchData();
        toast.success(response.message);
      } catch (err) {
        console.log("office employe status chnage error", err.message);
      }
    } else {
      try {
        const response = await officeEmployeUpdateStatus(delId.id); // Call the onDelete function provided by the parent component
        if (!response.status) return toast.error(response.message);
        setDelId({});
        setIsOpenDelete(false);
        fetchData();
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
    setInitialValue(data);
    setDrawer(true);
  };
  const closeDrawer = () => {
    setInitialValue("");
    setDrawer(false);
  };

  useEffect(() => {
    roleType();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, searchDebounce]);

  return (
    <>
      {/* Header */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <TableHeading title="Office Employee" slug="OfficeEmploye" />
          <div className="sm:flex">
            <div className="sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
              <Search
                onChange={setSearch}
                placeholder="Search Office Employee"
              />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
              <TableAction
                svg={
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
                }
                cls={
                  "w-1/2 sm:w-auto text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200"
                }
                btnName={"Add"}
                handleClick={() => setIsOpen(!isOpen)}
              />
              <TableAction
                svg={
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
                }
                btnName={"Export"}
                cls={
                  "w-1/2 sm:w-auto text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200"
                }
                handleClick={() => exportCSVFile(currentData)}
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
                  {CONSTANTOFFICEEMPLOYEE.map((th) => (
                    <TableTH key={th.id} title={th.title} />
                  ))}
                </TableHead>
                {/* if loading , show skeleton rows */}
                {loading ? (
                  <Shimmer length={9} />
                ) : (
                  // <ShimmerEffect />
                  <TableBody>
                    {eData &&
                      eData.map((item) => (
                        <tr key={item._id}>
                          <TableData title={i++} />
                          <TableData
                            onclick={() => openDrawer(item)}
                            title={item?.name}
                          />
                          <TableData
                            title={
                              item?.roleType?.roleTitle ||
                              item?.roleType[0]?.roleTitle
                            }
                          />
                          <TableData title={item?.department} />
                          <TableData title={item?.email} />
                          <TableData title={item?.phoneNumber} />
                          <TableData
                            title={changeDateToString(item.createdAt)}
                          />
                          <TableDataStatus
                            isActive={item?.isActive}
                            // handleClick={() => handleActiveStatus(item?._id)}
                            handleClick={() => handleModel(item._id, "Status")}
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
                              btnName="Edit"
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
                              btnName="Delete"
                              cls="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300"
                              handleClick={() =>
                                handleModel(item._id, "Delete")
                              }
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
      {isOpen && (
        <OfficeEmployeModel
          initialValue={initialValue}
          onSubmit={onCreate}
          updatedRoleField={updatedRoleField}
          setResetFlag={setResetFlag}
          resetFlag={resetFlag}
          isOpen={isOpen}
          onHandleCloseModal={onHandleCloseModal}
          btnName={editId ? "Edit Employe" : "Add Employe"}
        />
      )}
      {drawer && (
        <SideDrawer
          isOpen={drawer}
          onRequestClose={closeDrawer}
          data={initialValue}
        />
      )}
    </>
  );
};

const OfficeEmployeModel = ({
  updatedRoleField,
  setResetFlag,
  onSubmit,
  resetFlag,
  initialValue,
  btnName,
  isOpen,
  onHandleCloseModal,
}) => {
  return (
    <EmployeeModelCard
      cls={"sm:max-w-xl"}
      isOpen={isOpen}
      onRequestClose={onHandleCloseModal}
    >
      {/* <main className="w-full max-w-2xl mx-auto p-6"> */}
      {/* <div className="bg-white border border-gray-200 rounded-xl shadow-sm"> */}
      <div className="p-4 sm:p-7">
        <div>
          <div className="relative">
            <div className="flex  items-center gap-3">
              <img className="h-10 w-10" src="/images/Logo.svg" />
              <span className="text-gray-800 font-semibold text-lg">
                Creative Design & Construction.
              </span>
            </div>
          </div>
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6">
            {btnName.split(" ")[0]} Office Employe
          </div>
          <div className="grid gap-y-4 text-gray-600">
            <ReactHookForm
              initialValues={initialValue}
              fields={updatedRoleField}
              setResetFlag={setResetFlag}
              onSubmit={onSubmit}
              resetFlag={resetFlag}
              btnName={btnName}
            />
          </div>
          {/* {error && (
                  <div className="text-red-800 bg-red-100 text-sm font-medium p-2 rounded">
                  {error && error}
                  </div>
                )} */}
          {/* </div> */}
        </div>
      </div>
      {/* </main> */}
    </EmployeeModelCard>
  );
};

// function SkeletonCard({ length }) {
//   return (
//     <tbody>
//       {Array.from({ length: length }, (_, i) => i + 1).map((id) => (
//         <tr key={id} className=" animate-pulse">
//           {Array.from({ length: length }, (_, j) => j + 1).map((id) => (
//             <td key={id} className=" border-b border-gray-200 p-4">
//               <div className="bg-gray-200 rounded-lg h-10"></div>
//             </td>
//           ))}
//         </tr>
//       ))}
//     </tbody>
//   );
// }

// const SkeletonRow = ({ length }) => {
//   const rows = [];
//   for (let i = 0; i < length; i++) {
//     rows.push(
//       <tr key={`skeleton_${i}`}>
//         <td className="w-1/5 h-10 flex justify-start items-center border-b dark:border-gray-700 py-4">
//           {/* <Skeleton height={10} width={40} /> */}
//           <div class="animate-pulse flex space-x-4"></div>
//         </td>
//       </tr>
//     );
//   }
//   return <>{rows}</>;
// };
