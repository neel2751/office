import React, { useId, useState } from "react";
import Datepicker from "react-datepicker";
import { useController } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
// # Plain Text  Input Component (with unique ID)
export const TextFormInput = React.forwardRef(function TextFormInput(
  {
    labelText,
    cls,
    type,
    placeholder,
    value,
    disabled,
    errorMsg,
    inputMode,
    helperText,
    ...prop
  },
  ref
) {
  return (
    // <div className="relative">

    <div>
      {labelText && <Label labelText={labelText} htmlFor={useId()} />}
      <div className="flex flex-col">
        <input
          {...prop}
          // id={formid}
          id={labelText}
          ref={ref}
          type={type}
          className={`py-3 px-4 block w-full border text-[#292524] border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 focus:border disabled:opacity-50 disabled:pointer-events-none
        ${cls}`}
          placeholder={placeholder}
          value={value && value}
          autoComplete="off"
          inputMode={inputMode}
          disabled={disabled}
        />
        <p className="mt-1.5 text-[12px] text-stone-500">{helperText}</p>
        {errorMsg && (
          <p className="text-red-600 text-sm mt-1 ml-2" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
});

// # Select  Form Input Component without Search
export const Select = React.forwardRef(function Select(
  { label, cls, options, errorMsg, placeholder, currentValue, ...props },
  ref
) {
  console.log(currentValue, "this is from select value");
  const id = useId();
  return (
    <React.Fragment>
      {label && (
        <label
          htmlFor={id}
          className="inline-block text-sm font-medium text-gray-800 mb-2"
        >
          {label}
        </label>
      )}
      <div className="flex flex-col">
        <select
          aria-invalid={false} /* Change to true if invalid */
          {...props}
          ref={ref}
          id={id}
          defaultValue={currentValue}
          className={`py-3 px-4 w-full border border-gray-200 hover:cursor-pointer text-black rounded-lg text-sm placeholder:text-transparent focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none ${cls}`}
        >
          {!currentValue && (
            <option value="" hidden>
              {placeholder || "Please Select Type"}
            </option>
          )}
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errorMsg && (
          <p className="text-red-600 text-sm mt-1 ml-2" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    </React.Fragment>
  );
});

// # Radio button components This is the black box generated...
export const Radio = React.forwardRef(function Radio(
  { onchange, ...rest },
  ref
) {
  const groupValue = useRadioGroup();
  const checked = rest.value === groupValue;

  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={rest.name}
        {...rest}
        ref={ref}
        onChange={(event) => {
          onchange && onchange(event);
          // Pass the radio value through to our context so it can be read by parent components
          useRadioGroup.setValue(event.target.value, event);
        }}
        defaultChecked={checked}
      />
      <Label htmlFor={rest.name}>{rest.children}</Label>
    </div>
  );
});

// # We using the every where of this radio components
export const RadioSection = React.forwardRef(function RadioSection(
  { name, value, checked, onChange, type },
  ref
) {
  return (
    <label
      ref={ref}
      htmlFor={value}
      className="flex py-3 px-4 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none"
      onChange={onChange}
    >
      <input
        type={type}
        name={name}
        className="shrink-0 mt-0.5 border border-gray-200 rounded-full text-cyan-600 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none"
        id={value}
        value={value}
        defaultChecked={checked}
      />
      <span className="text-sm text-gray-500 ms-3">{value}</span>
    </label>
  );
});

// # In input with no lable provide that we can access it from here...
export const Label = ({ labelText }) => {
  return (
    <label
      htmlFor={labelText}
      className="block mb-2 text-[14px] text-stone-800 font-medium"
    >
      {labelText}
    </label>
  );
};

// # Create TextArea  Component for our form...
export const Textarea = React.forwardRef(function TextArea(
  { rows = 6, labelText, helperText, errorMsg, ...props },
  ref
) {
  return (
    <>
      <Label htmlFor={props.id || props.name} labelText={labelText} />
      <div className="flex flex-col">
        <textarea
          id={labelText}
          ref={ref}
          {...props}
          className="py-3 px-4 block w-full border text-black border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none"
          rows={rows}
          placeholder="Say hi, we'll be happy to chat with you."
          aria-describedby="hs-textarea-helper-text"
        />
        <p className="text-xs text-gray-500 mt-2" id="hs-textarea-helper-text">
          {helperText}
        </p>
        {errorMsg && (
          <p className="text-red-600 text-sm mt-1 ml-2" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    </>
  );
});

// # Create Custom Date Desing ed Input Fields.. with using  `Input` component from Chakra UI library..
const CustomDateDesign = React.forwardRef(function CustomDateDesign(
  { cls, labelText, value, placeholder, onchange },
  ref
) {
  return (
    <>
      {labelText && (
        <div className="block mb-2 text-[14px] text-stone-800 font-medium">
          {labelText}
        </div>
      )}
      <div ref={ref} className="relative">
        <input
          id={labelText || "any"}
          name={labelText || "any"}
          readOnly
          value={value}
          placeholder={placeholder}
          onClick={onchange}
          className={`${cls} relative py-3 px-4 pe-9 flex text-black text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-cyan-500 focus:ring-cyan-500 before:absolute before:inset-0 before:z-[1]`}
        />
        <div className="absolute top-1/2 end-3 text-black -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
        </div>
      </div>
    </>
  );
});

export const DatePicker = React.forwardRef(function DatePicker(
  { name, control, labelText, cls, rules, placeholder, errorMsg, ...rest },
  ref
) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid },
  } = useController({
    control: control,
    name,
    rules: rules,
  });
  const CustomDateInput = React.forwardRef(function CustomDateInput(
    { value, onClick, cls, labelText },
    ref
  ) {
    return (
      <CustomDateDesign
        cls={cls}
        value={value}
        onchange={onClick}
        labelText={labelText}
        placeholder={placeholder}
        ref={ref}
      />
    );
  });

  const handleDateChange = (date) => {
    // Update the field value using the onChange method
    onChange(date);
  };
  return (
    <div className="flex flex-col">
      <Datepicker
        // filterDate={true}
        // ref={(elm) => {
        //   inputRef(elm); // Set inputRef directly
        //   if (ref) {
        //     if (typeof ref === "function") {
        //       ref(elm);
        //     } else {
        //       ref.current = elm;
        //     }
        //   }
        // }}
        ref={ref}
        selected={value}
        onChange={handleDateChange}
        // placeholderText="Select a date"
        placeholderText={placeholder}
        // popperPlacement="bottom-end"
        // showTimeSelect
        // timeIntervals={15}
        // timeCaptions={{
        //   past: "Now",
        //   present: "Today",
        //   future: "Tomorrow",
        // }}
        onBlur={onBlur}
        dateFormat={"dd/MM/yyyy"}
        // dateFormat="Pp"
        todayButton="Today"
        // withPortal
        // ref={ref}
        customInput={
          <CustomDateInput
            cls={cls}
            value={value}
            placeholder={placeholder}
            labelText={labelText}
          />
        }
        {...rest}
      />
      {errorMsg && <p className="text-red-600 text-sm ml-2 mt-2">{errorMsg}</p>}
    </div>
  );
});

export const DatePickerTest = React.forwardRef(function DatePicker(
  {
    name,
    control,
    labelText,
    cls,
    rules,
    errors,
    placeholder,
    errorMsg,
    ...rest
  },
  ref
) {
  const {
    field: { value, onChange },
    fieldState: { invalid },
  } = useController({
    control: control,
    name,
    rules: rules,
  });
  const CustomDateInput = React.forwardRef(function CustomDateInput(
    { value, onClick, cls, labelText },
    ref
  ) {
    return (
      <CustomDateDesign
        cls={cls}
        value={value}
        onchange={onClick}
        labelText={labelText}
        placeholder={placeholder}
        ref={ref}
      />
    );
  });

  // Set the ref for focusing on the field
  React.useEffect(() => {
    const field = control._fields[name];
    if (field && ref) {
      field._f.ref = {
        focus: () => {
          if (Array.isArray(errors[name]) && errors[name].length > 1) {
            ref.current.focus();
          }
        },
      };
    }
  }, [name, control, errors, ref]);
  return (
    <div className="flex flex-col">
      <Datepicker
        ref={ref}
        selected={value}
        onChange={(date) => onChange(date)} // Ensure onChange handler is passed
        placeholderText={placeholder}
        dateFormat={"dd/MM/yyyy"}
        todayButton="Today"
        // isClearable
        shouldCloseOnSelect
        customInput={
          <CustomDateInput
            cls={cls}
            value={value}
            placeholder={placeholder}
            labelText={labelText}
          />
        }
      />
      {errorMsg && <p className="text-red-600 text-sm ml-2 mt-2">{errorMsg}</p>}
    </div>
  );
});
