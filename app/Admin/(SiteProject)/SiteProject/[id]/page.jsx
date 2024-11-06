"use client";
import React from "react";
import NavBar from "@/components/navBar/navBar";
import SideBar from "@/components/navBar/sideBar";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import SiteDetail from "./SiteDetail";
import Task from "../Task/Task";

const page = ({ params }) => {
  return (
    <AuthProvider>
      <NavBar />
      <div className="flex overflow-hidden bg-white pt-10">
        <SideBar />
        <div className="h-full w-full mt-5 bg-gray-50 relative overflow-y-auto lg:ml-64">
          {/* <SiteDetail id={params?.id} /> */}
          <Task />
        </div>
      </div>
    </AuthProvider>
  );
};

export default page;
