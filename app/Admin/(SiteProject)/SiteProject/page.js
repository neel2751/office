"use client";
import React from "react";
import SiteProject from "./siteProject";
import NavBar from "@/components/navBar/navBar";
import SideBar from "@/components/navBar/sideBar";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const page = () => {
  return (
    <AuthProvider>
      <NavBar />
      <div className="flex overflow-hidden bg-white pt-10">
        <SideBar />
        <div className="h-full w-full mt-5 bg-gray-50 relative overflow-y-auto lg:ml-64">
          <SiteProject />
        </div>
      </div>
    </AuthProvider>
  );
};

export default page;
