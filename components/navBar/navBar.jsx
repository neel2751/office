import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import React, { memo } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const NavBar = ({ toggleSidebar, isSideBarOpen }) => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed z-[48] w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-ween">
          <div className="flex items-center w-full gap-4">
            <Button
              onClick={toggleSidebar}
              variant="outline"
              className="lg:hidden"
              size="icon"
            >
              {isSideBarOpen ? (
                <PanelLeftClose size={20} />
              ) : (
                <PanelLeftOpen size={20} />
              )}
            </Button>
            <Link
              href=""
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <Image
                src="/images/Logo.svg"
                className="lg:size-12 size-8 mr-2"
                alt="Creative Design & Construction"
                width={24}
                height={24}
              />
              <span className="text-sm xl:text-lg text-gray-600 self-center whitespace-nowrap">
                Creative Design & Construction
              </span>
            </Link>
            {/* <!-- End User --> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
