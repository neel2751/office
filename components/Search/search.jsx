"use client";
import { SearchIcon } from "lucide-react";
import React, { useId, forwardRef, memo } from "react";

const Search = memo(
  forwardRef(function Search(
    { placeholder, className, onChange, ...prop },
    ref
  ) {
    const searchId = useId();
    return (
      <div className="lg:pr-3">
        <label htmlFor={searchId} className="sr-only">
          Search
        </label>
        <div className={`${className} mt-1 relative`}>
          <input
            ref={ref}
            {...prop}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            name="search"
            id={searchId}
            className="bg-gray-50 border border-gray-200 ps-9 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:ring-2 block w-full py-2 px-3 outline-none"
            placeholder={placeholder ?? "Search"}
          />
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
            <SearchIcon className="size-4 text-gray-400" />
          </div>
        </div>
      </div>
    );
  })
);

export default Search;
