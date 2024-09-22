"use client";
import React from "react";
import Main from "@/app/(Main)/Main";
import { DateRangeInput } from "@/app/Admin/(FilterData)/FilterData/FilterData";
import { decryptId } from "@/actions/commonAction/commonAction";
import { useSearchParams } from "next/navigation";

const page = ({ params }) => {
  const { id } = params; // get the id from the route
  const search = useSearchParams();
  const iv = search.get("iv");
  const res = decryptId(id, iv); // decrypt the id

  // we have to check this is valid json or not
  const isValidJson = (str) => {
    // helper function to check if a string is valid json
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const jsonData = isValidJson(res) ? res : null; // parse the decrypted id as json
  return (
    <Main>
      <div className="h-full w-full mt-16 bg-gray-50 relative overflow-y-auto lg:ml-64">
        {/* <DateRangeInput employeId={[res]} /> */}
        <p className="text-black"> Verify Token: {res}</p>
      </div>
    </Main>
  );
};

export default page;
