"use client";
import React, { memo, useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { changeDateToString } from "@/actions/commonAction/commonAction";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import {
  employeVisaExpire,
  getEmpSummaryData,
} from "@/actions/dashboardAction/dashboardAction";

const ChnagePassword = () => {
  return (
    <div className="md:mt-3 p-5">
      {/* <SideDrawer /> */}
      <EmployeProfile />
      <UserTable />
      {/* <AccountDropdown /> */}
      {/* <ProfileNav /> */}
      {/* <OpenModelButton /> */}
      {/* <Members /> */}
      {/* <SwitchAccount /> */}
      {/* <BillingPage /> */}
      {/* <PasswordForm /> */}
      {/* <TwoStep /> */}
      {/* <SessionCard /> */}
      {/* <DangerZone /> */}
    </div>
  );
};

export default ChnagePassword;

const PasswordForm = () => {
  return (
    <div className="py-8 border-gray-200 border-t">
      <div className=" inline-flex gap-x-2 items-center">
        <h2 className="font-semibold text-gray-800">Password</h2>
      </div>
      {/* <!-- Grid --> */}
      <div className="sm:gap-y-0 sm:gap-x-5 sm:grid-cols-12 grid mb-4">
        <div className="2xl:col-span-2 xl:col-span-3">
          <label
            htmlFor="current password"
            className="sm:mt-3 text-gray-500 text-sm inline-block"
          >
            Current password
          </label>
        </div>
        {/* <!-- End Col --> */}
        <div className="grid sm:col-span-8 xl:col-span-4">
          {/* <!-- Input --> */}
          <div className="relative">
            <input
              id="current password"
              type="password"
              className="block w-full text-sm py-2 text-neutral-800 px-3 border border-gray-200 rounded-lg focus:border-cyan-800 focus:ring-cyan-800"
              placeholder="Enter current password"
            />
            <button
              type="button"
              className="absolute flex items-center cursor-pointer text-gray-400 px-3 rounded-s-md z-20 end-0 inset-y-0 focus:outline-none focus:text-cyan-800 "
            >
              <svg
                className=" flex-shrink-0 w-4 h-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="ngv49"
                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                ></path>
                <path
                  className="ngv49"
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                ></path>
                <path
                  className="ngv49"
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                ></path>
                <line className="ngv49" x1="2" x2="22" y1="2" y2="22"></line>
                <path
                  className="hidden t4nz9"
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                ></path>
                <circle className="hidden t4nz9" cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          {/* <!-- End Input --> */}
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}

      {/* <!-- Grid --> */}
      <div className="sm:gap-y-0  sm:gap-x-5 sm:grid-cols-12 grid">
        <div className="2xl:col-span-2 xl:col-span-3">
          <label
            htmlFor="new password"
            className="sm:mt-3 text-gray-500 text-sm inline-block"
          >
            New password
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div className="grid sm:col-span-8 xl:col-span-4">
          {/* <!-- Input --> */}
          <div className="relative">
            <input
              id="new password"
              type="password"
              className="block w-full text-sm py-2 px-3 text-neutral-800 border border-gray-200 rounded-lg focus:border-cyan-800 focus:ring-cyan-800"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute flex items-center cursor-pointer text-gray-400 px-3 rounded-s-md z-20 end-0 inset-y-0 focus:outline-none focus:text-cyan-800 "
            >
              <svg
                className=" flex-shrink-0 w-4 h-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="ngv49"
                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                ></path>
                <path
                  className="ngv49"
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                ></path>
                <path
                  className="ngv49"
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                ></path>
                <line className="ngv49" x1="2" x2="22" y1="2" y2="22"></line>
                <path
                  className="hidden t4nz9"
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                ></path>
                <circle className="hidden t4nz9" cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          {/* <!-- End Input --> */}
          {/* <!-- Input --> */}
          <div className="relative mt-2">
            <input
              id="confirm password"
              type="password"
              className="block w-full text-sm py-2 px-3 border text-neutral-800 border-gray-200 rounded-lg focus:border-cyan-800 focus:ring-cyan-800"
              placeholder="Enter confirm password"
            />
            <button
              type="button"
              className="absolute flex items-center cursor-pointer text-gray-400 px-3 rounded-s-md z-20 end-0 inset-y-0 focus:outline-none focus:text-cyan-800 "
            >
              <svg
                className=" flex-shrink-0 w-4 h-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="ngv49"
                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                ></path>
                <path
                  className="ngv49"
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                ></path>
                <path
                  className="ngv49"
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                ></path>
                <line className="ngv49" x1="2" x2="22" y1="2" y2="22"></line>
                <path
                  className="hidden t4nz9"
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                ></path>
                <circle className="hidden t4nz9" cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          {/* <!-- End Input --> */}
          {/* Error  message */}
          <p className="hidden text-sm mt-2 ml-1 text-red-500">
            Please enter your current password.
          </p>
          {/* <!-- Button Group --> */}
          <div className="flex items-center space-x-9 mt-4 gap-x-3">
            <button
              type="button"
              className=" items-center text-white font-semibold text-sm py-2 px-3 bg-cyan-600 border-transparent border-1 rounded-lg inline-flex gap-x-2 focus:outline-none focus:ring-2 focus:ring-cyan-800"
            >
              <LockClosedIcon className="size-3" />
              Change Password
            </button>
          </div>
          {/* <!-- End Button Group --> */}
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  );
};

const TwoStep = () => {
  return (
    <div className="border-gray-200 py-8 border-t">
      {/* <!-- Grid --> */}
      <div className="grid sm:gap-x-5 sm:grid-cols-12">
        <div className="2xl:col-span-2 xl:col-span-3 sm:col-span-4">
          <label className=" text-sm sm:mt-3 text-gray-500">
            Two-Step Verification
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div className="xl:col-span-4 sm:col-span-8">
          {/* <!-- Alert --> */}
          <div className="text-cyan-600 p-4 rounded-lg bg-cyan-50" role="alert">
            <div className="flex">
              <svg
                className=" flex-shrink-0 size-5 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <div className=" ms-3">
                <h3 className=" text-sm text-cyan-600">
                  Advanced security features are available on Enterprise
                </h3>
                <button
                  type="button"
                  className="mt-4 text-white font-semibold text-sm px-3 py-2 bg-cyan-600 border-transparent rounded-lg border gap-x-2 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <svg
                    className=" flex-shrink-0 size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"></path>
                  </svg>
                  Upgrade
                </button>
              </div>
            </div>
          </div>
          {/* <!-- End Alert --> */}
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  );
};

const SessionCard = () => {
  return (
    <div className="py-8 border-gray-200 border-t">
      {/* <!-- Grid --> */}
      <div className="sm:gap-y-0 sm:gap-x-5 sm:grid-cols-12 grid mb-4">
        <div className="2xl:col-span-2 xl:col-span-3">
          <label
            htmlFor="hs-pro-dappcp"
            className="sm:mt-3 xl:mb-0 mb-3 space-y-4 text-gray-500 text-sm inline-block"
          >
            Session
          </label>
        </div>
        {/* <!-- End Col --> */}

        <div className="sm:col-span-8 2xl:col-span-10">
          {/* <!-- Grid --> */}
          <div className="xl:grid-cols-2 grid gap-5 2xl:grid-cols-3">
            {/* <!-- Card --> */}
            <div className="flex p-5 border-gray-200 border rounded-xl flex-col">
              {/* <!-- Header --> */}
              <div className="flex justify-between">
                <div className="flex items-center border border-gray-200 rounded-lg justify-center flex-col size-10">
                  <svg
                    className=" size-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                  </svg>
                </div>

                <button
                  type="button"
                  className=" inline-flex items-center shadow-sm text-gray-800 font-semibold text-sm px-3 py-2 bg-white border gap-x-2 rounded-lg focus:outline-none hover:bg-gray-200"
                >
                  <svg
                    className="flex-shrink-0 size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                  </svg>
                  Sign out
                </button>
              </div>
              {/* <!-- End Header --> */}

              {/* <!-- Heading --> */}
              <div className="flex space-y-4 justify-between items-center">
                <span className="font-semibold text-gray-800">Mac</span>
                <span className="inline-flex items-center font-semibold text-xs px-2 py-1 bg-cyan-100 rounded-full gap-2 text-cyan-800">
                  Current session
                </span>
              </div>
              {/* <!-- End Heading --> */}

              {/* <!-- List Group --> */}
              <ul className="mt-4">
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Location:
                  </span>
                  <span className="text-gray-800 text-sm">United Kingdom</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Device:
                  </span>
                  <span className="text-gray-800 text-sm">Safari - iOS</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    IP address:
                  </span>
                  <span className="text-gray-800 text-sm">129.562.028.172</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Recent activity:
                  </span>
                  <span className="text-gray-800 text-sm">5 minutes ago</span>
                </li>
              </ul>
              {/* <!-- End List Group --> */}

              <button
                type="button"
                className=" mt-4 w-full shadow-sm text-gray-800 font-medium text-sm py-2 px-3 border-gray-200 border rounded-lg cursor-pointer gap-x-2 justify-center inline-flex items-center focus:outline-none focus:bg-gray-50 hover:bg-gray-200"
              >
                <svg
                  className=" flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Don’t recognize something?
              </button>
            </div>
            {/* <!-- End Card --> */}
            {/* <!-- Card --> */}
            <div className="flex p-5 border-gray-200 border rounded-xl flex-col">
              {/* <!-- Header --> */}
              <div className="flex justify-between">
                <div className="flex items-center border border-gray-200 rounded-lg justify-center flex-col size-10">
                  <svg
                    className=" size-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                  </svg>
                </div>

                <button
                  type="button"
                  className=" inline-flex items-center shadow-sm text-gray-800 font-semibold text-sm px-3 py-2 bg-white border gap-x-2 rounded-lg focus:outline-none hover:bg-gray-200"
                >
                  <svg
                    className="flex-shrink-0 size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                  </svg>
                  Sign out
                </button>
              </div>
              {/* <!-- End Header --> */}

              {/* <!-- Heading --> */}
              <div className="flex space-y-4 justify-between items-center">
                <span className="font-semibold text-gray-800">Mac</span>
                <span className="inline-flex items-center font-semibold text-xs px-2 py-1 bg-cyan-100 rounded-full gap-2 text-cyan-800">
                  Current session
                </span>
              </div>
              {/* <!-- End Heading --> */}

              {/* <!-- List Group --> */}
              <ul className="mt-4">
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Location:
                  </span>
                  <span className="text-gray-800 text-sm">United Kingdom</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Device:
                  </span>
                  <span className="text-gray-800 text-sm">Safari - iOS</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    IP address:
                  </span>
                  <span className="text-gray-800 text-sm">129.562.028.172</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Recent activity:
                  </span>
                  <span className="text-gray-800 text-sm">5 minutes ago</span>
                </li>
              </ul>
              {/* <!-- End List Group --> */}

              <button
                type="button"
                className=" mt-4 w-full shadow-sm text-gray-800 font-medium text-sm py-2 px-3 border-gray-200 border rounded-lg cursor-pointer gap-x-2 justify-center inline-flex items-center focus:outline-none focus:bg-gray-50 hover:bg-gray-200"
              >
                <svg
                  className=" flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Don’t recognize something?
              </button>
            </div>
            {/* <!-- End Card --> */}
            {/* <!-- Card --> */}
            <div className="flex p-5 border-gray-200 border rounded-xl flex-col">
              {/* <!-- Header --> */}
              <div className="flex justify-between">
                <div className="flex items-center border border-gray-200 rounded-lg justify-center flex-col size-10">
                  <svg
                    className=" size-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                  </svg>
                </div>

                <button
                  type="button"
                  className=" inline-flex items-center shadow-sm text-gray-800 font-semibold text-sm px-3 py-2 bg-white border gap-x-2 rounded-lg focus:outline-none hover:bg-gray-200"
                >
                  <svg
                    className="flex-shrink-0 size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                  </svg>
                  Sign out
                </button>
              </div>
              {/* <!-- End Header --> */}

              {/* <!-- Heading --> */}
              <div className="flex space-y-4 justify-between items-center">
                <span className="font-semibold text-gray-800">Mac</span>
                <span className="inline-flex items-center font-semibold text-xs px-2 py-1 bg-cyan-100 rounded-full gap-2 text-cyan-800">
                  Current session
                </span>
              </div>
              {/* <!-- End Heading --> */}

              {/* <!-- List Group --> */}
              <ul className="mt-4">
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Location:
                  </span>
                  <span className="text-gray-800 text-sm">United Kingdom</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Device:
                  </span>
                  <span className="text-gray-800 text-sm">Safari - iOS</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    IP address:
                  </span>
                  <span className="text-gray-800 text-sm">129.562.028.172</span>
                </li>

                <li className="mt-2 flex justify-between items-center">
                  <span className="text-gray-500 uppercase text-xs">
                    Recent activity:
                  </span>
                  <span className="text-gray-800 text-sm">5 minutes ago</span>
                </li>
              </ul>
              {/* <!-- End List Group --> */}

              <button
                type="button"
                className=" mt-4 w-full shadow-sm text-gray-800 font-medium text-sm py-2 px-3 border-gray-200 border rounded-lg cursor-pointer gap-x-2 justify-center inline-flex items-center focus:outline-none focus:bg-gray-50 hover:bg-gray-200"
              >
                <svg
                  className=" flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Don’t recognize something?
              </button>
            </div>
            {/* <!-- End Card --> */}
          </div>
          {/* <!-- End Grid --> */}
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  );
};

const DangerZone = () => {
  return (
    <div class="border-gray-200 border-t py-8">
      {/* <!-- Grid --> */}
      <div className="grid sm:grid-cols-12 sm:gap-x-5 sm:gap-y-0 gap-y-1">
        <div className="2xl:col-span-2 xl:col-span-3">
          <h2 className="text-sm inline-flex text-gray-500">Danger Zone</h2>
        </div>
        {/* <!-- End Col --> */}

        <div class="xl:col-span-4 sm:col-span-8">
          <button
            type="button"
            class=" shadow-sm text-red-500 font-medium text-sm py-2 px-3 border-gray-200 border rounded-lg inline-flex items-center"
          >
            Delete my account
          </button>

          <p class="text-gray-500 text-sm mt-3">
            This will immediately delete all of your data. This action is not
            reversible, so please continue with caution.{" "}
            <a class="text-cyan-600 font-medium" href="#">
              Learn more
            </a>
          </p>
        </div>
        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  );
};

const BillingPage = () => {
  return (
    <div class=" space-y-3 md:p-8 shadow-sm p-5 bg-white border-gray-200 border rounded-xl">
      {/* <!-- Title --> */}
      <div class="xl:mb-8 gap-x-3 justify-between flex ">
        <div>
          <h1 class="text-gray-800 font-semibold text-lg">
            Plan &amp; Billing
          </h1>
          <p class=" text-sm text-gray-500">
            View your plan information or switch plans according to your needs.
          </p>
        </div>
        {/* <!-- End Col --> */}

        <div class=" flex-shrink-0">
          <button
            type="button"
            class="flex items-center shadow-sm text-gray-800 text-sm py-2 px-3 bg-white border-gray-200 border rounded-lg gap-x-2"
            data-hs-overlay="#hs-pro-dmgprom"
          >
            <svg
              class=" flex-shrink-0 size-4 "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 12 20 22 4 22 4 12"></polyline>
              <rect width="20" height="5" x="2" y="7"></rect>
              <line x1="12" x2="12" y1="22" y2="7"></line>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
            </svg>
            Gift PRO
          </button>
        </div>
      </div>
      {/* <!-- End Title --> */}

      <div class="space-y-11">
        {/* <!-- Grid --> */}
        <div class="xl:grid gap-6 xl:grid-cols-2 flex flex-col">
          {/* <!-- Card --> */}
          <div class="flex border rounded-xl flex-col">
            {/* <!-- Body --> */}
            <div class=" p-6 h-full">
              <svg
                class=" h-8 w-9"
                width="34"
                height="30"
                viewBox="0 0 34 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="7"
                  width="20"
                  height="20"
                  rx="10"
                  fill="currentColor"
                  class="uxgrl dark:fill-blue-500"
                ></rect>
                <rect
                  y="10"
                  width="20"
                  height="20"
                  rx="10"
                  fill="currentColor"
                  class="fh6vl dark:fill-blue-600"
                ></rect>
                <rect
                  x="14"
                  y="10"
                  width="20"
                  height="20"
                  rx="10"
                  fill="currentColor"
                  class="kayaj dark:fill-blue-700"
                ></rect>
              </svg>

              {/* <!-- Grid --> */}
              <div class=" gap-x-2 grid-cols-2 grid mt-3">
                <div>
                  <div class="flex items-center gap-x-2">
                    <h2 class="text-gray-800 font-semibold  text-lg">
                      Startup
                    </h2>
                    <span class="inline-flex items-center text-blue-800 font-medium text-xs px-2 py-2 bg-blue-100  rounded-full gap-1 ">
                      <span class="bg-blue-800 rounded-full size-[0.375rem] inline-block"></span>
                      Active
                    </span>
                  </div>

                  <p class="text-gray-500 text-sm mt-2">
                    Renews on March 25th, 2023
                  </p>
                </div>
                {/* <!-- End Col --> */}

                <div class=" text-end">
                  <h2 class="text-gray-800 font-semibold text-2xl">£39</h2>

                  <p class="text-gray-500 text-sm">Monthly</p>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Progress --> */}
              <div class=" my-4">
                <div class="flex items-center gap-x-2 justify-between mb-1">
                  <h4 class="text-gray-800 font-medium">Seats</h4>
                  <p class="text-gray-500 text-sm">5 of 20 used</p>
                </div>
                <div
                  class="flex w-full bg-gray-200 rounded-full overflow-hidden h-3"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    class="flex bg-blue-600 text-xs text-white text-center rounded-full whitespace-nowrap overflow-hidden justify-center flex-col"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
              {/* <!-- End Progress --> */}

              <div class="flex gap-x-2 items-center justify-end">
                <div class="inline-block">
                  <svg
                    class=" text-gray-400 flex-shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m16 12-4-4-4 4"></path>
                    <path d="M12 16V8"></path>
                  </svg>
                </div>
                <button
                  type="button"
                  class=" items-center opacity-50 pointer-events-none shadow-sm text-gray-800 font-medium text-sm  py-2 px-3 bg-white border-gray-200 border rounded-lg gap-x-2 justify-center inline-flex"
                  disabled=""
                >
                  Manage seats
                </button>
              </div>
            </div>
            {/* <!-- End Body --> */}

            {/* <!-- Footer --> */}
            <div class="flex border-t divide-x border-gray-200">
              <button
                type="button"
                class=" shadow-sm rounded-es-xl gap-x-2 divide-gray-200 divide-x justify-center w-full inline-flex items-center cursor-pointer text-gray-800 font-medium text-sm py-3 px-4 bg-white "
                data-hs-overlay="#hs-pro-dlcsam"
              >
                Cancel subscription
              </button>
              <a
                class="w-full items-center divide-x divide-gray-400 divide-solid shadow-sm text-gray-800 font-medium rounded-ee-xl text-sm py-3 px-4 gap-x-2 justify-center inline-flex"
                href="../../pro/dashboard/plans.html"
              >
                Upgrade plan
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </a>
            </div>
            {/* <!-- End Footer --> */}
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <div class="flex flex-col rounded-xl border border-gray-200">
            {/* <!-- Body --> */}
            <div class=" p-6 h-full">
              <h2 class="text-gray-800 font-semibold text-lg">
                Payment methods
              </h2>

              <p class="text-gray-500 text-sm mt-2">
                Add and manage your payment methods using our secure payment
                system.
              </p>

              {/* <!-- List Group --> */}
              <ul class="flex bg-white border-gray-200 border rounded-xl flex-col mt-4 -space-y-px">
                {/* <!-- List Item --> */}
                <li class=" border-t-0 p-3 border-gray-200">
                  {/* <!-- Media --> */}
                  <div class="flex gap-x-3">
                    {/* <!-- Logo --> */}
                    <div>
                      <div class=" px-3 py-[0.65rem] border rounded-lg">
                        <svg
                          class="flex-shrink-0 w-8 h-auto"
                          width="35"
                          height="22"
                          viewBox="0 0 35 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_666_270977"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="5"
                            width="35"
                            height="12"
                          >
                            <path
                              d="M34.5 5.4751H0.5V16.5081H34.5V5.4751Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_666_270977)">
                            <path
                              d="M15.239 16.3211H12.468L14.202 5.6621H16.973L15.239 16.3211ZM10.139 5.6621L7.487 12.9891L7.181 11.4081L6.246 6.6311C6.246 6.6311 6.127 5.6791 4.937 5.6791H0.551L0.5 5.8491C0.5 5.8491 1.843 6.1211 3.407 7.0731L5.821 16.3381H8.711L13.131 5.6791L10.139 5.6621ZM31.95 16.3211H34.5L32.273 5.6621H30.046C29.009 5.6621 28.771 6.4611 28.771 6.4611L24.64 16.3211H27.53L28.108 14.7401H31.627L31.95 16.3211ZM28.907 12.5471L30.369 8.5521L31.185 12.5471H28.907ZM24.844 8.2291L25.235 5.9341C25.235 5.9341 24.011 5.4751 22.736 5.4751C21.359 5.4751 18.095 6.0701 18.095 9.0111C18.095 11.7651 21.937 11.7991 21.937 13.2441C21.937 14.6891 18.503 14.4341 17.364 13.5161L16.956 15.9131C16.956 15.9131 18.197 16.5081 20.084 16.5081C21.971 16.5081 24.827 15.5221 24.827 12.8531C24.827 10.0821 20.951 9.8271 20.951 8.6201C20.951 7.4131 23.654 7.5661 24.844 8.2291Z"
                              fill="#2566AF"
                            ></path>
                            <path
                              d="M7.181 11.4252L6.246 6.6312C6.246 6.6312 6.127 5.6792 4.937 5.6792H0.551L0.5 5.8492C0.5 5.8492 2.608 6.2912 4.614 7.9232C6.552 9.4702 7.181 11.4252 7.181 11.4252Z"
                              fill="#E6A540"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    {/* <!-- End Logo --> */}

                    {/* <!-- Body --> */}
                    <div class=" sm:gap-x-3 sm:justify-between sm:flex gap-y-2 flex-grow">
                      <div>
                        <p class="text-gray-800 font-medium text-sm">
                          Visa •••• 9016
                        </p>
                        <p class="text-gray-500 text-xs">
                          Debit - Expires 12/25
                        </p>
                      </div>

                      {/* <!-- Button Group --> */}
                      <div class="flex gap-x-2">
                        <div>
                          <button
                            type="button"
                            class=" opacity-50 pointer-events-none shadow-sm text-gray-800 font-medium text-xs py-2 px-[0.625rem] bg-white border-gray-200 border rounded-lg gap-x-2 items-center inline-flex"
                            disabled=""
                          >
                            Default
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="text-gray-800 font-semibold text-xs py-2 px-[0.625rem] bg-gray-200 border-transparent border rounded-lg items-center inline-flex"
                            data-hs-overlay="#hs-pro-deacm"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      {/* <!-- End Button Group --> */}
                    </div>
                    {/* <!-- End Body --> */}
                  </div>
                  {/* <!-- End Media --> */}
                </li>
                {/* <!-- End List Item --> */}

                {/* <!-- List Item --> */}
                <li class="-space-y-px p-3 border-gray-200 border-t">
                  {/* <!-- Media --> */}
                  <div class="flex gap-x-3">
                    {/* <!-- Logo --> */}
                    <div>
                      <div class=" px-3 py-[0.65rem] border rounded-lg">
                        <svg
                          class="flex-shrink-0 w-8 h-auto"
                          width="35"
                          height="22"
                          viewBox="0 0 35 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_666_271011"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="35"
                            height="22"
                          >
                            <path
                              d="M34.5 0.375H0.5V21.387H34.5V0.375Z"
                              fill="white"
                            ></path>
                          </mask>
                          <g mask="url(#mask0_666_271011)">
                            <path
                              d="M22.0899 19.1431H12.9099V2.61914H22.0899V19.1431Z"
                              fill="#FF5F00"
                            ></path>
                            <path
                              d="M13.488 10.881C13.488 7.532 15.052 4.54 17.5 2.619C15.647 1.157 13.369 0.375 11.006 0.375C5.209 0.375 0.5 5.084 0.5 10.881C0.5 16.678 5.209 21.387 11.006 21.387C13.369 21.387 15.647 20.605 17.5 19.143C15.052 17.222 13.488 14.23 13.488 10.881Z"
                              fill="#EB001B"
                            ></path>
                            <path
                              d="M34.5 10.881C34.5 16.678 29.791 21.387 23.994 21.387C21.631 21.387 19.353 20.605 17.5 19.143C19.948 17.222 21.512 14.23 21.512 10.881C21.512 7.532 19.948 4.54 17.5 2.619C19.353 1.157 21.631 0.375 23.994 0.375C29.791 0.375 34.5 5.084 34.5 10.881Z"
                              fill="#F79E1B"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    {/* <!-- End Logo --> */}

                    {/* <!-- Body --> */}
                    <div class=" sm:gap-x-3 sm:justify-between sm:flex gap-y-2 flex-grow">
                      <div>
                        <p class="text-gray-800 font-medium text-sm">
                          MasterCard •••• 4242
                        </p>
                        <p class="text-gray-500 text-xs">
                          Debit - Expires 04/24
                        </p>
                      </div>

                      {/* <!-- Button Group --> */}
                      <div class="flex gap-x-2">
                        <div>
                          <button
                            type="button"
                            class="shadow-sm text-gray-800 font-medium text-xs py-2 px-[0.625rem] bg-white border-gray-200 border rounded-lg gap-x-2 items-center inline-flex"
                          >
                            Set as default
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="text-gray-800 font-semibold text-xs py-2 px-[0.625rem] bg-gray-200 border-transparent border rounded-lg items-center inline-flex"
                            data-hs-overlay="#hs-pro-deacm"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      {/* <!-- End Button Group --> */}
                    </div>
                    {/* <!-- End Body --> */}
                  </div>
                  {/* <!-- End Media --> */}
                </li>
                {/* <!-- End List Item --> */}
              </ul>
              {/* <!-- End List Group --> */}
            </div>
            {/* <!-- End Body --> */}

            {/* <!-- Footer --> */}
            <div class="flex border-t divide-x border-gray-200">
              <button
                type="button"
                class=" shadow-sm rounded-es-xl gap-x-2 divide-gray-200 divide-x justify-center w-full inline-flex items-center cursor-pointer text-gray-800 font-medium text-sm py-3 px-4 bg-white "
                data-hs-overlay="#hs-pro-dlcsam"
              >
                Manage cards
              </button>
              <button
                type="button"
                class=" shadow-sm rounded-ee-xl gap-x-2 divide-gray-200 divide-x justify-center w-full inline-flex items-center cursor-pointer text-gray-800 font-medium text-sm py-3 px-4 bg-white "
                data-hs-overlay="#hs-pro-dlcsam"
              >
                <svg
                  class=" flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12h8"></path>
                  <path d="M12 8v8"></path>
                </svg>
                Add new card
              </button>
            </div>
            {/* <!-- End Footer --> */}
          </div>
          {/* <!-- End Card --> */}
        </div>
        {/* <!-- End Grid --> */}

        <div class=" space-y-11 border-gray-200 border-t"></div>

        {/* <!-- Table Section --> */}
        <div class="space-y-11 overflow-x-auto dark:[&amp;::-webkit-scrollbar-track]:bg-neutral-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div class=" align-middle min-w-full inline-block">
            {/* <!-- Table --> */}
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" class=" w-1/4">
                    <div class="text-gray-800 font-medium text-sm text-start pe-4 py-3 px-4 gap-x-1 items-center flex">
                      Invoice
                    </div>
                  </th>

                  <th scope="col" class=" w-1/4">
                    <div class="text-gray-800 font-medium text-sm text-start pe-4 px-4 py-3 gap-x-1 items-center flex">
                      Billing date
                    </div>
                  </th>

                  <th scope="col" class=" w-1/4">
                    <div class="text-gray-800 font-medium text-sm text-start pe-4 px-4 py-3 gap-x-1 items-center flex">
                      Amount
                    </div>
                  </th>

                  <th scope="col" class=" w-1/4">
                    <div class="text-gray-800 font-medium text-sm text-start pe-4 px-4 py-3 gap-x-1 items-center flex">
                      Plan
                    </div>
                  </th>

                  <th scope="col"></th>
                </tr>
              </thead>

              <tbody class=" divide-gray-200 divide-y">
                <tr>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <div class="w-full flex items-center gap-x-2">
                      <svg
                        class=" flex-shrink-0 size-7"
                        width="400"
                        height="492"
                        viewBox="0 0 400 492"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip1)">
                          <path
                            d="M50.7496 -0.174609C22.9188 -0.174609 -0.0878906 22.4611 -0.0878906 50.6629V440.664C-0.0878906 468.495 22.5478 491.502 50.7496 491.502H349.095C376.926 491.502 399.932 468.866 399.932 440.664V119.683C399.932 119.683 400.675 110.406 396.593 101.129C392.882 92.5945 386.574 86.6573 386.574 86.6573L312.729 13.9263C312.729 13.9263 306.421 7.98906 297.144 3.90722C286.012 -0.916768 274.88 -0.174609 274.88 -0.174609H50.7496Z"
                            fill="currentColor"
                            class="ghphy"
                          ></path>
                          <path
                            d="M50.7494 16.5238H274.508C274.508 16.5238 283.414 16.5238 290.094 19.4924C296.402 22.09 300.855 26.1718 300.855 26.1718L374.699 98.5317C374.699 98.5317 379.152 103.356 381.378 108.18C383.234 112.262 383.234 119.312 383.234 119.312V119.683V441.035C383.234 459.96 368.02 475.174 349.095 475.174H50.7494C31.8245 475.174 16.6104 459.96 16.6104 441.035V50.6629C16.6104 31.738 31.8245 16.5238 50.7494 16.5238Z"
                            fill="currentColor"
                            class="db5i1 dark:fill-neutral-800"
                          ></path>
                          <path
                            d="M99.7314 292.976C88.2281 281.472 100.845 265.887 134.242 248.818L155.393 238.427L163.557 220.245C168.009 210.226 175.06 193.898 178.771 184.25L185.45 166.439L180.626 153.08C174.689 136.752 172.833 112.261 176.544 103.356C181.368 91.4812 197.696 92.5944 204.004 105.582C209.199 115.601 208.457 133.784 202.52 156.791L197.696 175.715L202.148 183.137C204.375 187.219 211.425 196.867 217.363 204.288L228.866 218.389L242.967 216.534C288.238 210.597 303.452 220.616 303.452 235.088C303.452 253.27 267.829 254.755 238.143 233.974C231.464 229.15 227.011 224.698 227.011 224.698C227.011 224.698 208.457 228.408 199.18 231.006C189.532 233.603 185.079 235.088 170.978 239.912C170.978 239.912 166.154 246.962 162.814 252.157C150.94 271.453 137.21 287.038 127.191 292.976C117.172 298.171 105.669 298.542 99.7314 292.976ZM117.914 286.296C124.222 282.214 137.581 267 146.487 252.528L150.198 246.591L133.499 255.126C107.895 268.113 96.0207 280.359 101.958 287.781C105.298 291.862 109.75 291.491 117.914 286.296ZM285.27 239.541C291.578 235.088 290.836 226.182 283.414 222.471C277.848 219.502 273.395 219.131 258.923 219.131C250.017 219.874 235.916 221.358 233.319 222.1C233.319 222.1 241.112 227.666 244.451 229.522C248.904 232.119 260.407 236.943 268.571 239.541C276.735 242.138 281.559 242.138 285.27 239.541ZM217.734 211.339C214.023 207.257 207.344 199.093 203.262 192.785C197.696 185.735 195.098 180.911 195.098 180.911C195.098 180.911 191.016 193.527 188.048 201.32L178.029 226.182L175.06 231.748C175.06 231.748 190.645 226.553 198.438 224.698C206.972 222.471 223.671 219.131 223.671 219.131L217.734 211.339ZM196.211 124.507C197.324 116.343 197.696 108.18 195.098 104.098C187.677 96.3051 179.142 102.613 180.626 121.538C180.997 127.847 182.853 138.979 184.708 145.658L188.419 157.904L191.016 148.627C192.501 143.803 194.727 132.671 196.211 124.507Z"
                            fill="currentColor"
                            class="ghphy"
                          ></path>
                          <path
                            d="M119.398 346.04H137.952C143.889 346.04 148.713 346.782 152.424 347.895C156.135 349.008 159.104 351.606 161.701 355.316C164.299 359.027 165.412 363.851 165.412 369.046C165.412 373.87 164.299 378.323 162.443 381.663C160.217 385.374 157.619 387.971 154.28 389.455C150.94 390.94 145.374 391.682 138.323 391.682H132.015V420.997H119.398V346.04ZM132.015 355.688V382.034H138.323C143.889 382.034 147.6 380.921 149.827 379.065C152.053 376.839 153.166 373.499 153.166 369.046C153.166 365.707 152.424 362.738 150.94 360.512C149.456 358.285 147.971 357.172 146.487 356.43C145.003 356.059 142.034 355.688 138.694 355.688H132.015Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                          <path
                            d="M175.431 346.04H192.501C200.664 346.04 207.344 347.524 212.168 350.492C216.992 353.461 220.702 357.543 223.3 363.48C225.898 369.046 227.011 375.726 227.011 382.405C227.011 389.827 225.898 396.506 223.671 402.072C221.445 407.638 218.105 412.462 213.281 415.802C208.828 419.513 202.149 420.997 193.243 420.997H175.431V346.04ZM187.677 356.059V411.349H192.872C200.293 411.349 205.488 408.751 208.828 403.927C212.168 398.732 213.652 392.053 213.652 383.889C213.652 365.336 206.602 356.059 192.872 356.059H187.677Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                          <path
                            d="M238.885 346.04H280.816V356.059H251.501V378.694H274.879V388.713H251.501V421.368H238.885V346.04Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip1">
                            <rect
                              width="400"
                              height="491.75"
                              fill="white"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <div class=" flex-grow">
                        <span class="text-gray-800 font-medium text-sm">
                          25-02-2023
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">25 Feb, 2023</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">£39</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">Startup</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <div class="flex gap-x-2">
                      <button
                        type="button"
                        class=" shadow-sm text-gray-800 font-medium text-xs py-2 px-[0.625rem] bg-white border rounded-lg gap-x-1 items-center inline-flex"
                        data-hs-overlay="#hs-pro-dminvm"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class=" shadow-sm text-gray-800 bg-white border-gray-200 border rounded-lg justify-center items-center size-9 inline-flex"
                      >
                        <svg
                          class=" flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <div class="w-full flex items-center gap-x-2">
                      <svg
                        class=" flex-shrink-0 size-7"
                        width="400"
                        height="492"
                        viewBox="0 0 400 492"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip1)">
                          <path
                            d="M50.7496 -0.174609C22.9188 -0.174609 -0.0878906 22.4611 -0.0878906 50.6629V440.664C-0.0878906 468.495 22.5478 491.502 50.7496 491.502H349.095C376.926 491.502 399.932 468.866 399.932 440.664V119.683C399.932 119.683 400.675 110.406 396.593 101.129C392.882 92.5945 386.574 86.6573 386.574 86.6573L312.729 13.9263C312.729 13.9263 306.421 7.98906 297.144 3.90722C286.012 -0.916768 274.88 -0.174609 274.88 -0.174609H50.7496Z"
                            fill="currentColor"
                            class="ghphy"
                          ></path>
                          <path
                            d="M50.7494 16.5238H274.508C274.508 16.5238 283.414 16.5238 290.094 19.4924C296.402 22.09 300.855 26.1718 300.855 26.1718L374.699 98.5317C374.699 98.5317 379.152 103.356 381.378 108.18C383.234 112.262 383.234 119.312 383.234 119.312V119.683V441.035C383.234 459.96 368.02 475.174 349.095 475.174H50.7494C31.8245 475.174 16.6104 459.96 16.6104 441.035V50.6629C16.6104 31.738 31.8245 16.5238 50.7494 16.5238Z"
                            fill="currentColor"
                            class="db5i1 dark:fill-neutral-800"
                          ></path>
                          <path
                            d="M99.7314 292.976C88.2281 281.472 100.845 265.887 134.242 248.818L155.393 238.427L163.557 220.245C168.009 210.226 175.06 193.898 178.771 184.25L185.45 166.439L180.626 153.08C174.689 136.752 172.833 112.261 176.544 103.356C181.368 91.4812 197.696 92.5944 204.004 105.582C209.199 115.601 208.457 133.784 202.52 156.791L197.696 175.715L202.148 183.137C204.375 187.219 211.425 196.867 217.363 204.288L228.866 218.389L242.967 216.534C288.238 210.597 303.452 220.616 303.452 235.088C303.452 253.27 267.829 254.755 238.143 233.974C231.464 229.15 227.011 224.698 227.011 224.698C227.011 224.698 208.457 228.408 199.18 231.006C189.532 233.603 185.079 235.088 170.978 239.912C170.978 239.912 166.154 246.962 162.814 252.157C150.94 271.453 137.21 287.038 127.191 292.976C117.172 298.171 105.669 298.542 99.7314 292.976ZM117.914 286.296C124.222 282.214 137.581 267 146.487 252.528L150.198 246.591L133.499 255.126C107.895 268.113 96.0207 280.359 101.958 287.781C105.298 291.862 109.75 291.491 117.914 286.296ZM285.27 239.541C291.578 235.088 290.836 226.182 283.414 222.471C277.848 219.502 273.395 219.131 258.923 219.131C250.017 219.874 235.916 221.358 233.319 222.1C233.319 222.1 241.112 227.666 244.451 229.522C248.904 232.119 260.407 236.943 268.571 239.541C276.735 242.138 281.559 242.138 285.27 239.541ZM217.734 211.339C214.023 207.257 207.344 199.093 203.262 192.785C197.696 185.735 195.098 180.911 195.098 180.911C195.098 180.911 191.016 193.527 188.048 201.32L178.029 226.182L175.06 231.748C175.06 231.748 190.645 226.553 198.438 224.698C206.972 222.471 223.671 219.131 223.671 219.131L217.734 211.339ZM196.211 124.507C197.324 116.343 197.696 108.18 195.098 104.098C187.677 96.3051 179.142 102.613 180.626 121.538C180.997 127.847 182.853 138.979 184.708 145.658L188.419 157.904L191.016 148.627C192.501 143.803 194.727 132.671 196.211 124.507Z"
                            fill="currentColor"
                            class="ghphy"
                          ></path>
                          <path
                            d="M119.398 346.04H137.952C143.889 346.04 148.713 346.782 152.424 347.895C156.135 349.008 159.104 351.606 161.701 355.316C164.299 359.027 165.412 363.851 165.412 369.046C165.412 373.87 164.299 378.323 162.443 381.663C160.217 385.374 157.619 387.971 154.28 389.455C150.94 390.94 145.374 391.682 138.323 391.682H132.015V420.997H119.398V346.04ZM132.015 355.688V382.034H138.323C143.889 382.034 147.6 380.921 149.827 379.065C152.053 376.839 153.166 373.499 153.166 369.046C153.166 365.707 152.424 362.738 150.94 360.512C149.456 358.285 147.971 357.172 146.487 356.43C145.003 356.059 142.034 355.688 138.694 355.688H132.015Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                          <path
                            d="M175.431 346.04H192.501C200.664 346.04 207.344 347.524 212.168 350.492C216.992 353.461 220.702 357.543 223.3 363.48C225.898 369.046 227.011 375.726 227.011 382.405C227.011 389.827 225.898 396.506 223.671 402.072C221.445 407.638 218.105 412.462 213.281 415.802C208.828 419.513 202.149 420.997 193.243 420.997H175.431V346.04ZM187.677 356.059V411.349H192.872C200.293 411.349 205.488 408.751 208.828 403.927C212.168 398.732 213.652 392.053 213.652 383.889C213.652 365.336 206.602 356.059 192.872 356.059H187.677Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                          <path
                            d="M238.885 346.04H280.816V356.059H251.501V378.694H274.879V388.713H251.501V421.368H238.885V346.04Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip1">
                            <rect
                              width="400"
                              height="491.75"
                              fill="white"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <div class=" flex-grow">
                        <span class="text-gray-800 font-medium text-sm">
                          25-02-2023
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">25 Feb, 2023</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">£39</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">Startup</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <div class="flex gap-x-2">
                      <button
                        type="button"
                        class=" shadow-sm text-gray-800 font-medium text-xs py-2 px-[0.625rem] bg-white border rounded-lg gap-x-1 items-center inline-flex"
                        data-hs-overlay="#hs-pro-dminvm"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class=" shadow-sm text-gray-800 bg-white border-gray-200 border rounded-lg justify-center items-center size-9 inline-flex"
                      >
                        <svg
                          class=" flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <div class="w-full flex items-center gap-x-2">
                      <svg
                        class=" flex-shrink-0 size-7"
                        width="400"
                        height="492"
                        viewBox="0 0 400 492"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip1)">
                          <path
                            d="M50.7496 -0.174609C22.9188 -0.174609 -0.0878906 22.4611 -0.0878906 50.6629V440.664C-0.0878906 468.495 22.5478 491.502 50.7496 491.502H349.095C376.926 491.502 399.932 468.866 399.932 440.664V119.683C399.932 119.683 400.675 110.406 396.593 101.129C392.882 92.5945 386.574 86.6573 386.574 86.6573L312.729 13.9263C312.729 13.9263 306.421 7.98906 297.144 3.90722C286.012 -0.916768 274.88 -0.174609 274.88 -0.174609H50.7496Z"
                            fill="currentColor"
                            class="ghphy"
                          ></path>
                          <path
                            d="M50.7494 16.5238H274.508C274.508 16.5238 283.414 16.5238 290.094 19.4924C296.402 22.09 300.855 26.1718 300.855 26.1718L374.699 98.5317C374.699 98.5317 379.152 103.356 381.378 108.18C383.234 112.262 383.234 119.312 383.234 119.312V119.683V441.035C383.234 459.96 368.02 475.174 349.095 475.174H50.7494C31.8245 475.174 16.6104 459.96 16.6104 441.035V50.6629C16.6104 31.738 31.8245 16.5238 50.7494 16.5238Z"
                            fill="currentColor"
                            class="db5i1 dark:fill-neutral-800"
                          ></path>
                          <path
                            d="M99.7314 292.976C88.2281 281.472 100.845 265.887 134.242 248.818L155.393 238.427L163.557 220.245C168.009 210.226 175.06 193.898 178.771 184.25L185.45 166.439L180.626 153.08C174.689 136.752 172.833 112.261 176.544 103.356C181.368 91.4812 197.696 92.5944 204.004 105.582C209.199 115.601 208.457 133.784 202.52 156.791L197.696 175.715L202.148 183.137C204.375 187.219 211.425 196.867 217.363 204.288L228.866 218.389L242.967 216.534C288.238 210.597 303.452 220.616 303.452 235.088C303.452 253.27 267.829 254.755 238.143 233.974C231.464 229.15 227.011 224.698 227.011 224.698C227.011 224.698 208.457 228.408 199.18 231.006C189.532 233.603 185.079 235.088 170.978 239.912C170.978 239.912 166.154 246.962 162.814 252.157C150.94 271.453 137.21 287.038 127.191 292.976C117.172 298.171 105.669 298.542 99.7314 292.976ZM117.914 286.296C124.222 282.214 137.581 267 146.487 252.528L150.198 246.591L133.499 255.126C107.895 268.113 96.0207 280.359 101.958 287.781C105.298 291.862 109.75 291.491 117.914 286.296ZM285.27 239.541C291.578 235.088 290.836 226.182 283.414 222.471C277.848 219.502 273.395 219.131 258.923 219.131C250.017 219.874 235.916 221.358 233.319 222.1C233.319 222.1 241.112 227.666 244.451 229.522C248.904 232.119 260.407 236.943 268.571 239.541C276.735 242.138 281.559 242.138 285.27 239.541ZM217.734 211.339C214.023 207.257 207.344 199.093 203.262 192.785C197.696 185.735 195.098 180.911 195.098 180.911C195.098 180.911 191.016 193.527 188.048 201.32L178.029 226.182L175.06 231.748C175.06 231.748 190.645 226.553 198.438 224.698C206.972 222.471 223.671 219.131 223.671 219.131L217.734 211.339ZM196.211 124.507C197.324 116.343 197.696 108.18 195.098 104.098C187.677 96.3051 179.142 102.613 180.626 121.538C180.997 127.847 182.853 138.979 184.708 145.658L188.419 157.904L191.016 148.627C192.501 143.803 194.727 132.671 196.211 124.507Z"
                            fill="currentColor"
                            class="ghphy"
                          ></path>
                          <path
                            d="M119.398 346.04H137.952C143.889 346.04 148.713 346.782 152.424 347.895C156.135 349.008 159.104 351.606 161.701 355.316C164.299 359.027 165.412 363.851 165.412 369.046C165.412 373.87 164.299 378.323 162.443 381.663C160.217 385.374 157.619 387.971 154.28 389.455C150.94 390.94 145.374 391.682 138.323 391.682H132.015V420.997H119.398V346.04ZM132.015 355.688V382.034H138.323C143.889 382.034 147.6 380.921 149.827 379.065C152.053 376.839 153.166 373.499 153.166 369.046C153.166 365.707 152.424 362.738 150.94 360.512C149.456 358.285 147.971 357.172 146.487 356.43C145.003 356.059 142.034 355.688 138.694 355.688H132.015Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                          <path
                            d="M175.431 346.04H192.501C200.664 346.04 207.344 347.524 212.168 350.492C216.992 353.461 220.702 357.543 223.3 363.48C225.898 369.046 227.011 375.726 227.011 382.405C227.011 389.827 225.898 396.506 223.671 402.072C221.445 407.638 218.105 412.462 213.281 415.802C208.828 419.513 202.149 420.997 193.243 420.997H175.431V346.04ZM187.677 356.059V411.349H192.872C200.293 411.349 205.488 408.751 208.828 403.927C212.168 398.732 213.652 392.053 213.652 383.889C213.652 365.336 206.602 356.059 192.872 356.059H187.677Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                          <path
                            d="M238.885 346.04H280.816V356.059H251.501V378.694H274.879V388.713H251.501V421.368H238.885V346.04Z"
                            fill="currentColor"
                            class="uvbqf dark:fill-white"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip1">
                            <rect
                              width="400"
                              height="491.75"
                              fill="white"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <div class=" flex-grow">
                        <span class="text-gray-800 font-medium text-sm">
                          25-02-2023
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">25 Feb, 2023</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">£39</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <span class="text-sm text-gray-600">Startup</span>
                  </td>
                  <td class=" py-3 px-4 whitespace-nowrap size-px">
                    <div class="flex gap-x-2">
                      <button
                        type="button"
                        class=" shadow-sm text-gray-800 font-medium text-xs py-2 px-[0.625rem] bg-white border rounded-lg gap-x-1 items-center inline-flex"
                        data-hs-overlay="#hs-pro-dminvm"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        class=" shadow-sm text-gray-800 bg-white border-gray-200 border rounded-lg justify-center items-center size-9 inline-flex"
                      >
                        <svg
                          class=" flex-shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" x2="12" y1="15" y2="3"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <!-- End Table --> */}
          </div>
        </div>
        {/* <!-- End Table Section --> */}
      </div>
    </div>
  );
};

const Members = () => {
  const [data, setData] = useState([]);
  const getVisa = async () => {
    try {
      const response = await getEmpSummaryData();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVisa();
  }, []);
  return (
    <div class=" space-y-3 mt-2 md:p-8 p-5 shadow-sm bg-white border border-gray-200 rounded-lg ">
      {/* <!-- Title --> */}
      <div class="xl:mb-8 mb-4">
        <h1 class="text-gray-800 font-semibold text-xl">Members</h1>
        <p class="text-gray-500 text-sm">
          Manage members and users of your workspace and set their access level.
        </p>
      </div>
      {/* <!-- End Title --> */}

      <div class="space-y-5">
        {/* <!-- Filter Group --> */}
        <div class="flex sm:grid sm:grid-cols-2 sm:gap-x-5 gap-x-2 ">
          {/* <!-- Search Input --> */}
          <div class="relative w-full">
            <div class="absolute flex items-center ps-3 mb-1 start-0 top-0 bottom-0 pointer-events-none">
              <svg
                class="text-gray-500 size-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              type="text"
              class="block w-full text-sm ps-10 py-2 px-3 bg-gray-100 border-transparent text-neutral-800 rounded-lg  focus:border-cyan-500 focus:ring-cyan-500"
              placeholder="Search by name or email"
            />
          </div>
          {/* <!-- End Search Input --> */}

          <div class="flex items-center gap-x-2 justify-end">
            {/* <!-- Button --> */}
            <button
              type="button"
              class=" shadow-sm text-gray-800 py-2 px-3 font-medium bg-white border-gray-200 border rounded-lg items-center inline-flex "
            >
              <svg
                class=" me-2 flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              <span class="hidden sm:block">Download CSV</span>
            </button>
            {/* <!-- End Button --> */}

            {/* <!-- Button --> */}
            <button
              type="button"
              class="text-white font-semibold text-sm py-2 px-3 bg-cyan-600 border border-transparent rounded-lg gap-x-1  items-center inline-flex"
              data-hs-overlay="#hs-pro-dshm"
            >
              <span class="hidden sm:block">Send</span>Invite
            </button>
            {/* <!-- End Button --> */}
          </div>
          {/* <!-- End Col --> */}
        </div>
        {/* <!-- End Filter Group --> */}

        {/* <!-- Stats Grid --> */}
        <div class=" space-y-5 xl:grid-cols-4 sm:grid-cols-2 gap-4 grid">
          {/* <!-- Card --> */}
          <div class=" p-4 bg-white border border-gray-200 rounded-xl flex flex-col">
            <div class="flex items-center justify-between mb-1">
              <h2 class="text-gray-800 font-semibold text-4xl">1</h2>
              <div class="flex items-center -space-x-2">
                <img
                  class="rounded-full flex-shrink-0 size-7"
                  src="/images/Logo.svg"
                  alt="Image Description"
                />
              </div>
            </div>
            <h3 class="text-gray-500">Admin</h3>
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <div class=" p-4 bg-white border border-gray-200 rounded-xl flex flex-col">
            <div class="flex items-center justify-between mb-1">
              <h2 class="text-gray-800 font-semibold text-4xl">20</h2>
            </div>
            <h3 class="text-gray-500">Employee</h3>
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <div class=" p-4 bg-white border border-gray-200 rounded-xl flex flex-col">
            <div class="flex items-center justify-between mb-1">
              <h2 class="text-gray-800 font-semibold text-4xl">2</h2>
            </div>
            <h3 class="text-gray-500">Active Employee</h3>
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <div class=" p-4 bg-white border border-gray-200 rounded-xl flex flex-col">
            <div class="flex items-center justify-between mb-1">
              <h2 class="text-gray-800 font-semibold text-4xl">1</h2>
            </div>
            <h3 class="text-gray-500">Inactive Employee</h3>
          </div>
          {/* <!-- End Card --> */}
        </div>
        {/* <!-- End Stats Grid --> */}

        {/* <!-- Table Section --> */}
        <div class=" space-y-5 overflow-x-auto dark:[&amp;::-webkit-scrollbar-track]:bg-neutral-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div class=" align-middle min-w-full inline-block">
            {/* <!-- Table --> */}
            <table class=" divide-y divide-gray-200 min-w-full">
              <thead>
                <tr>
                  <th scope="col" class=" min-w-52">
                    <div class="flex items-center text-gray-800 font-medium text-sm text-start pe-4 py-3 gap-x-1">
                      Member
                    </div>
                  </th>

                  <th scope="col" class=" min-w-20">
                    <div class="flex items-center text-gray-800 font-medium text-sm text-start pe-4 py-3 gap-x-1">
                      Role
                    </div>
                  </th>

                  <th scope="col">
                    <div class="flex items-center text-gray-800 font-medium text-sm text-start pe-4 py-3 gap-x-1">
                      Email
                    </div>
                  </th>

                  <th scope="col" class=" min-w-36">
                    <div class="flex items-center text-gray-800 font-medium text-sm text-start pe-4 py-3 gap-x-1">
                      Last activity
                    </div>
                  </th>

                  <th scope="col">
                    <div class="flex items-center text-gray-800 font-medium text-sm text-start pe-4 py-3 gap-x-1">
                      Status
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody class=" divide-y divide-gray-200 ">
                <tr>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <div class="w-full flex items-center gap-x-3">
                      <img
                        class="rounded-full flex-shrink-0 size-10 "
                        src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=320&amp;h=320&amp;q=80"
                        alt="Image Description"
                      />
                      <div class=" flex-grow">
                        <span class="text-gray-800 font-medium text-sm">
                          James Collins
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <span class="text-gray-500 text-sm">Admin</span>
                  </td>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <span class="text-gray-500 text-sm">james@site.com</span>
                  </td>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <span class="text-gray-500 text-sm">Today</span>
                  </td>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <span class=" text-teal-800 font-medium text-xs py-[0.375rem] px-[0.625rem] bg-teal-100 rounded-full gap-x-[0.375rem] inline-flex items-center">
                      <span class=" bg-gray-800 rounded-full size-[0.375rem] inline-block"></span>
                      Active
                    </span>
                  </td>
                </tr>

                <tr>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <div class="w-full flex items-center gap-x-3">
                      <span class="flex items-center text-gray-700 uppercase font-medium text-xs bg-white  border border-gray-200 rounded-full justify-center flex-shrink-0 size-10">
                        L
                      </span>
                      <div class=" flex-grow">
                        <span class="text-gray-800 font-medium text-sm">
                          James Collins
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <span class="text-gray-500 text-sm">Admin</span>
                  </td>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <span class="text-gray-500 text-sm">james@site.com</span>
                  </td>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <span class="text-gray-500 text-sm">Today</span>
                  </td>
                  <td class=" pe-4 py-3 whitespace-nowrap size-px">
                    <span class=" text-gray-800 font-medium text-xs py-[0.375rem] px-[0.625rem] bg-gray-100 rounded-full gap-x-[0.375rem] inline-flex items-center">
                      <span class=" bg-gray-800 rounded-full size-[0.375rem] inline-block"></span>
                      Inactive
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <!-- End Table --> */}
          </div>
        </div>
        {/* <!-- End Table Section --> */}
      </div>
    </div>
  );
};

const ProfileNav = () => {
  return (
    <div class="flex pb-1 whitespace-nowrap overflow-y-hidden overflow-x-auto flex-row dark:[&amp;::-webkit-scrollbar-track]:bg-neutral-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-neutral-500">
      <a
        class="shadow-sm text-gray-800 text-sm py-2 px-3 bg-white border-gray-200 border rounded-lg whitespace-nowrap gap-x-2 items-center inline-flex"
        href="../../pro/dashboard/account-profile.html"
      >
        Profile
      </a>
      <a
        class="items-center text-gray-800 text-sm py-2 px-3 border-transparent whitespace-nowrap gap-x-2"
        href="../../pro/dashboard/account-notifications.html"
      >
        Notifications
      </a>
      <a
        class="items-center text-gray-800 text-sm py-2 px-3 border-transparent whitespace-nowrap gap-x-2"
        href="../../pro/dashboard/account-integrations.html"
      >
        Integrations
      </a>
      <a
        class="items-center text-gray-800 text-sm py-2 px-3 border-transparent whitespace-nowrap gap-x-2"
        href="../../pro/dashboard/account-preferences.html"
      >
        Preferences
      </a>
      <a
        class="items-center text-gray-800 text-sm py-2 px-3 border-transparent whitespace-nowrap gap-x-2"
        href="../../pro/dashboard/account-workspace.html"
      >
        Workspace
      </a>
      <a
        class="items-center text-gray-800 text-sm py-2 px-3 border-transparent whitespace-nowrap gap-x-2"
        href="../../pro/dashboard/account-plan-and-billing.html"
      >
        Plan &amp; Billing
      </a>
      <a
        class="items-center text-gray-800 text-sm py-2 px-3 border-transparent whitespace-nowrap gap-x-2"
        href="../../pro/dashboard/account-members.html"
      >
        Members
      </a>
    </div>
  );
};

const SwitchAccount = () => {
  return (
    <div class=" shadow-sm bg-white border-gray-200 border rounded-xl flex-col p-5 flex ">
      {/* <!-- Radio Group --> */}
      <div>
        <div class="flex flex-wrap items-center mb-2 gap-x-3 justify-between">
          <label
            for="hs-pro-epati"
            class="block font-medium text-gray-800 text-sm"
          >
            Account type
          </label>

          <p>
            <a
              class="text-xs text-stone-600 focus:outline-none focus:underline"
              href="#"
            >
              What type of account should I choose?
            </a>
          </p>
        </div>

        {/* <!-- Radio Grid --> */}
        <div class="grid gap-3 xl:grid-cols-2 lg:gap-5">
          {/* <!-- Radio --> */}
          <label
            for="hs-pro-epati"
            class="relative flex px-4 py-3  border-transparent rounded-xl cursor-pointer focus:outline-none"
          >
            <input
              type="radio"
              id="hs-pro-epati"
              class=" peer absolute w-full cursor-pointer appearance-none  border-gray-200 border rounded-xl h-full top-0 start-0 focus:ring-white checked:border-2 checked:border-green-600 checked:hover:border-green-600 checked:focus:border-green-600 checked:bg-none checked:text-transparent dark:checked:border-green-500 dark:checked:focus:border-green-500"
              value="Office"
              name="account"
            />
            <span class="w-full flex justify-between gap-x-3">
              <svg
                class="flex-shrink-0 text-stone-800 size-4 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
              </svg>
              <span class="grow flex flex-col">
                <span class="block text-stone-800 text-sm font-medium">
                  Office
                </span>
                <span class="grow">
                  <span class="block text-stone-500 text-sm">
                    Add Office Employee Here..
                  </span>
                </span>
              </span>
            </span>
          </label>
          {/* <!-- End Radio --> */}

          {/* <!-- Radio --> */}
          <label
            for="hs-pro-epatb"
            class="relative flex px-4 py-3  border-transparent rounded-xl cursor-pointer focus:outline-none"
          >
            <input
              type="radio"
              id="hs-pro-epatb"
              class=" peer absolute w-full cursor-pointer appearance-none  border-gray-200 border rounded-xl h-full top-0 start-0 focus:ring-white checked:border-2 checked:border-green-600 checked:hover:border-green-600 checked:focus:border-green-600 checked:bg-none checked:text-transparent dark:checked:border-green-500 dark:checked:focus:border-green-500"
              value="Employee"
              name="account"
            />
            <span class="w-full flex justify-between gap-x-3">
              <svg
                class="flex-shrink-0 text-stone-800 size-4 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span class="grow flex flex-col">
                <span class="block text-stone-800 text-sm font-medium">
                  Employee
                </span>

                <span class="grow">
                  <span class="block text-stone-500 text-sm">
                    Add a new Employee here
                  </span>
                </span>
              </span>
            </span>
          </label>
          {/* <!-- End Radio --> */}
        </div>
        {/* <!-- End Radio Grid --> */}
      </div>
      {/* <!-- End Radio Group --> */}
    </div>
  );
};

export const FooterNav = ({ isOpen, setIsOpen, data }) => {
  return (
    <footer
      onClick={() => setIsOpen(!isOpen)}
      className="block border-gray-200 bg-white border-t bottom-0 left-0 right-0 absolute"
    >
      {/* <!-- Project Dropdown --> */}
      <div className="hs-dropdown relative flex [--auto-close:inside] ">
        {/* <!-- Project Button --> */}
        <button
          id="hs-pro-dnwpd"
          type="button"
          className="w-full items-center text-gray-800 align-middle text-start py-3 px-7 inline-flex focus:outline-none focus:bg-gray-100"
        >
          <svg
            className="flex-shrink-0 size-8"
            width="284"
            height="144"
            viewBox="0 0 284 144"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_468_359)">
              <path
                d="M103.343 143.494C111.263 138.787 118.629 133.525 124.832 126.824C130.979 120.234 136.13 112.812 139.84 104.228C140.893 104.173 141.945 104.062 142.942 104.007C149.975 103.896 157.064 104.339 164.042 103.563C182.042 101.625 194.447 83.349 190.404 65.2943C187.303 51.5596 174.897 41.0369 161.162 40.7046C154.406 40.5385 147.705 40.6493 140.726 40.6493C133.527 23.9238 122.173 11.0198 106.279 1.71555C107.22 1.49402 107.608 1.32788 107.995 1.32788C126.77 1.32788 145.489 0.829436 164.208 1.49402C183.094 2.15861 198.933 10.4659 211.726 24.8099C213.942 27.3021 215.88 30.0713 217.985 32.6742C211.173 45.1906 207.517 58.15 207.517 72.2725C207.517 86.395 211.062 99.3544 218.04 112.092C215.437 115.305 212.834 118.683 210.01 121.784C201.315 131.31 190.57 137.679 178.386 141.002C172.294 142.663 165.815 143.328 159.501 143.439C141.502 143.771 123.503 143.549 105.503 143.549C104.783 143.66 104.063 143.549 103.343 143.494Z"
                fill="#DD2428"
              />
              <path
                d="M284 1.16113V40.6487C274.53 41.1471 266.61 44.9131 260.574 52.2235C256.088 57.651 253.928 64.0199 253.485 71.2196C252.598 85.2867 263.453 103.286 283.945 104.283V143.272C267.109 144.324 242.408 135.297 227.51 113.476C210.508 88.665 211.449 56.6541 225.572 34.4458C239.196 12.9575 258.801 2.15801 284 1.16113Z"
                fill="#444750"
              />
              <path
                d="M137.957 63.9097H99.245C96.642 54.1625 90.8269 47.1289 82.0211 42.8091C75.6521 39.7077 68.8955 39.32 62.0281 40.8154C49.0133 43.6398 38.6568 57.0977 38.4353 71.3863C38.2138 85.1765 47.9056 98.3575 61.3081 102.013C69.3386 104.173 77.2582 103.342 84.5133 98.9667C91.6022 94.7023 96.4758 88.4994 98.968 80.4136H137.736C136.573 104.671 115.14 137.568 77.6459 142.165C37.6046 147.094 1.99379 116.301 0.110798 75.0416C-1.88296 33.2834 30.4049 -0.499785 71.3877 0.497095C110.432 1.49398 136.296 34.5572 137.957 63.9097Z"
                fill="#444750"
              />
            </g>
            <defs>
              <clipPath id="clip0_468_359">
                <rect
                  width="284"
                  height="143.218"
                  fill="white"
                  transform="translate(0 0.496094)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="block ms-3">
            <span className="block text-gray-800 font-medium text-sm">
              {data?.user?.name}
            </span>
            <span className="block text-gray-500 text-sm">
              cdc.construction
            </span>
          </span>
          <svg
            className="flex-shrink-0 size-3 ms-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </button>
        {/* <!-- End Project Button --> */}

        {/* <!-- Dropdown --> */}
        <div
          className={`${
            isOpen ? "opacity-100 block" : "opacity-0 hidden"
          } transition-[opacity,margin] duration block bg-white rounded-xl z-[80] shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]`}
          style={{
            position: "fixed",
            inset: "auto auto 0px 0px",
            margin: "0px",
            transform: "translate3d(15px,-70px,0px)",
          }}
        >
          <div className="p-1 space-y-0.5">
            {/* <!-- Item --> */}
            <a
              className="py-2 block w-full text-start bg-gray-100 hover:bg-gray-200 rounded-lg px-2 focus:outline-none focus:bg-gray-100"
              href="#"
            >
              <div className="flex gap-x-2">
                <div className="self-center">
                  <svg
                    className="flex-shrink-0 items-center text-gray-500 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                  </svg>
                </div>
                <div className=" self-center -ms-1">
                  <svg
                    className="flex-shrink-0 items-center size-8"
                    width="284"
                    height="144"
                    viewBox="0 0 284 144"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_468_359)">
                      <path
                        d="M103.343 143.494C111.263 138.787 118.629 133.525 124.832 126.824C130.979 120.234 136.13 112.812 139.84 104.228C140.893 104.173 141.945 104.062 142.942 104.007C149.975 103.896 157.064 104.339 164.042 103.563C182.042 101.625 194.447 83.349 190.404 65.2943C187.303 51.5596 174.897 41.0369 161.162 40.7046C154.406 40.5385 147.705 40.6493 140.726 40.6493C133.527 23.9238 122.173 11.0198 106.279 1.71555C107.22 1.49402 107.608 1.32788 107.995 1.32788C126.77 1.32788 145.489 0.829436 164.208 1.49402C183.094 2.15861 198.933 10.4659 211.726 24.8099C213.942 27.3021 215.88 30.0713 217.985 32.6742C211.173 45.1906 207.517 58.15 207.517 72.2725C207.517 86.395 211.062 99.3544 218.04 112.092C215.437 115.305 212.834 118.683 210.01 121.784C201.315 131.31 190.57 137.679 178.386 141.002C172.294 142.663 165.815 143.328 159.501 143.439C141.502 143.771 123.503 143.549 105.503 143.549C104.783 143.66 104.063 143.549 103.343 143.494Z"
                        fill="#DD2428"
                      />
                      <path
                        d="M284 1.16113V40.6487C274.53 41.1471 266.61 44.9131 260.574 52.2235C256.088 57.651 253.928 64.0199 253.485 71.2196C252.598 85.2867 263.453 103.286 283.945 104.283V143.272C267.109 144.324 242.408 135.297 227.51 113.476C210.508 88.665 211.449 56.6541 225.572 34.4458C239.196 12.9575 258.801 2.15801 284 1.16113Z"
                        fill="#444750"
                      />
                      <path
                        d="M137.957 63.9097H99.245C96.642 54.1625 90.8269 47.1289 82.0211 42.8091C75.6521 39.7077 68.8955 39.32 62.0281 40.8154C49.0133 43.6398 38.6568 57.0977 38.4353 71.3863C38.2138 85.1765 47.9056 98.3575 61.3081 102.013C69.3386 104.173 77.2582 103.342 84.5133 98.9667C91.6022 94.7023 96.4758 88.4994 98.968 80.4136H137.736C136.573 104.671 115.14 137.568 77.6459 142.165C37.6046 147.094 1.99379 116.301 0.110798 75.0416C-1.88296 33.2834 30.4049 -0.499785 71.3877 0.497095C110.432 1.49398 136.296 34.5572 137.957 63.9097Z"
                        fill="#444750"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_468_359">
                        <rect
                          width="284"
                          height="143.218"
                          fill="white"
                          transform="translate(0 0.496094)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className="grow">
                  <p className="text-sm text-gray-800 font-medium">
                    {data?.user?.role.toLowerCase() || "Admin"}
                  </p>
                  <p className="text-sm text-gray-500 ">cdc.construction</p>
                </div>
                <div className="ms-auto self-center">
                  <svg
                    className="flex-shrink-0 text-gray-800 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </a>
            {/* <!-- End Item --> */}
          </div>

          <div className="p-1 border-gray-200 border-t">
            <button
              type="button"
              className="w-full flex items-center hover:bg-gray-200 text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Add another project
            </button>
          </div>

          <div className="p-1 border-gray-200 border-t">
            <button
              type="button"
              className="w-full flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-2 hover:bg-gray-200"
            >
              Sign out
              <span className="ms-auto text-gray-500 text-xs">
                {data?.user?.email}
              </span>
            </button>
          </div>
        </div>
        {/* <!-- End Dropdown --> */}
      </div>
      {/* <!-- End Project Dropdown --> */}
    </footer>
  );
};

const AccountDropdown = () => {
  return (
    <div className="h-[38px]">
      <div className=" relative inline-flex top-0 right-0 [--strategy:absolute] [--auto-close:inside] open ">
        <div
          class="bg-white block rounded-xl w-60 z-10  transition-[opacity,margin] duration opacity-100 shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)]"
          aria-labelledby="hs-pro-dnad"
          style={{ position: "absolute", margin: "0px" }}
        >
          <div class="p-1 border-gray-200  border-b ">
            <a
              class="py-2 text-gray-800 text-sm px-3 rounded-lg gap-x-3 flex items-center"
              href="#"
            >
              <img
                class="flex-shrink-0 size-8 rounded-full"
                src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=320&amp;h=320&amp;q=80"
                alt="Image Description"
              />

              <div class="grow">
                <span class="text-sm text-gray-800 font-semibold">
                  James Collison
                </span>
                <p class="text-xs text-gray-500 ">Preline@HS</p>
              </div>
            </a>
          </div>
          <div class="p-1">
            <a
              class="hover:bg-gray-100 flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3"
              href="#"
            >
              <svg
                class="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
              Billing
            </a>
            <a
              class="hover:bg-gray-100 flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3"
              href="#"
            >
              <svg
                class="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Settings
            </a>
            <a
              class="hover:bg-gray-100 flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3"
              href="#"
            >
              <svg
                class="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              My account
            </a>
          </div>
          <div class="px-4 border-gray-200 border-y py-[0.875rem]">
            {/* <!-- Switch/Toggle --> */}
            <div class="flex items-center justify-between">
              <label for="hs-pro-dnads" class="text-sm text-gray-800">
                Dark mode
              </label>
              <div class="relative inline-block">
                <input
                  data-hs-theme-switch=""
                  type="checkbox"
                  id="hs-pro-dnads"
                  class="relative cursor-pointer transition duration-200 bg-gray-100 border-transparent rounded-full  w-11 h-6  focus:ring-blue-600 checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 checked:before:bg-white uim48 checked:before:translate-x-full"
                />
              </div>
            </div>
            {/* <!-- End Switch/Toggle --> */}
          </div>
          <div class="p-1">
            <a
              class="group hover:bg-gray-100 flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3 focus:outline-none focus:bg-gray-100"
              href="#"
            >
              Customization
              <div class="ms-auto">
                <span class="ms-auto items-center font-medium text-[10px] group-hover:bg-gray-800 group-hover:text-white text-gray-800 leading-4 py-px px-[0.375rem] bg-gray-100 rounded-[0.25rem] gap-x-[0.375rem] inline-flex ">
                  New
                </span>
              </div>
            </a>
            <a
              class="hover:bg-gray-100 flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3 focus:outline-none focus:bg-gray-100"
              href="#"
            >
              Manage team
            </a>
            <a
              class=" hover:bg-gray-100 flex items-center text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3 focus:outline-none focus:bg-gray-100"
              href="#"
            >
              Sign out
            </a>
          </div>
          <div class="p-1 border-gray-200 border-t">
            <button
              type="button"
              class="hover:bg-gray-100 flex w-full text-gray-800 text-sm py-2 px-3 rounded-lg gap-x-3 mt-[0.125rem] focus:outline-none focus:bg-gray-100"
              data-hs-overlay="#hs-pro-dasadam"
            >
              <svg
                class="flex-shrink-0 size-4 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Add team account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Every whare we can use with drawer and model
const EmployeeCard = ({ employeeData }) => {
  return (
    <div className="w-full h-full sm:p-5 p-3 max-w-96 mx-auto">
      {/* <!-- Header --> */}
      <div className="flex items-center justify-center flex-col text-center">
        <div className="flex-shrink-0 size-16 rounded-full text-center flex justify-center items-center bg-gray-200">
          <span className="text-lg font-semibold text-gray-800">
            {employeeData?.firstName?.split("")[0] ??
              employeeData?.name?.split("")[0] ??
              "J"}
            {employeeData?.lastName?.split("")[0] || ""}
          </span>
        </div>

        {/* <img
          class="flex-shrink-0 size-16 rounded-full"
          src="https://images.unsplash.com/photo-1570654639102-bdd95efeca7a?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=2.5&amp;w=320&amp;h=320&amp;q=80"
          alt="Image Description"
        /> */}
        <div class="mt-2">
          <h3 class="text-lg text-gray-800 font-semibold">
            {employeeData?.firstName ?? employeeData?.name ?? "Jhone"}
            {employeeData?.lastName || ""}
          </h3>
          <p class="text-xs text-gray-500">
            {changeDateToString(employeeData?.startDate) || "Mar 23, 2024"}
          </p>
        </div>
      </div>
      {/* <!-- End Header --> */}

      {/* <!-- List Group --> */}
      <ul className="mt-5">
        {/* <!-- List Item --> */}
        <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
          <div className="col-span-1">
            <h4 className="text-sm text-gray-500">User ID:</h4>
          </div>
          <div className="col-span-2">
            <p>
              <a
                class="text-sm font-medium decoration-2 text-teal-600 focus:outline-none focus:underline dark:hover:text-teal-500"
                href="#"
              >
                {`# ${employeeData?._id || "EMP001"}`}
              </a>
            </p>
          </div>
        </li>
        {/* <!-- End List Item --> */}

        {/* <!-- List Item --> */}
        <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
          <div className="col-span-1">
            <h4 className="text-sm text-gray-500">Email:</h4>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-800">
              {employeeData?.email || "doe@site.com"}
            </p>
          </div>
        </li>
        {/* <!-- End List Item --> */}

        {/* <!-- List Item --> */}
        <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
          <div className="col-span-1">
            <h4 className="text-sm text-gray-500">Phone:</h4>
          </div>
          <div className="col-span-2">
            <div className="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 64 64"
                className="flex-shrink-0 size-4 rounded-full"
              >
                <path
                  fill="#2a5f9e"
                  d="M22 60.3V46.5l-10.3 7.6c2.9 2.7 6.4 4.8 10.3 6.2m20 0c3.9-1.4 7.4-3.5 10.3-6.2L42 46.4zM3.7 42c.3 1 .7 1.9 1.2 2.9L8.8 42zm51.5 0l3.9 2.9c.4-.9.8-1.9 1.2-2.9z"
                ></path>
                <path
                  fill="#fff"
                  d="M23.5 38H2.6c.3 1.4.7 2.7 1.1 4h5.1l-3.9 2.9c.8 1.7 1.7 3.2 2.8 4.7L18 42h4v2l-11.7 8.6l1.4 1.4L22 46.5v13.8c1.3.5 2.6.8 4 1.1V38zm37.9 0H38v23.4c1.4-.3 2.7-.7 4-1.1V46.5L52.3 54c1.4-1.3 2.6-2.7 3.8-4.2L45.4 42h6.8l6.1 4.5c.3-.5.6-1.1.8-1.6L55.2 42h5.1c.4-1.3.8-2.6 1.1-4"
                ></path>
                <path
                  fill="#ed4c5c"
                  d="M7.7 49.6c.8 1.1 1.6 2.1 2.5 3.1L22 44.1v-2h-4zM45.5 42l10.7 7.8c.4-.5.7-1 1.1-1.5c.1-.1.1-.2.2-.2c.3-.5.7-1.1 1-1.6L52.2 42z"
                ></path>
                <path
                  fill="#2a5f9e"
                  d="M42 3.7v13.8l10.3-7.6C49.4 7.2 45.9 5.1 42 3.7m-20 0c-3.9 1.4-7.4 3.5-10.3 6.2L22 17.6zM60.3 22c-.3-1-.7-1.9-1.2-2.9L55.2 22zM8.8 22l-3.9-2.9c-.4 1-.8 1.9-1.2 2.9z"
                ></path>
                <path
                  fill="#fff"
                  d="M40.5 26h20.8c-.3-1.4-.7-2.7-1.1-4h-5.1l3.9-2.9c-.8-1.7-1.7-3.2-2.8-4.7L46 22h-4v-2l11.7-8.6l-1.4-1.4L42 17.5V3.7c-1.3-.5-2.6-.8-4-1.1V26zM2.6 26H26V2.6c-1.4.3-2.7.7-4 1.1v13.8L11.7 10c-1.4 1.3-2.6 2.7-3.8 4.2L18.6 22h-6.8l-6.1-4.5c-.3.5-.6 1.1-.8 1.6L8.8 22H3.7c-.4 1.3-.8 2.6-1.1 4"
                ></path>
                <g fill="#ed4c5c">
                  <path d="M56.3 14.4c-.8-1.1-1.6-2.1-2.5-3.1L42 19.9v2h4zM18.5 22L7.9 14.2c-.4.5-.7 1-1.1 1.5c-.1.1-.1.2-.2.2c-.3.5-.7 1.1-1 1.6l6.1 4.5z"></path>
                  <path d="M61.4 26H38V2.6c-1.9-.4-3.9-.6-6-.6s-4.1.2-6 .6V26H2.6c-.4 1.9-.6 3.9-.6 6s.2 4.1.6 6H26v23.4c1.9.4 3.9.6 6 .6s4.1-.2 6-.6V38h23.4c.4-1.9.6-3.9.6-6s-.2-4.1-.6-6"></path>
                </g>
              </svg>

              <span class="text-sm text-gray-800">
                {employeeData?.phone || "9876543210"}
              </span>
            </div>
          </div>
        </li>
        {/* <!-- End List Item --> */}

        {/* <!-- List Item --> only for employee not office */}
        {employeeData?.eAddress && (
          <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
            <div className="col-span-1">
              <h4 className="text-sm text-gray-500">Address:</h4>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-800">
                {employeeData?.eAddress
                  ? employeeData?.eAddress?.address +
                    "," +
                    employeeData?.eAddress?.city +
                    "," +
                    employeeData?.eAddress?.zipCode +
                    "," +
                    employeeData?.eAddress?.country
                  : "4970 Park Ave W, Ohio, 44723, Untied States"}
              </p>
            </div>
          </li>
        )}
        {employeeData?.employeType && (
          <>
            <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
              <div className="col-span-1">
                <h4 className="text-sm text-gray-500">Employe Type</h4>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-800">
                  {employeeData?.employeType ?? "Employe Type"}
                </p>
              </div>
            </li>
            <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
              <div className="col-span-1">
                <h4 className="text-sm text-gray-500">Payment Type</h4>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-800">
                  {employeeData?.paymentType ?? "Payment Type"}
                </p>
              </div>
            </li>
            <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
              <div className="col-span-1">
                <h4 className="text-sm text-gray-500">PayRate</h4>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-800">
                  {`£ ${employeeData?.payRate ?? "0.00"}`}
                </p>
              </div>
            </li>
          </>
        )}
        {employeeData?.roleType && (
          <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
            <div className="col-span-1">
              <h4 className="text-sm text-gray-500">Role Type</h4>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-800">
                {employeeData.roleType?.roleTitle ?? "Office Employe Type"}
              </p>
            </div>
          </li>
        )}
        {/* <!-- List Item --> */}
        <li className="py-4 border-t border-gray-200 gap-x-4 grid-cols-3 grid">
          <div className="col-span-1">
            <h4 className="text-sm text-gray-500">Signed up as:</h4>
          </div>
          <div className="col-span-2">
            {employeeData?.isActive ? (
              <span className="py-1.5 items-center text-teal-800 font-medium text-xs ps-[0.375rem] pe-[0.625rem] bg-teal-100 rounded-full gap-x-1 inline-flex ">
                <svg
                  className="w-3 h-3"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
                </svg>
                Active account
              </span>
            ) : (
              <span className="py-1.5 items-center text-red-800 font-medium text-xs ps-[0.375rem] pe-[0.625rem] bg-red-100 rounded-full gap-x-1 inline-flex ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Inactive account
              </span>
            )}
          </div>
        </li>
        {/* <!-- End List Item --> */}
      </ul>
      {/* <!-- End List Group --> */}
    </div>
  );
};

const OpenModelButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div class="py-16 text-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          class=" shadow-sm text-white font-medium text-sm align-middle text-start p-2 bg-teal-600 border rounded-lg gap-x-2 items-center inline-flex "
          data-hs-overlay="#hs-pro-deum"
        >
          Open modal
        </button>
      </div>
      {/* Modal Content */}
      {/* <EmployeeModelCard
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
      /> */}
      <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const Modal = ({ isOpen, onRequestClose }) => {
  return (
    <div
      id="hs-modal-upgrade-to-pro"
      class={`hs-overlay ${
        isOpen ? "block shadow-2xl bg-gray-800/70 transition-all" : "hidden"
      } size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto`}
    >
      <div
        class={`duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto ${
          isOpen
            ? "mt-7 opacity-100 duration-500"
            : "duration-500 opacity-0 mt-0"
        }`}
      >
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm pointer-events-auto dark:bg-gray-800 dark:border-gray-700">
          <div class="p-4 sm:p-7">
            <div class="text-center">
              <h2 class="block text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Advanced features
              </h2>
              <div class="max-w-sm mx-auto">
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  "Compare to" Price, Bulk Discount Pricing, Inventory Tracking
                  <a
                    class="text-blue-600 decoration-2 hover:underline font-medium"
                    href="../examples/html/modal-signup.html"
                  >
                    Sign up here
                  </a>
                </p>
              </div>
              <div class="mt-5">
                <a
                  class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  href="#"
                >
                  <svg
                    class="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                  Upgrade to get these features
                </a>
              </div>
            </div>

            <div class="mt-8 sm:mt-10 divide-y divide-gray-200 dark:divide-gray-700">
              {/* <!-- Icon --> */}
              <div class="flex gap-x-7 py-5 first:pt-0 last:pb-0">
                <svg
                  class="flex-shrink-0 mt-1 size-7 text-gray-600 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>

                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                    "Compare to" price
                  </h3>
                  <p class="text-sm text-gray-500">
                    Use this feature when you want to put a product on sale or
                    show savings off suggested retail pricing.
                  </p>
                </div>
              </div>
              {/* <!-- End Icon --> */}

              {/* <!-- Icon --> */}
              <div class="flex gap-x-7 py-5 first:pt-0 last:pb-0">
                <svg
                  class="flex-shrink-0 mt-1 size-7 text-gray-600 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="6" cy="6" r="3" />
                  <path d="M8.12 8.12 12 12" />
                  <path d="M20 4 8.12 15.88" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M14.8 14.8 20 20" />
                </svg>

                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                    Bulk discount pricing
                  </h3>
                  <p class="text-sm text-gray-500">
                    Encourage higher purchase quantities with volume discounts.
                  </p>
                </div>
              </div>
              {/* <!-- End Icon --> */}

              {/* <!-- Icon --> */}
              <div class="flex gap-x-7 py-5 first:pt-0 last:pb-0">
                <svg
                  class="flex-shrink-0 mt-1 size-7 text-gray-600 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>

                <div>
                  <h3 class="font-semibold text-gray-800 dark:text-gray-200">
                    Inventory tracking
                  </h3>
                  <p class="text-sm text-gray-500">
                    Automatically keep track of product availability and receive
                    notifications when inventory levels get low.
                  </p>
                </div>
              </div>
              {/* <!-- End Icon --> */}
            </div>
          </div>

          {/* <!-- Footer --> */}
          <div class="flex justify-end items-center gap-x-2 p-4 sm:px-7 border-t dark:border-gray-700">
            <button
              onClick={() => onRequestClose()}
              type="button"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-notifications"
            >
              Cancel
            </button>
            <a
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            >
              Upgrade now
            </a>
          </div>
          {/* <!-- End Footer --> */}
        </div>
      </div>
    </div>
  );
};

const DeleteAccount = ({ isOpen, onRequestClose }) => {
  return (
    <div
      id="hs-modal-upgrade-to-pro"
      class={`hs-overlay ${
        isOpen ? "block shadow-2xl bg-gray-800/70 transition-all" : "hidden"
      } size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto`}
    >
      <div
        class={`duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto ${
          isOpen
            ? "mt-7 opacity-100 duration-500"
            : "duration-500 opacity-0 mt-0"
        }`}
      >
        <div class="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div onClick={onRequestClose} class="absolute top-2 end-2">
            <button
              type="button"
              class="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-danger-alert"
            >
              <span class="sr-only">Close</span>
              <svg
                class="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div class="p-4 sm:p-10 overflow-y-auto">
            <div class="flex gap-x-4 md:gap-x-7">
              {/* <!-- Icon --> */}
              <span class="flex-shrink-0 inline-flex justify-center items-center size-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                <svg
                  class="flex-shrink-0 size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </span>
              {/* <!-- End Icon --> */}

              <div class="grow">
                <h3 class="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                  Delete Personal Account
                </h3>
                <p class="text-gray-500">
                  Permanently remove your Personal Account and all of its
                  contents from the Vercel platform. This action is not
                  reversible, so please continue with caution.
                </p>
              </div>
            </div>
          </div>

          <div class="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
            <button
              onClick={onRequestClose}
              type="button"
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-danger-alert"
            >
              Cancel
            </button>
            <a
              class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            >
              Delete personal account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Use for Edit and Add This is only just model card just pop we have pass children  to this component
export const EmployeeModelCard = ({
  isOpen,
  cls,
  onRequestClose,
  children,
}) => {
  return (
    <div
      id="hs-modal-upgrade-to-pro"
      className={`${
        isOpen ? "block shadow-2xl bg-gray-800/70 transition-all" : "hidden"
      } size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto`}
    >
      <div
        className={`duration-500 ease-out transition-all ${
          cls ? cls : "sm:max-w-lg"
        } sm:w-full m-3 sm:mx-auto ${
          isOpen
            ? "mt-7 opacity-100 duration-500"
            : "duration-500 opacity-0 mt-0"
        }`}
      >
        <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden">
          <div onClick={onRequestClose} className="absolute top-2 end-2">
            <button
              type="button"
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 bg-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
              data-hs-overlay="#hs-danger-alert"
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          {children}
          {/* <EmployeeCard employeeData={data} /> */}
        </div>
      </div>
    </div>
  );
};

// Right side bar with only view one particular  Employee's information
export const SideDrawer = ({ isOpen, onRequestClose, data, btnEdit }) => {
  return (
    <div
      id="hs-pro-dutoo"
      className={`fixed w-full sm:max-w-md duration-300 transition-all bg-white border-s flex-col z-[80] end-0  h-full top-0 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      {/* <!-- Header --> */}
      <div className="absolute end-4 top-3 z-10">
        <button
          onClick={onRequestClose}
          type="button"
          className="size-8 text-gray-800 bg-gray-100 border-transparent items-center border rounded-full gap-x-2 justify-center inline-flex"
        >
          <span className="sr-only">Close offcanvas</span>
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      {/* <!-- End Header --> */}

      {/* <!-- Content --> */}
      <div className="h-full flex overflow-y-auto overflow-hidden flex-col dark:[&amp;::-webkit-scrollbar-track]:bg-neutral-700 dark:[&amp;::-webkit-scrollbar-thumb]:bg-neutral-500">
        <EmployeeCard employeeData={data} />
        {/* <!-- Footer --> */}
        <div className="p-5 bg-white border-gray-200 border-t">
          <div className="flex items-center gap-x-2">
            {/* <!-- Button --> */}
            <button
              onClick={btnEdit}
              type="button"
              className="font-semibold text-sm px-3 bg-cyan-600 py-2 border-transparent border rounded-lg gap-x-2 w-full inline-flex items-center justify-center focus:outline-none "
            >
              <svg
                className="hidden sm:block flex-shrink-0 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              Edit user
            </button>
            {/* <!-- End Button --> */}

            {/* <!-- Button --> */}
            <button
              type="button"
              className="py-2 w-full items-center focus:outline-none shadow-sm text-gray-800 font-medium text-sm px-3 bg-white border rounded-lg gap-x-2 justify-center inline-flex focus:bg-gray-50 "
            >
              <svg
                className="hidden sm:block flex-shrink-0 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" x2="10" y1="11" y2="17"></line>
                <line x1="14" x2="14" y1="11" y2="17"></line>
              </svg>
              Delete
            </button>
            {/* <!-- End Button --> */}
          </div>
        </div>
        {/* <!-- End Footer --> */}
      </div>
      {/* <!-- End Content --> */}
    </div>
  );
};

export const Cards = ({
  href,
  title,
  subtitle,
  number,
  supportIcon,
  icon,
  supportText,
}) => {
  return (
    <>
      {href && (
        <a
          className="group hover:shadow-lg hover:-translate-y-1 shadow-sm p-4 bg-white border-stone-200 border rounded-xl  focus:outline-none focus:shadow-lg focus:-translate-y-0.5 transition"
          href={href}
        >
          <div className="flex gap-x-3">
            <div className="grow">
              <h2 className="text-xs text-gray-600">{title}</h2>
              <p className="text-xl font-semibold text-gray-800">{number}</p>
            </div>
            {icon}
            {/* <CalendarDaysIcon className="flex-shrink-0 size-6 text-gray-600" /> */}
          </div>
          <span className="mt-3 items-center text-teal-600 font-medium text-sm gap-x-1 inline-flex">
            {subtitle}
            {supportIcon}
            {/* <ChevronRightIcon className="flex-shrink-0 size-4 stroke-2" /> */}
          </span>
        </a>
      )}
      {!href && (
        <div className="cursor-pointer p-4 group hover:shadow-lg hover:-translate-y-1 sm:p-5 shadow-sm focus:outline-none focus:shadow-lg focus:-translate-y-0.5 transition bg-white border-gray-200 border rounded-xl">
          <div className="sm:flex sm:gap-x-3">
            {icon}
            {/* <BuildingStorefrontIcon className="sm:order-2 sm:mb-0  text-gray-400 flex-shrink-0 size-6" /> */}
            <div className="sm:order-1 grow space-y-1">
              <h2 className="sm:mb-3 text-gray-600 text-sm">{title}</h2>
              <p className="text-lg space-y-1 md:text-xl font-semibold text-stone-800">
                {number}
              </p>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            <span className="text-sm text-gray-500 leading-5">{subtitle}</span>
            <span className="inline-flex items-center text-green-500 font-medium text-xs gap-x-1 rounded-full">
              {supportIcon}
              {/* <ArrowTrendingUpIcon className="flex-shrink-0 size-4 stroke-2" /> */}
              {supportText}
            </span>
          </div>
        </div>
      )}
      {/* <!-- End Card --> */}

      {/* <!-- Card --> */}
      {/* <div className="cursor-pointer p-4 group hover:shadow-lg hover:-translate-y-1 sm:p-5 shadow-sm focus:outline-none focus:shadow-lg focus:-translate-y-0.5 transition bg-white border-gray-200 border rounded-xl">
        <div className="sm:flex sm:gap-x-3">
          <GlobeAltIcon className="sm:order-2 sm:mb-0 text-gray-400 flex-shrink-0 size-6" />

          <div className="sm:order-1 grow space-y-1">
            <h2 className="sm:mb-3 text-gray-600 text-sm">CIS Expense</h2>
            <p className="text-lg space-y-1 md:text-x font-semibold text-gray-800">
              £7,820.75
            </p>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-x-2">
          <span className="text-sm text-gray-500 leading-5">Weekly</span>
          <span className="inline-flex items-center text-green-500 font-medium text-xs gap-x-1 rounded-full">
            <ArrowTrendingUpIcon className="flex-shrink-0 size-4 stroke-2" />
            4.3%
          </span>
        </div>
      </div> */}
      {/* <!-- End Card --> */}

      {/* <!-- Card --> */}
      {/* <div className=" cursor-pointer p-4 group hover:shadow-lg hover:-translate-y-1 sm:p-5 shadow-sm focus:outline-none focus:shadow-lg focus:-translate-y-0.5 transition bg-white border-gray-200 border rounded-xl">
        <div className="sm:flex sm:gap-x-3">
          <BriefcaseIcon className="sm:order-2 sm:mb-0 text-gray-400 flex-shrink-0 size-6" />

          <div className="sm:order-1 grow space-y-1">
            <h2 className="sm:mb-3 text-gray-600 text-sm">Office Expense</h2>
            <p className="text-lg space-y-1 md:text-xl font-semibold text-gray-800">
              £7,820.75
            </p>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-x-2">
          <span className="text-sm text-gray-500 leading-5">Weekly</span>
          <span className="inline-flex items-center text-red-500 font-medium text-xs gap-x-1 rounded-full">
            <ArrowTrendingDownIcon className="flex-shrink-0 size-4 stroke-2" />
            4.4%
          </span>
        </div>
      </div> */}
      {/* <!-- End Card --> */}
      {/* <a
        className="group hover:shadow-lg hover:-translate-y-1 shadow-sm p-4 bg-white border-stone-200 border rounded-xl  focus:outline-none focus:shadow-lg focus:-translate-y-0.5 transition"
        href="#"
      >
        <div className="flex gap-x-3">
          <div className="grow">
            <h2 className="text-xs text-gray-600">Total hours (7D)</h2>
            <p className="text-xl font-semibold text-gray-800">38h 9m</p>
          </div>
          <CalendarDaysIcon className="flex-shrink-0 size-6 text-gray-600" />
        </div>
        <span className="mt-3 items-center text-teal-600 font-medium text-sm gap-x-1 inline-flex">
          View reports
          <ChevronRightIcon className="flex-shrink-0 size-4 stroke-2" />
        </span>
      </a> */}
    </>
  );
};

const EmployeProfile = () => {
  return (
    <div className="relative p-5 bg-white rounded-lg shadow-md before:content-[''] xl:before:h-60 before:bg-gray-800 before:w-full before:-z-10 before:top-0 before:start-0 before:absolute">
      <div className="xl:px-0 sm:px-5 px-2 max-w-5xl mx-auto">
        {/* <!-- Header --> */}
        <div className="flex xl:pt-10 sm:items-center pt-4 gap-5">
          <span className="flex items-center bg-gray-200 size-16 rounded-3xl text-gray-800 sm:text-2xl text-sm font-semibold sm:size-20 justify-center">
            AH
          </span>
          {/* <img
            className="sm:size-20 rounded-3xl flex-shrink-0 size-16"
            src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=320&amp;h=320&amp;q=80"
            alt="Image Description"
          /> */}

          <div className="grow">
            <h1 className="md:text-3xl text-gray-800 font-semibold text-2xl">
              Amanda Harvey
            </h1>

            {/* <!-- List --> */}
            <ul className="flex flex-wrap items-center gap-x-3 mt-2 ">
              <li className="relative flex items-center justify-center gap-x-2 before:content-['•'] before:text-gray-600">
                <span className="text-gray-500 text-sm font-medium">
                  EmployeType:
                </span>
                <span className="text-gray-600 text-sm font-semibold">
                  Payroll
                </span>
              </li>

              <li className="relative flex items-center justify-center gap-x-2 before:content-['•'] before:text-gray-600">
                <span className="text-gray-500 text-sm font-medium">
                  PaymentType:
                </span>
                <span className="text-gray-600 text-sm font-semibold">
                  Monthly
                </span>
              </li>

              <li className="relative flex items-center justify-center gap-x-2 before:content-['•'] before:text-gray-600">
                <span className="text-gray-500 text-sm font-medium">
                  Phone:
                </span>
                <span className="text-gray-600 text-sm font-semibold">
                  +44 1234567890
                </span>
              </li>
            </ul>
            {/* <!-- End List --> */}
          </div>
        </div>
        {/* <!-- End Header --> */}

        {/* <!-- Stats Grid --> */}
        <div className=" md:mt-8 mt-5">
          <InfoCard />
        </div>
        {/* <!-- End Stats Grid --> */}
        {/* <CostCard /> */}
      </div>
    </div>
  );
};

const InfoCard = () => {
  return (
    // <div className="grid lg:grid-cols-4 md:gap-3 grid-cols-2 lg:gap-5 gap-2">
    <div className="grid lg:grid-cols-4 md:gap-3 grid-cols-2 lg:gap-5 gap-2">
      <Cards
        title={"Payroll Expense"}
        icon={
          <BuildingStorefrontIcon className="sm:order-2 sm:mb-0  text-gray-400 flex-shrink-0 size-6" />
        }
        number={"£7,810.75"}
        subtitle={"Total Pay"}
      />
      <Cards
        title={"Hours"}
        icon={
          <BriefcaseIcon className="sm:order-2 sm:mb-0  text-gray-400 flex-shrink-0 size-6" />
        }
        number={"~278.59"}
        subtitle={"Hours"}
      />
    </div>
  );
};

const CostCard = () => {
  return (
    <div class="relative flex lg:col-span-3 md:col-span-4 bg-white border-gray-200 border rounded-xl flex-col  ">
      <div class="pt-[0.625rem] px-4">
        <h2 class="text-gray-800 font-semibold">Total costs</h2>
      </div>
      {/* <!-- Body --> */}
      <div class="p-[0.375rem] flex h-full flex-col">
        <div class="p-[0.625rem]">
          <h4 class="md:text-2xl text-gray-800 text-xl">£7,800</h4>

          {/* <!-- Progress --> */}
          <div class="relative mt-3">
            <div
              class="flex w-full bg-gray-200 rounded-full overflow-hidden h-2"
              role="progressbar"
              aria-valuenow="2"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                class="flex transition duration-500 text-white text-xs bg-teal-500 text-center rounded-full whitespace-nowrap overflow-hidden justify-center flex-col "
                style={{ width: "72%" }}
              ></div>
            </div>
            <div class="absolute -translate-y-1/2 bg-teal-500 border-white border-2 rounded-full transform w-2 h-5 top-1/2 start-3/4 "></div>
          </div>
          {/* <!-- End Progress --> */}

          <p class="text-gray-600 text-sm mt-4">
            A project-wise breakdown of total spendings complemented by detailed
            insights.
          </p>
        </div>
      </div>
      {/* <!-- End Body --> */}
    </div>
  );
};

const SiteCard = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 justify-center mt-10 mb-4 ">
      <div>
        <h2 className="sm:text-xl text-gray-800 font-semibold ">Projects</h2>
      </div>
      {/* <!-- End Col --> */}

      <div className="flex items-center flex-wrap gap-x-1 justify-end ">
        {/* <!-- Select --> */}
        <div className="relative flex items-center">
          <span className="suxxq dtjcu fyxhw dark:text-neutral-500">
            Status:
          </span>
          <div className="hs-select relative">
            <select
              data-hs-select='{
                "placeholder": "Status",
                "toggleTag": "<button type=\"button\"></button>",
                "toggleClasses": "msicw n7tpi relative npcr1 up4xi v2aly pqrvw wlxy3 pdrgo items-center pla0f l66z3 yj6bp dtjcu v7056 nq4w8 zvbcs p5a84 focus:outline-none focus:bg-gray-100 kw6wr s920d bxof7 dark:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus:bg-neutral-800",
                "dropdownClasses": "dy90t l2ej6 dpnc4 xy3is s269j pqpl9 f0dty k3u76 shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                "optionClasses": "qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                "optionTemplate": "<div class=\"flex azaj8 items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div>"
              }'
              className="hidden"
              style={{ display: "none" }}
            >
              <option value="">Choose</option>
              <option selected="">All</option>
              <option>Active</option>
              <option>Completed</option>
              <option>On Hold</option>
              <option>No status</option>
            </select>
            <button
              type="button"
              className="msicw n7tpi relative npcr1 up4xi v2aly pqrvw wlxy3 pdrgo items-center pla0f l66z3 yj6bp dtjcu v7056 nq4w8 zvbcs p5a84 focus:outline-none focus:bg-gray-100 kw6wr s920d bxof7 dark:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus:bg-neutral-800"
            >
              <span class="truncate">All</span>
            </button>
            <div
              class="absolute dy90t l2ej6 dpnc4 xy3is s269j pqpl9 f0dty k3u76 shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950 hidden"
              style=""
            >
              <div
                data-value="All"
                data-title-value="All"
                tabindex="0"
                class="cursor-pointer selected qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <div class="flex azaj8 items-center w-full">
                  <span data-title="">All</span>
                  <span class="hidden hs-selected:block">
                    <svg
                      className="wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                data-value="Active"
                data-title-value="Active"
                tabindex="1"
                className="cursor-pointer qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <div className="flex azaj8 items-center w-full">
                  <span data-title="">Active</span>
                  <span className="hidden hs-selected:block">
                    <svg
                      className="wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                data-value="Completed"
                data-title-value="Completed"
                tabindex="2"
                className="cursor-pointer qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <div className="flex azaj8 items-center w-full">
                  <span data-title="">Completed</span>
                  <span className="hidden hs-selected:block">
                    <svg
                      className="wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                data-value="On Hold"
                data-title-value="On Hold"
                tabindex="3"
                className="cursor-pointer qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <div className="flex azaj8 items-center w-full">
                  <span data-title="">On Hold</span>
                  <span className="hidden hs-selected:block">
                    <svg
                      class="wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                data-value="No status"
                data-title-value="No status"
                tabindex="4"
                class="cursor-pointer qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <div class="flex azaj8 items-center w-full">
                  <span data-title="">No status</span>
                  <span class="hidden hs-selected:block">
                    <svg
                      class="wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute ikyla uy5ft -translate-y-1/2">
            <svg
              className="wlxy3 xtsb0 f5cx3 k97e9 dark:text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
        {/* <!-- End Select --> */}

        {/* <!-- Select --> */}
        <div className="relative flex items-center">
          <span className="suxxq dtjcu fyxhw dark:text-neutral-500">Sort:</span>
          <div className="hs-select relative">
            <select
              data-hs-select='{
                "placeholder": "Sort",
                "toggleTag": "<button type=\"button\"></button>",
                "toggleClasses": "msicw n7tpi relative npcr1 up4xi v2aly pqrvw wlxy3 pdrgo items-center pla0f l66z3 yj6bp dtjcu v7056 nq4w8 zvbcs p5a84 focus:outline-none focus:bg-gray-100 kw6wr s920d bxof7 dark:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus:bg-neutral-800",
                "dropdownClasses": "dy90t l2ej6 dpnc4 xy3is s269j dkblq f0dty k3u76 shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950",
                "optionClasses": "qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                "optionTemplate": "<div class=\"flex azaj8 items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div>"
              }'
              className="hidden"
              style="display: none;"
            >
              <option value="">Choose</option>
              <option selected="">Newest</option>
              <option>Oldest</option>
            </select>
            <button
              type="button"
              className="msicw n7tpi relative npcr1 up4xi v2aly pqrvw wlxy3 pdrgo items-center pla0f l66z3 yj6bp dtjcu v7056 nq4w8 zvbcs p5a84 focus:outline-none focus:bg-gray-100 kw6wr s920d bxof7 dark:text-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 dark:focus:bg-neutral-800"
            >
              <span class="truncate">Newest</span>
            </button>
            <div
              class="absolute dy90t l2ej6 dpnc4 xy3is s269j dkblq f0dty k3u76 shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-950 hidden"
              // style="
            >
              <div
                data-value="Newest"
                data-title-value="Newest"
                tabindex="0"
                class="cursor-pointer selected qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <div class="flex azaj8 items-center w-full">
                  <span data-title="">Newest</span>
                  <span class="hidden hs-selected:block">
                    <svg
                      class="wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div
                data-value="Oldest"
                data-title-value="Oldest"
                tabindex="1"
                class="cursor-pointer qjlhn dark:hs-selected:bg-neutral-800 flex ukt6v zdxcz grnyh ldcb4 v7056 zvbcs nq4w8 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <div class="flex azaj8 items-center w-full">
                  <span data-title="">Oldest</span>
                  <span class="hidden hs-selected:block">
                    <svg
                      class="wlxy3 xtsb0 f5cx3 v7056 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute ikyla uy5ft -translate-y-1/2">
            <svg
              className="wlxy3 xtsb0 f5cx3 k97e9 dark:text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>
        {/* <!-- End Select --> */}
      </div>
      {/* <!-- End Col --> */}
    </div>
  );
};

export const SideDrawerGlobal = ({
  isOpen,
  onRequestClose,
  btnName,
  closebtn,
  onClose,
  btnShow,
  reff,
  children,
}) => {
  return (
    <div
      ref={reff}
      id="hs-pro-dutoo"
      className={`fixed w-full sm:max-w-md  bg-white border-s flex-col z-[80] end-0  h-full top-0 ${
        isOpen
          ? "flex duration-300 shadow-xl transform delay-100 transition-all ease-in-out"
          : "hidden ease-in-out duration-300 transform delay-100 transition-all"
      }`}
    >
      {/* <!-- Header --> */}
      <div className="sm:px-6 p-6 px-4 bg-cyan-600">
        <div className="flex items-center justify-between">
          <h1 className="text-White font-semibold text-lg">
            Visa Expired List
          </h1>
          <button
            onClick={onRequestClose}
            type="button"
            className="size-8 text-gray-800 bg-gray-100 border-transparent items-center border rounded-full gap-x-2 justify-center inline-flex"
          >
            <span className="sr-only">Close offcanvas</span>
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div className="mt-1">
          {/* Do it yourself of inactive account after that we doing autometically with cron job  */}
          <p>You have to do it yourself for the inactive accounts.</p>
        </div>
      </div>

      {/* <!-- End Header --> */}

      {/* <!-- Content --> */}
      <div className="h-full divide-y divide-gray-200 flex overflow-y-auto overflow-hidden flex-col ">
        {/* <EmployeeCard employeeData={data} /> */}
        {children}
        {/* <!-- Footer --> */}

        <div className="flex bg-white  items-center justify-end shrink-0  border-t  p-4  gap-x-2">
          {/* <!-- Button --> */}
          <button
            type="button"
            className="font-semibold text-sm px-3 bg-cyan-600 py-2 border-transparent border rounded-lg gap-x-2  inline-flex items-center justify-center focus:outline-none "
          >
            <svg
              className="hidden sm:block flex-shrink-0 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
              <path d="m15 5 4 4"></path>
            </svg>
            {btnName || "View"}
          </button>
          {/* <!-- End Button --> */}

          {/* <!-- Button --> */}
          <button
            onClick={onClose}
            type="button"
            className="py-2 items-center focus:outline-none shadow-sm text-gray-800 font-medium text-sm px-3 bg-white border rounded-lg gap-x-2 justify-center inline-flex focus:bg-gray-50 "
          >
            <svg
              className="hidden sm:block flex-shrink-0 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
            {closebtn || "Close"}
          </button>
          {/* <!-- End Button --> */}
        </div>

        {/* <!-- End Footer --> */}
      </div>
      {/* <!-- End Content --> */}
    </div>
  );
};

export const FilterAttendanceTableHead = () => {
  const data = [
    "id",
    "Name",
    "Role type",
    "Pay Rate",
    "Total Hour",
    "total pay",
    "Date",
  ];
  return (
    <thead className="bg-gray-50">
      <tr>
        {data.map((item, index) => (
          <th scope="col" className="px-6 py-3 text-start">
            <div className="flex items-center gap-x-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                {item}
              </span>
            </div>
          </th>
        ))}
        {/* <th scope="col" className="px-6 py-3 text-end"></th> */}
      </tr>
    </thead>
  );
};

export const FilterAttendanceTableBody = () => {
  // Ensure data is passed as a prop for flexibility
  // if (!attendanceData || !Array.isArray(attendanceData)) {
  //   console.error(
  //     "FilterAttendanceTableBody: Invalid data provided. Please provide an array of attendance objects."
  //   );
  //   return null; // Or return an empty element (e.g., <tbody />) for visual feedback
  // }
  const data = [
    {
      id: 1,
      name: "Test",
      type: "Monthly",
      payRate: 10,
      hour: 8,
      totalPay: 80,
      date: "27 Mar, 2023",
    },
    {
      id: 2,
      name: "Jhone",
      type: "Weekly",
      payRate: 9,
      hour: 6,
      totalPay: 54,
      date: "26 Mar, 2023",
    },
  ];

  return (
    <tbody class="divide-y divide-gray-200">
      {data.map((item, index) => (
        <tr key={index}>
          {Object.keys(item).map((key) => (
            <td key={key} class="size-px whitespace-nowrap">
              <div class="ps-6 lg:ps-3 xl:ps-6 pe-6 py-3">
                <div class="flex items-center gap-x-3">
                  <div class="grow">
                    <span class="block text-sm font-semibold text-gray-800">
                      {item[key]} {item[key] === "Weekly" && " (CIS)"}
                    </span>
                  </div>
                </div>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export const UserTable = () => {
  return (
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 ">
              <div>
                <h2 class="text-xl font-semibold text-gray-800">Users</h2>
                <p class="text-sm text-gray-600">Add users, edit and more.</p>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <a
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    href="#"
                  >
                    View all
                  </a>

                  <a
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none"
                    href="#"
                  >
                    <svg
                      class="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    Add user
                  </a>
                </div>
              </div>
            </div>

            <table class="min-w-full divide-y divide-gray-200">
              <FilterAttendanceTableHead />
              <FilterAttendanceTableBody />
            </table>
            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
              <div>
                <p class="text-sm text-gray-600">
                  <span class="font-semibold text-gray-800">12</span> results
                </p>
              </div>

              <div>
                <div class="inline-flex gap-x-2">
                  <button
                    type="button"
                    class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <svg
                      class="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Prev
                  </button>

                  <button
                    type="button"
                    class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Next
                    <svg
                      class="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
