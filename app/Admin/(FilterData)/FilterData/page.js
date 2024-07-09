import React from "react";
import Main from "@/app/(Main)/Main";
import FilterData from "./FilterData";

const page = () => {
  return (
    <Main>
      <div className="h-full w-full mt-16 bg-gray-50 relative overflow-y-auto lg:ml-64">
        <FilterData />
      </div>
    </Main>
  );
};

export default page;
