"use client";
import React, { useEffect } from "react";
import {
  DatePicker,
  DatePickerTest,
  Select,
  TextFormInput,
  Textarea,
} from "../fromInput/FormInput";
import UseFormFields from "./useFormField";
import SearchableSelect from "../SearchSelect/Select";
import { Controller, get } from "react-hook-form";

//  This component is responsible for rendering a all form field  and managing its state using useFormFields hook.
const NewFormModel = ({
  id,
  title,
  isOpen,
  btnName,
  editBtnName,
  onSubmit,
  fields,
  initialValues,
  resetFlag,
  setResetFlag,
  onHandleCloseModal,
}) => {
  return (
    <>
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
            <div className="flex items-center justify-between py-2 px-4 border-b rounded-t">
              <h3 className=" text-base text-black font-semibold">
                {id ? `Edit ${title.split(" ")[2]}` : `${title}`}
              </h3>
              <button
                onClick={onHandleCloseModal}
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
              <ReactHookForm
                id={id}
                fields={fields}
                initialValues={initialValues}
                onSubmit={onSubmit}
                btnName={btnName}
                editBtnName={editBtnName}
                resetFlag={resetFlag}
                setResetFlag={setResetFlag}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewFormModel;

export const ReactHookForm = ({
  id,
  fields,
  initialValues,
  onSubmit,
  btnName,
  editBtnName,
  resetFlag,
  setResetFlag,
}) => {
  const { handleSubmit, fieldProps, errors, reset, setValue, control } =
    UseFormFields(fields, initialValues);

  useEffect(() => {
    if (resetFlag) {
      reset();
    }
    setResetFlag(false);
  }, [resetFlag]);

  const getSelectLabel = (fieldName) => {
    if (initialValues) {
      if (fieldName === "projectSiteID" && initialValues.projectSiteID) {
        return initialValues.projectSiteID.siteName;
      } else if (fieldName === "roleType" && initialValues.roleType) {
        return initialValues.roleType.roleTitle;
      } else if (fieldName === "roleId" && initialValues.roleId) {
        return initialValues.roleId.name;
      }
    }
    return ""; // Default value if no match
  };
  const getSelectValue = (fieldName) => {
    if (initialValues) {
      if (fieldName === "projectSiteID" && initialValues.projectSiteID) {
        return initialValues.projectSiteID._id;
      } else if (fieldName === "roleType" && initialValues.roleType) {
        return initialValues.roleType._id;
      } else if (fieldName === "roleId" && initialValues.roleId) {
        return initialValues.roleId._id;
      }
    }
    return ""; // Default value if no match
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="grid grid-cols-6 gap-6">
        {fields.map((ifield, index) => (
          <div
            key={index}
            className={`col-span-6 ${
              ifield.size ? "sm:col-span-6" : "sm:col-span-3"
            }`}
          >
            {ifield.type === "date" && (
              <Controller
                control={control}
                name={ifield.name}
                render={({ field }) => (
                  <DatePickerTest
                    cls={`${errors[ifield.name] ? "border-red-500" : ""}`}
                    name={ifield.name}
                    errors={errors}
                    control={control}
                    labelText={ifield.labelText}
                    placeholder={ifield.placeholder}
                    errorMsg={errors[ifield.name]?.message}
                    {...field}
                  />
                )}
              />
            )}
            {ifield.type === "select" && (
              // Render select input
              <Select
                cls={`${errors[ifield.name] ? "border-red-500" : ""}`}
                {...fieldProps[ifield.name]}
                options={ifield.options}
                label={ifield.labelText}
                errorMsg={errors[ifield.name] && errors[ifield.name].message}
              />
            )}
            {ifield.isSearch && (
              <SearchableSelect
                {...fieldProps[ifield.name]}
                cls={`${errors[ifield.name] ? "border-red-500" : ""}`}
                options={ifield.options}
                errorMsg={errors[ifield.name] && errors[ifield.name].message}
                labelText={ifield.labelText}
                selectLable={getSelectLabel(ifield.name)}
                setValue={getSelectValue(ifield.name)}
                onSelect={(op) =>
                  setValue(ifield.name, op.code, {
                    shouldValidate: true,
                  })
                }
              />
            )}
            {(ifield.type === "text" ||
              ifield.type === "number" ||
              ifield.type === "email" ||
              ifield.type === "password") && (
              <TextFormInput
                {...fieldProps[ifield.name]}
                cls={`${errors[ifield.name] ? "border-red-500" : ""}`}
                type={ifield.type}
                inputMode={ifield.inputMode || "text"}
                labelText={ifield.labelText}
                placeholder={ifield.placeholder}
                errorMsg={errors[ifield.name] && errors[ifield.name].message}
                helperText={ifield.helperText}
              />
            )}
            {ifield.type === "textarea" && (
              <Textarea
                {...fieldProps[ifield.name]}
                cls={`${errors[ifield.name] ? "border-red-500" : ""}`}
                rows={3}
                helperText={ifield.helperText}
                labelText={ifield.labelText}
                placeholder={ifield.placeholder}
                errorMsg={errors[ifield.name] && errors[ifield.name].message}
              />
            )}
          </div>
        ))}
      </div>
      {/* Modal footer */}
      <div className="items-center py-5 border-gray-200 rounded-b">
        <button
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          {id ? editBtnName : btnName}
        </button>
      </div>
    </form>
  );
};
