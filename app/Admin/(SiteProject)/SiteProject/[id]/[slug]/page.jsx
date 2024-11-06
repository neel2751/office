"use client";
import React from "react";
import NavBar from "@/components/navBar/navBar";
import SideBar from "@/components/navBar/sideBar";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import {
  BadgeHelp,
  BookOpenText,
  CalendarCheck,
  ChartBar,
  ChartPie,
  ClipboardCheck,
  Cog,
  FileCheck,
  History,
  ReceiptPoundSterling,
  SaveAll,
  Telescope,
  Ticket,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import Overview from "./overview";
import Task from "../../Task/Task";
import { usePathname } from "next/navigation";
import Employee from "../../Employee/Employee";
import Expense from "../../Expense/Expense";
import Help from "../../Help";
import Report from "../../Reports/Report";
import Invoices from "../../invoices";

const page = ({ params }) => {
  const { slug } = params;
  return (
    <AuthProvider>
      <NavBar />
      <div className="flex overflow-hidden bg-white pt-10">
        <SideBar />
        <div className="h-full w-full mt-5 bg-gray-50 relative overflow-y-auto lg:ml-64">
          <SiteNavBar slug={slug}>
            <div className="flex flex-wrap items-center justify-between gap-2 ms-6 mb-5">
              <div>
                <h1 className="md:text-lg text-neutral-700 font-semibold text-base">
                  Good morning, Neel.
                </h1>
                <p className="text-stone-500 text-sm">
                  Here's what's happening with your site {slug} today.
                </p>
              </div>
            </div>
          </SiteNavBar>
        </div>
      </div>
    </AuthProvider>
  );
};

export default page;

const SiteNavBar = ({ slug, children }) => {
  const pathName = usePathname();
  const segment = pathName.split("/");
  const id = segment[3];
  const menu = [
    {
      name: "Overview",
      icon: <ChartPie className="shrink-0 size-4" />,
      link: "overview",
    },
    {
      name: "Checklist",
      icon: <ClipboardCheck className="shrink-0 size-4" />,
      link: "checklist",
    },
    {
      name: "Expense",
      icon: <ReceiptPoundSterling className="shrink-0 size-4" />,
      link: "expense",
    },
    {
      name: "Employee",
      icon: <UserCog className="shrink-0 size-4" />,
      link: "employee",
    },
    // {
    //   name: "RFI",
    //   icon: <FileCheck className="shrink-0 size-4" />,
    //   link: "rfi",
    // },
    // {
    //   name: "Gantt View",
    //   icon: <ChartBar className="shrink-0 size-4" />,
    //   link: "ganttview",
    //   isNew: true,
    // },
    // {
    //   name: "Submittal",
    //   icon: <SaveAll className="shrink-0 size-4" />,
    //   link: "submittal",
    // },
    // {
    //   name: "Filter",
    //   icon: <History className="shrink-0 size-4" />,
    //   link: "filter",
    //   isNew: true,
    // },
    {
      name: "Tasks",
      icon: <CalendarCheck className="shrink-0 size-4" />,
      link: "tasks",
    },
    {
      name: "Invoice",
      icon: <Ticket className="shrink-0 size-4" />,
      link: "invoices",
      isNew: "Beta V1 Plus",
    },
    {
      name: "Customer Review",
      icon: <BookOpenText className="shrink-0 size-4" />,
      link: "customerReview",
    },
    {
      name: "Reports",
      icon: <Telescope className="shrink-0 size-4" />,
      link: "reports",
      isNew: "Beta",
    },
    {
      name: "Settings",
      icon: <Cog className="shrink-0 size-4" />,
      link: "settings",
    },
    {
      name: "Help",
      icon: <BadgeHelp className="shrink-0 size-4" />,
      link: "help",
    },
  ];

  function isSlug(slug) {
    // we have to show  the file on behalf  of the slug
    // we have to switch case
    switch (slug) {
      case "overview":
        return <Overview />;
      case "employee":
        return <Employee id={id} />;
      case "expense":
        return <Expense id={id} />;
      case "RFI":
        return <RFI />;
      case "invoices":
        return <Invoices />;
      case "Submittal":
        return <Submittal />;
      case "tasks":
        return <Task id={id} />;
      case "reports":
        return <Report id={id} />;
      case "Settings":
        return <Settings />;
      case "help":
        return <Help />;
      case "CustomerReview":
        return <CustomerReview />;
    }
  }
  return (
    <>
      <nav className="relative bg-white border-stone-200 border-b mt-2">
        <div className="flex flex-wrap items-center lg:py-4 lg:px-8 sm:px-6 px-4 gap-2 justify-between basis-full max-w-7xl w-full mx-auto">
          <div className="lg:basis-auto lg:grow-0 basis-full grow overflow-hidden">
            <div className="lg:block transition-all duration-300 overflow-scroll">
              <div className="overflow-y-auto max-h-[80vh] dark:[&amp;::-webkit-scrollbar-track]:hidden dark:[&amp;::-webkit-scrollbar-thumb]:hidden">
                <div className="lg:py-0 lg:gap-x-1 lg:items-center flex py-2">
                  {menu.map((item, index) => (
                    <Link
                      key={index}
                      className={`lg:gap-x-1.5 lg:w-auto text-neutral-800 text-sm text-start py-2 px-3 rounded-md gap-x-3 items-center flex w-full whitespace-nowrap ${
                        slug === item.link
                          ? "bg-cyan-100 text-cyan-600"
                          : "hover:bg-stone-100"
                      }`}
                      href={item.link}
                    >
                      {item.icon}
                      {item.name}
                      {item.isNew && (
                        <span
                          className={`font-medium text-xs py-0.5 px-2 rounded-md items-center inline-flex ${
                            slug === item.link
                              ? "bg-cyan-600 text-cyan-100"
                              : "bg-cyan-100 text-cyan-600"
                          }`}
                        >
                          {item.isNew}
                        </span>
                      )}
                    </Link>
                  ))}
                  {/* <div className="hs-dropdown eqdmc [--strategy:static] lg:[--strategy:fixed] [--adaptive:none] lg:[--trigger:hover] group">
                    <button
                      id="hs-pro-enlod"
                      type="button"
                      className="lg:space-y-0 space-y-1 lg:gap-x-1.5 lg:w-auto text-neutral-700 text-sm text-start py-2 px-3 rounded-md gap-x-3 items-center w-full flex hover:bg-stone-100"
                      aria-haspopup="menu"
                      aria-expanded="false"
                      aria-label="Dropdown"
                    >
                      <svg
                        className="lg:hidden shrink-0 size-4"
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
                        <path d="M14.5 22H18a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M2.97 13.12c-.6.36-.97 1.02-.97 1.74v3.28c0 .72.37 1.38.97 1.74l3 1.83c.63.39 1.43.39 2.06 0l3-1.83c.6-.36.97-1.02.97-1.74v-3.28c0-.72-.37-1.38-.97-1.74l-3-1.83a1.97 1.97 0 0 0-2.06 0l-3 1.83Z"></path>
                        <path d="m7 17-4.74-2.85"></path>
                        <path d="m7 17 4.74-2.85"></path>
                        <path d="M7 17v5"></path>
                      </svg>
                      Orders{" "}
                      <span className="font-medium text-xs py-0.5 px-2 rounded-full items-center inline-flex bg-cyan-100 text-cyan-600">
                        +1
                      </span>
                      <svg
                        className="group-hover:-rotate-180 lg:group-hover:rotate-180 lg:ms-0 duration-300 shrink-0 size-4 ms-auto"
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
                    </button>
                    <div
                      className="transition-[opacity,margin] duration-[0.1ms] group-hover:opacity-100 opacity-0 relative group-hover:flex hidden top-full after:h-[calc(100%-0.25rem)] lg:duration-300 lg:shadow-sm lg:ps-0 lg:rounded-md lg:w-auto shadow-stone-200 ps-7 bg-white w-full z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="hs-pro-enlpd"
                      style={{
                        position: "fixed",
                        inset: "0px auto auto 0px",
                        margin: "0px",
                        transform: "translate3d(500px,125px,0px)",
                      }}
                    >
                      <div className="p-1">
                        <a
                          className="group flex items-center text-neutral-800 text-sm py-2 px-3 rounded-md gap-x-3 hover:bg-stone-100 w-full"
                          href="../../pro/ecommerce/orders.html"
                        >
                          Overview
                        </a>
                        <a
                          className="group flex items-center text-neutral-800 text-sm py-2 px-3 rounded-md gap-x-3 hover:bg-stone-100 w-full"
                          href="../../pro/ecommerce/purchase-orders.html"
                        >
                          Purchase Orders{" "}
                          <span className="font-medium text-xs py-0.5 px-2 rounded-full items-center inline-flex bg-cyan-100 text-cyan-600">
                            New
                          </span>
                        </a>
                        <a
                          className="group flex items-center text-neutral-800 text-sm py-2 px-3 rounded-md gap-x-3 hover:bg-stone-100 w-full"
                          href="../../pro/ecommerce/order-details.html"
                        >
                          Order Details
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-4">
        {children}
        {isSlug(slug)}
      </div>
    </>
  );
};
