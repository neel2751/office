"use client";
import React from "react";
import { RoleTypeContext } from "./roleTypeContext";

const RoleTypeProvider = ({ children }) => {
  const [role, setRole] = React.useState(null);

  return (
    <RoleTypeContext.Provider value={{ role, setRole }}>
      {children}
    </RoleTypeContext.Provider>
  );
};
export default RoleTypeProvider;
