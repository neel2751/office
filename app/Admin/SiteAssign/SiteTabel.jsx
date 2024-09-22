import { changeDateToString } from "@/actions/commonAction/commonAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useSiteAssignContext } from "@/context/siteAssignContext";

import { Edit } from "lucide-react";

const SiteTabel = () => {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Assign Site for this month!
            </p>
          </div>
        </div>
        <DataTable />
      </div>
    </>
  );
};

export default SiteTabel;

const DataTable = () => {
  const { assignSite, editInfo, filter, setFilter, site } =
    useSiteAssignContext();
  // we have to filter out of month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <Card className="bg-white rounded-lg shadow-md p-2 overflow-scroll">
        <div className="flex space-x-4 items-center justify-center">
          {months.map((month, index) => (
            // we get current month active
            <Button
              key={month}
              onClick={() => setFilter({ ...filter, month: index + 1 })}
              variant={index + 1 === filter.month ? "" : "secondary"}
              className="text-xs"
            >
              {month}
            </Button>
          ))}
        </div>
      </Card>
      <Card className="w-full">
        <CardHeader className="px-7 flex flex-row items-center justify-between">
          <div className="grid gap-2">
            <CardTitle>Assign Site</CardTitle>
            <CardDescription>Recent from you.</CardDescription>
          </div>
          <Select
            onValueChange={(val) =>
              setFilter({ ...filter, siteId: val === "All" ? "" : val })
            }
            defaultValue={filter.siteId !== "" ? filter.siteId : "All"}
          >
            <SelectTrigger className="max-w-max">
              <SelectValue
                placeholder={filter.siteId !== "" ? filter.siteId : "All"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[{ label: "All", value: "All" }, ...site]?.map((item) => (
                  <SelectItem value={item.value}> {item.label} </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>SiteName</TableHead>
                <TableHead className="hidden sm:table-cell">
                  AssignEmployee
                </TableHead>

                <TableHead className="hidden sm:table-cell">Progress</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignSite?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">
                      {/* {item.firstName} {item.lastName} */}
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {/* {item.firstName} {item.lastName} */}
                      {item?.siteInfo?.label}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center -space-x-2">
                      {item.employeInfo.map((employee) => (
                        <div class="hover:z-10 hover:shadow-sm group relative">
                          <span class="flex text-neutral-700 uppercase font-semibold text-sm border-neutral-300 border bg-white rounded-full items-center size-10 justify-center cursor-pointer">
                            {/* employee.lable like this jhone Doe we need showing like this JD using split method */}
                            {employee?.label?.split("")[0] +
                              employee?.label?.split(" ")[1][0]}
                          </span>
                          <span class="group-hover:opacity-100 group-hover:visible opacity-0 transition-opacity shadow-sm text-white font-semibold text-xs py-1 px-2 bg-neutral-800 rounded-xl z-10 group-hover:block hidden absolute whitespace-nowrap -top-6 left-0">
                            {employee?.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-neutral-600">
                    {/* £{item.payRate.toFixed(2)} */}
                    {item.employeInfo.length}/{item.total}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {changeDateToString(item.date)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-neutral-600">
                    <Button
                      onClick={() => editInfo(item)}
                      className="py-2 px-3 flex items-center justify-center"
                    >
                      <Edit className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {filter.page}-{filter.limit}
            </strong>{" "}
            of <strong>{filter.totalCount}</strong> products
          </div>
          {filter.totalCount > 10 && (
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-muted-foreground">
                Rows per page
              </p>
              <Select
                onValueChange={(val) => setFilter({ ...filter, limit: val })}
                defaultValue={filter.limit}
              >
                <SelectTrigger className="w-[65px]">
                  <SelectValue placeholder={filter.limit} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[10, 20, 30, 50].map((item) => (
                      <SelectItem value={item}> {item} </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
