"use client";
import NavBar from "@/components/navBar/navBar";
import SideBar from "@/components/navBar/sideBar";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
// import TestBar from "@/components/navBar/testBar";

const page = ({ children }) => {
  const router = usePathname();
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { page: router });
    }
    return child; // or handle non-React elements as needed
  });

  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSideBarOpen);

  return (
    <AuthProvider>
      <div className="flex bg-white">
        <NavBar toggleSidebar={toggleSidebar} />
        <SideBar isSideBarOpen={isSideBarOpen} />
        {childrenWithProps}
      </div>
    </AuthProvider>
  );
};

export default page;
