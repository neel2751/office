"use client";
import React from "react";
import NavBar from "@/components/navBar/navBar";
import SideBar from "@/components/navBar/sideBar";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import SiteAssign from "./SiteAssign";

const page = () => {
  return (
    <AuthProvider>
      <NavBar />
      <div className="flex overflow-hidden bg-white pt-10">
        <SideBar />
        <div className="h-full w-full mt-5 relative overflow-y-auto lg:ml-64">
          <SiteAssign />
        </div>
      </div>
    </AuthProvider>
  );
};

export default page;
