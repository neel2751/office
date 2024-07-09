// components/SearchableSelect.js
import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Label } from "../fromInput/FormInput";

const SearchableSelect = forwardRef(function SearchableSelect(
  { selectLable, options, onSelect, cls, errorMsg, labelText },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);
  const selectRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
    setFilteredOptions(options);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(term)
    );

    setFilteredOptions(filtered);
  };

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelect(selectedOption);
    handleToggle();
  };

  const handleClickOutside = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsOpen(false);
      setSearchTerm("");
      setFilteredOptions(options);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className=" text-gray-800 relative">
      {labelText && (
        <div className="block mb-2 text-[14px] text-stone-800 font-medium">
          {labelText}
        </div>
      )}
      <div className="flex flex-col">
        <div className="relative">
          <div
            id={labelText}
            type="button"
            ref={ref}
            onClick={handleToggle}
            className={`${cls} relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-cyan-500 focus:ring-cyan-500 before:absolute before:inset-0 before:z-[1]`}
          >
            {selectedOption
              ? selectedOption.label
              : selectLable
              ? `${selectLable}`
              : "Type to search..."}
          </div>
          <div className="absolute top-1/2 end-3 -translate-y-1/2">
            <svg
              className="flex-shrink-0 size-3.5 text-gray-500 dark:text-gray-500"
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
              <path d="m7 15 5 5 5-5"></path>
              <path d="m7 9 5-5 5 5"></path>
            </svg>
          </div>
        </div>
        {isOpen && (
          <div className="absolute mt-2 max-h-72 pb-1 px-1 space-y-0.5 z-20 w-full bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto top-full">
            <div className=" p-2 -mx-1 sticky top-0 mt-1 w-full bg-white rounded">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                className="block w-full text-sm border sticky border-gray-200 rounded-lg focus:border-cyan-500 focus:ring-cyan-500 before:absolute before:inset-0 before:z-[1] py-2 px-3"
              />
            </div>
            {filteredOptions.map((option) => (
              <div
                key={option.code}
                onClick={() => handleSelect(option)}
                data-value={option.code}
                data-title-value={option.label}
                tabIndex="0"
                className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
        {errorMsg && (
          <p className="text-red-600 text-sm mt-2 ml-2" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    </div>
  );
});

export default SearchableSelect;
