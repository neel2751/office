"use client";
import React, { useId, forwardRef } from "react";

const Search = forwardRef(function Search(
  { placeholder, onChange, ...prop },
  ref
) {
  const searchId = useId();
  return (
    <div className="lg:pr-3">
      <label htmlFor={searchId} className="sr-only">
        Search
      </label>
      <div className="mt-1 relative lg:w-64 xl:w-96">
        <input
          ref={ref}
          {...prop}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          name="search"
          id={searchId}
          className="bg-gray-50 border border-gray-200 ps-9 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full py-2 px-3 "
          placeholder={placeholder}
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
    </div>
  );
});

export default Search;
