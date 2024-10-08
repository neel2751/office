"use client";
import { MENU, getMenu } from "@/data/data";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NavFoot from "./navFoot";

const SideBar = ({ isSideBarOpen }) => {
  const pathName = usePathname();
  // if our path is dynamic , we need to get the menu item that matches the path
  const path = pathName.split("/", 3).join("/");
  const { name } = getMenu(path);
  const { data } = useSession();
  const role = data?.user?.role;
  const userMenu = MENU.filter((item) => item.role === role);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside
        id="sidebar"
        className={`fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 ${
          isSideBarOpen ? "flex bg-gray-200/10" : "hidden"
        }`}
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <form action="#" method="GET" className="lg:hidden">
                    <label htmlFor="mobile-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="search"
                        autoComplete="off"
                        id="mobile-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 block w-full pl-10 p-2.5"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>
                {userMenu.map((menu) => (
                  <MenuLink
                    key={menu.name}
                    menu={menu}
                    isActive={menu.name === name}
                  />
                ))}
              </ul>
              {/* <div className="space-y-2 pt-2">
                <button
                  onClick={() => signOut()}
                  className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                >
                  <svg
                    className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-3">SignOut</span>
                </button>
              </div> */}
            </div>
            <NavFoot isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
          </div>
        </div>
      </aside>

      <div
        className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
        id="sidebarBackdrop"
      ></div>
    </>
  );
};

export default SideBar;

export const MenuLink = ({ menu, isActive }) => {
  return (
    <li>
      <Link
        href={menu.path}
        className={`${
          isActive
            ? "bg-cyan-600 text-white hover:bg-cyan-500"
            : "hover:bg-gray-100"
        } text-sm text-gray-800 font-normal rounded-lg flex items-center p-2 group`}
      >
        <span>{menu.icon}</span>
        <span className="ml-3">{menu.name}</span>
      </Link>
    </li>
  );
};
