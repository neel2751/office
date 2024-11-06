"use client";
import React, { memo, useCallback, useEffect } from "react";
import { decryptId } from "@/actions/commonAction/commonAction";
import { notFound, useSearchParams } from "next/navigation";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import NavBar from "@/components/navBar/navBar";
import SideBar from "@/components/navBar/sideBar";
import FileSideBar from "../FileSideBar";

import {
  getWorkspaceDataWithUserCheck,
  getWorkspaceDataWithUserData,
} from "@/actions/CentralFileShare/centralFileShare";
import { toast } from "react-toastify";
import FileUploadShow from "../fileUploadShow";
import { UploadFileProvider } from "../Context/uploadFileContext";

const page = memo(({ params }) => {
  const { id } = params; // get the id from the route
  const search = useSearchParams();
  const iv = search.get("iv");
  const authTag = search.get("authTag");
  const res = decryptId(id, iv, authTag); // decrypt the id
  if (!res) {
    return notFound();
  }
  async function teamData() {
    try {
    } catch (error) {}
  }
  async function workspaceData() {
    try {
      const response = await getWorkspaceDataWithUserData(id, iv, authTag);
    } catch (error) {}
  }
  const checkData = useCallback(async () => {
    try {
      // check if the workspace exists
      const response = await getWorkspaceDataWithUserCheck(id, iv, authTag);
      if (!response.status) return notFound();
      if (response?.data?.teamData) {
        toast.success("Team  Data Found");
        teamData();
      } else {
        toast.success(" Workspace Data Found");
        workspaceData();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching workspace data");
    }
  });

  useEffect(() => {
    checkData();
  }, []);

  return (
    <AuthProvider>
      <NavBar />
      <div className="flex overflow-hidden bg-white pt-10">
        <SideBar />
        <div className="h-full w-full mt-5 relative overflow-y-auto lg:ml-64">
          <FileSideBar />
          <main className="lg:ps-[16rem] p-8">
            <UploadFileProvider>
              <FileUploadShow />
            </UploadFileProvider>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
});

export default page;
