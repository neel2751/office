"use client";
import React from "react";
import NavBar from "@/components/navBar/navBar";
import SideBar from "@/components/navBar/sideBar";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import DocumentRepository from "./FileManagement";
import FileSideBar from "./FileSideBar";
import Document from "./Document";
import { UploadFileProvider } from "./Context/uploadFileContext";

const page = () => {
  return (
    <AuthProvider>
      <UploadFileProvider>
        <NavBar />
        <div className="flex overflow-hidden bg-white pt-10">
          <SideBar />
          <div className="h-full w-full mt-5 relative overflow-y-auto lg:ml-64">
            <FileSideBar />
            <main className="lg:ps-[16rem]">
              <Document />
            </main>
          </div>
        </div>
      </UploadFileProvider>
    </AuthProvider>
  );
};

export default page;
