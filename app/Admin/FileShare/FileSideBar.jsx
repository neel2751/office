import React, { memo } from "react";
import {
  Archive,
  EllipsisVertical,
  FileText,
  Home,
  Monitor,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateTeam from "./CreateTeam";
import CreateWorkSpace from "./CreateWorkspace";
import { WorkspaceAndTeamProvider } from "./Context/workspaceTeamContext";
import Link from "next/link";

const fileMenu = [
  {
    label: "Home",
    icon: <Home className="size-5" />,
    href: "/Admin/FileShare",
  },
  {
    label: "Computer",
    icon: <Monitor className="size-5" />,
    href: "/Admin/FileShare",
  },
  {
    label: "Notes",
    icon: <FileText className="size-5" />,
    href: "/Admin/FileShare",
  },
  {
    label: "Archive",
    icon: <Archive className="size-5" />,
    href: "/Admin/FileShare",
  },
  {
    label: "Trash",
    icon: <Trash2 className="size-5" />,
    href: "/Admin/FileShare",
  },
];
const FileSideBar = memo(() => {
  return (
    <main className="lg:pt-0 lg:ps-[548px] pt-[59px]">
      <aside className="lg:-translate-x-0 lg:block lg:start-[260px] lg:end-auto lg:bottom-0 duration-300 transition-all bg-white border-e transform -translate-x-full border-gray-200 w-60 hidden start-0 inset-y-0 fixed">
        <div className="p-1 h-full pt-20">
          <div className="border-gray-200 border-dashed border rounded-xl overflow-scroll h-full relative">
            <div className="absolute pt-4 p-2 text-neutral-500 font-normal w-full text-sm space-y-2">
              <Button
                variant="outline"
                className="w-full text-neutral-700 gap-1 text-sm"
              >
                <Plus className="size-4" />
                New Folder
              </Button>
              {fileMenu?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.href}
                  className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  {item?.icon}
                  {item?.label}
                </Link>
              ))}
              <WorkspaceAndTeamProvider>
                <CreateWorkSpace />
                <CreateTeam />
              </WorkspaceAndTeamProvider>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
});

export default memo(FileSideBar);

const Teams = () => {
  return (
    <div className="border-t border-gray-200">
      <div className="flex justify-between items-center py-2">
        <span className="text-neutral-500 font-medium tracking-tight text-sm ms-2">
          Your Teams
        </span>
        <Button variant="ghost">
          <Plus className="size-4" />
        </Button>
      </div>

      {fileMenu?.map((item) => (
        <span className="flex gap-2 items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm">
          <div className="flex gap-2 items-center">
            <span className="size-6 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 text-xs ">
              {item.label.split("")[0]}
            </span>
            {item.label}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <EllipsisVertical className="size-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Manage</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      ))}
    </div>
  );
};
