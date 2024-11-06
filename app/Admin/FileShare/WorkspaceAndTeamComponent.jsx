import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  EllipsisVertical,
  Eye,
  Key,
  Proportions,
  Star,
  Trash2,
} from "lucide-react";
import React, { memo } from "react";
import { useWorkspaceAndTeamContext } from "./Context/workspaceTeamContext";
import Link from "next/link";
import { encryptId } from "@/actions/commonAction/commonAction";
import useAuthTag from "./lib/getAuthTag";

const WorkspaceAndTeamComponent = memo(
  ({ config, data, session, children }) => {
    const { res } = useAuthTag();
    const { workspace } = useWorkspaceAndTeamContext();

    return (
      <div className="border-t border-gray-200">
        <div className="flex justify-between items-center py-2">
          <span className="text-neutral-500 font-medium tracking-tight text-sm ms-2">
            {config?.nameLabel}
          </span>
          {children}
        </div>
        <div className="space-y-2">
          {data?.map((item) => (
            <Link
              href={`/Admin/FileShare/${encryptId(item?._id)}`}
              key={item?.name}
              className={`flex gap-2 items-center justify-between p-2 rounded-lg ${
                item?._id === res
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-transparent text-neutral-500"
              } hover:bg-gray-100 hover:text-neutral-500 cursor-pointer text-sm group relative group`}
            >
              <div className={`flex gap-2 items-center`}>
                <span
                  className={`${
                    item?._id === res ? "bg-indigo-200" : "bg-neutral-200"
                  } size-6 rounded-full flex items-center justify-center text-xs group-hover:bg-neutral-200`}
                >
                  {item?.name.split("")[0]}
                </span>
                <span className="w-28 max-w-max truncate">{item?.name}</span>
                <span
                  className={`${
                    item?._id === res ? "bg-indigo-200" : "bg-gray-200"
                  } group-hover:bg-gray-200 rounded-full p-0.5 size-5 flex items-center justify-center text-xs`}
                >
                  {item?.members?.length}
                </span>
                <div className="absolute right-1/2 -top-6 bg-neutral-200 rounded-md py-1.5 px-3 group-hover:hidden hidden">
                  <div className="flex items-center -space-x-1">
                    {item?.members?.map((item) => (
                      <span className="bg-white border-neutral-300 shadows hover:z-10 hover:bg-cyan-600 group hover:border-white hover:text-white cursor-pointer border py-0.5 px-2 size-6 flex items-center justify-center rounded-full text-sm shrink-0 relative font-semibold text-neutral-800">
                        {item?._id === session && (
                          <Star className="size-2 text-transparent absolute top-0 -right-0 fill-cyan-600 group-hover:fill-cyan-800" />
                        )}
                        {item?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("") || "N/A"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <EllipsisVertical className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>
                    <span className="text-neutral-500 font-medium tracking-tight text-sm gap-2 inline-flex">
                      Settings
                      <span className="text-xs bg-indigo-600 text-white py-0.5 px-2 rounded-full">
                        {session === item?.leader ? "Leader" : "Member"}
                      </span>
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Edit />
                      <span>Edit</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye />
                      <span>View</span>
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  {workspace?.map(
                    (compare) =>
                      compare?.team === item?._id &&
                      config?.nameLabel === "Team" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Proportions />
                              <span>{compare?.name}</span>
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </>
                      )
                  )}

                  {session === item?.leader && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {config?.nameLabel === "Team" && (
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Key />
                              <span>Chnage Leader</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {item?.members?.map((emp) => (
                                  <>
                                    {emp._id !== session && (
                                      <DropdownMenuItem key={emp._id}>
                                        <span>{emp.name}</span>
                                      </DropdownMenuItem>
                                    )}
                                  </>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        )}
                        <DropdownMenuItem className="text-rose-600">
                          <Trash2 />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </Link>
          ))}
        </div>
      </div>
    );
  }
);

export default WorkspaceAndTeamComponent;
