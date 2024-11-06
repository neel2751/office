import { changeDateToString } from "@/actions/commonAction/commonAction";
import { TableSiteStatus } from "@/components/Table/Table";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTaskAssignContext } from "@/context/taskContext";
import PaginationHelper from "@/helper/paginationHelper";
import { differenceInDays } from "date-fns";
import { Check, Plus, Search, Square } from "lucide-react";
import { memo } from "react";

const TaskTabel = memo(() => {
  const {
    tasks,
    taskPriorities,
    updateTaskPriority,
    taskStatuses,
    updateTaskStatus,
    setSelectedTask,
    setIsOpen,
    filter,
    setFilter,
    siteCategory,
  } = useTaskAssignContext();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-x-5 justify-between">
          <h2 className="text-neutral-700 font-semibold inline-flex">Task</h2>
          <div className="flex justify-end items-center gap-x-2">
            <Button type="button" onClick={() => setIsOpen(true)}>
              <Plus className="size-4" />
              Add Task
            </Button>
          </div>
        </div>
        <div className="space-y-3 md:gap-x-5 md:gap-y-0 md:grid-cols-2 gap-y-2 grid content-center">
          <div className="max-w-max">
            <div className="relative mt-2">
              <div className="absolute flex items-center ps-3.5 z-20 start-0 inset-y-0 pointer-events-none">
                <Search className="size-4 text-neutral-400 shrink-0" />
              </div>
              <input
                type="text"
                className="text-sm ps-10 pe-8 py-2 bg-white rounded-lg max-w-max block border border-gray-200 outline-none focus:ring-2 focus:ring-cyan-600"
                placeholder="Search tasks"
                value={filter.search}
                onChange={(e) =>
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    search: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-x-2 gap-y-4 md:justify-end flex-wrap">
            <span className="text-neutral-500 text-sm font-medium">
              Status:
            </span>
            <Select
              value={filter?.status || "All"}
              onValueChange={(val) =>
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  status: val === "All" ? "" : val,
                }))
              }
            >
              <SelectTrigger className="max-w-max">
                <SelectValue>{filter?.status || "All"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["All", ...taskStatuses].map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <span className="text-neutral-500 text-sm font-medium">
              Priority:
            </span>
            <Select
              value={filter?.priority || "All"} // Controlled component
              onValueChange={(val) =>
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  priority: val === "All" ? "" : val, // Update the state
                }))
              }
            >
              <SelectTrigger className="max-w-max">
                <SelectValue placeholder={filter?.priority || "All"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["All", ...taskPriorities]?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-neutral-500 text-sm font-medium">
              Category
            </span>
            <Select
              value={filter?.category || "All"} // Use 'value' for controlled component
              onValueChange={(val) =>
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  category: val === "All" ? "" : val, // Update the category
                }))
              }
            >
              <SelectTrigger className="max-w-max">
                <SelectValue>
                  {filter?.category === ""
                    ? "All"
                    : [
                        { value: "All", label: "All" },
                        ...new Set(siteCategory),
                      ]?.map((item) => {
                        if (item.value === filter?.category) {
                          return item.label;
                        }
                      })}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    { value: "All", label: "All" },
                    ...new Set(siteCategory),
                  ]?.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <span className="text-neutral-500 text-sm font-medium">Sort</span>
            <Select
              onValueChange={(val) =>
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  sort: val === "All" ? "" : val, // Update the category
                }))
              }
              value={filter?.sort || "All"}
            >
              <SelectTrigger className="max-w-max">
                <SelectValue placeholder={filter?.sort || "All"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    {
                      value: "asc",
                      label: "Asc",
                    },
                    {
                      value: "desc",
                      label: "Desc",
                    },
                  ]?.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Task Name",
                "Description",
                "Days",
                "Estimation",
                "Category",
                "People",
                "Status",
                "Priority",
                "Subtasks",
                "Actions",
              ].map((item, index) => (
                <TableHead className="uppercase text-xs" key={index}>
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div
                    title={item?.title}
                    className="font-medium truncate w-28"
                  >
                    {item?.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    title={item?.description}
                    className="font-medium max-w-sm max-h-16 overflow-y-scroll"
                  >
                    {item?.description}
                  </div>
                </TableCell>
                <TableCell className="md:table-cell max-w-max whitespace-nowrap tracking-tight text-neutral-600 font-medium">
                  {differenceInDays(
                    new Date(item?.dueDate),
                    new Date(item?.startDate)
                  )}{" "}
                  Days
                </TableCell>
                <TableCell className="md:table-cell md:w-56 max-w-max tracking-tight text-neutral-600 font-medium ">
                  <span className=" whitespace-nowrap">
                    {changeDateToString(item?.startDate)}
                  </span>
                  -{" "}
                  <span className=" whitespace-nowrap">
                    {changeDateToString(item?.dueDate)}
                  </span>
                </TableCell>
                <TableCell>
                  <div
                    className={`font-medium ${
                      (index + 1) % 2 === 0 ? "bg-purple-600" : "bg-rose-600"
                    } py-1.5 px-2 text-white rounded-md text-xs text-center w-20`}
                  >
                    {item?.category?.name || "Unknown"}
                  </div>
                </TableCell>
                <TableCell className="max-w-max">
                  <div className="flex items-center -space-x-2">
                    {item?.assignedTo?.map((employee, index) => (
                      <div
                        key={index}
                        className="hover:z-10 hover:shadow-sm group relative"
                      >
                        <span className="flex text-neutral-700 uppercase font-semibold text-sm border-neutral-300 border bg-white rounded-full items-center size-8 justify-center cursor-pointer">
                          {/* employee.lable like this jhone Doe we need showing like this JD using split method */}
                          {employee?.label?.split("")[0]}
                        </span>
                        <span className="group-hover:opacity-100 group-hover:visible opacity-0 transition-opacity shadow-sm text-white font-semibold text-xs py-1 px-2 bg-neutral-800 rounded-xl z-10 group-hover:block hidden absolute whitespace-nowrap -top-6 left-0">
                          {employee?.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </TableCell>

                <TableCell className=" md:table-cell">
                  <Select
                    value={item?.status}
                    onValueChange={(value) => {
                      updateTaskStatus(value, item._id, item?.status); // Pass the status and taskId to updateTaskStatus
                    }}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskStatuses.map((status, index) => (
                        <SelectItem key={index} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="md:table-cell">
                  <Select
                    value={item?.priority}
                    onValueChange={(value) => updateTaskPriority(value)}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskPriorities?.map((priority, index) => (
                        <SelectItem key={index} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="max-w-max md:table-cell text-center">
                  {item?.subtasks?.length || 0}
                </TableCell>
                <TableCell className="md:table-cell">
                  <Button
                    key={item._id}
                    variant="outline"
                    className="max-w-max justify-start"
                    onClick={() => setSelectedTask(item)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TaskPagination filter={filter} setFilter={setFilter} />
      </CardContent>
    </Card>
  );
});

export default TaskTabel;

const TaskPagination = memo(({ filter, setFilter }) => {
  return (
    <div className="flex">
      <PaginationHelper
        pageSize={filter?.limit}
        currentPage={filter?.page}
        onPageChange={(e) => setFilter({ ...filter, page: e })}
        items={filter?.totalCount}
      >
        <div className="flex items-center gap-2 bg-white">
          <span className="text-neutral-500 text-sm font-medium">Page:</span>
          <Select
            value={filter?.limit || "All"}
            onValueChange={(val) =>
              setFilter((prevFilter) => ({
                ...prevFilter,
                limit: val === "All" ? "" : val,
              }))
            }
          >
            <SelectTrigger className="max-w-max">
              <SelectValue placeholder={filter?.limit || "All"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[1, 2, 3, 4, 5, 6]?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </PaginationHelper>
    </div>
  );
});

export const SubTaskTabel = memo(
  ({ data, updateSubTaskStatus, toggleSubtaskCompletion, taskStatuses }) => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {[
              <Square className="size-4 rounded-sm" />,
              "title",
              "days",
              "Estimation",
              "People",
              "Progress",
              "Status",
            ].map((item, index) => (
              <TableHead className="uppercase text-xs" key={index}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {item?.completed ? (
                  <Square className="size-4 bg-black opacity-40 rounded-sm p-0.5">
                    <Check className="text-white" />
                  </Square>
                ) : (
                  <Checkbox
                    checked={item?.completed}
                    onCheckedChange={() =>
                      toggleSubtaskCompletion(selectedTask?._id, item?._id)
                    }
                  />
                )}
              </TableCell>

              <TableCell>
                <div
                  title={item?.title}
                  className={`font-medium truncate max-w-xs ${
                    item?.completed ? "line-through" : ""
                  }`}
                >
                  {item?.title}
                </div>
              </TableCell>

              <TableCell className="md:table-cell w-40 tracking-tight text-neutral-600 font-medium">
                {differenceInDays(
                  new Date(item?.endDate),
                  new Date(item?.startDate)
                )}{" "}
                Days
              </TableCell>

              <TableCell className=" md:table-cell w-56 tracking-tight text-neutral-600 font-medium">
                <div className="flex items-center -space-x-2 gap-3 text-sm max-w-36 text-start justify-end">
                  <span
                    className={
                      new Date() >= new Date(item?.startDate) || item?.completed
                        ? "text-red-500 text-sm line-through"
                        : "text-neutral-700 text-sm"
                    }
                  >
                    {new Date(item?.startDate).toDateString()}
                  </span>
                  <span>-</span>
                  <span
                    className={
                      new Date() >= new Date(item?.endDate) || item?.completed
                        ? "text-red-500 text-sm line-through"
                        : "text-neutral-700 text-sm"
                    }
                  >
                    {new Date(item?.endDate).toDateString()}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center -space-x-2">
                  {item?.assignedTo?.map((employee, index) => (
                    <div
                      key={index}
                      className="hover:z-10 hover:shadow-sm group relative"
                    >
                      <span className="flex text-neutral-700 uppercase font-semibold text-sm border-neutral-300 border bg-white rounded-full items-center size-10 justify-center cursor-pointer">
                        {/* employee.lable like this jhone Doe we need showing like this JD using split method */}
                        {employee?.firstName?.split("")[0]}
                      </span>
                      <span className="group-hover:opacity-100 group-hover:visible opacity-0 transition-opacity shadow-sm text-white font-semibold text-xs py-1 px-2 bg-neutral-800 rounded-xl z-10 group-hover:block hidden absolute whitespace-nowrap -top-6 left-0">
                        {employee?.firstName}
                      </span>
                    </div>
                  ))}
                </div>
              </TableCell>

              <TableCell>
                <div className="w-20 flex items-center gap-2">
                  <Progress value={item?.progress} />
                  <span className="text-neutral-600 text-xs font-medium">
                    {item?.progress}%
                  </span>
                </div>
              </TableCell>

              <TableCell>
                {item?.completed ? (
                  <TableSiteStatus title={item?.status} />
                ) : (
                  <Select
                    value={item?.status}
                    onValueChange={(value) =>
                      updateSubTaskStatus(
                        value,
                        item?._id,
                        item?.status,
                        item?.title
                      )
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskStatuses?.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);
