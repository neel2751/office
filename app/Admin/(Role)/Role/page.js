import React from "react";
import Main from "@/app/(Main)/Main";
import AddRole from "./AddRole";
import RoleTable from "./RoleTable";

const page = () => {
  return (
    <Main>
      <RoleTable />
      {/* <AddRole /> */}
    </Main>
  );
};

export default page;
