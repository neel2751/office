import {
  assignSiteDetail,
  getTotalCostMonthWise,
} from "@/actions/assignSiteAction/assignSiteAction";
import { changeDateToString } from "@/actions/commonAction/commonAction";
import { WeekCalendarWithListEvent } from "@/components/ChangePassword/ChnagePassword";
import { BarChartMonth } from "@/components/Chart/BarChartLabel";
import { TableSiteStatus } from "@/components/Table/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Briefcase,
  Building,
  Calendar,
  Clock4,
  Mail,
  MapPin,
  MapPinCheck,
  Target,
  User,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

const SiteDetail = ({ id }) => {
  const [data, setData] = useState(null);
  const [siteDetails, setSiteDeatils] = useState(null);
  async function siteDetail() {
    const response = await assignSiteDetail(id);
    setSiteDeatils(JSON.parse(response));
  }

  // useMemo to memoize fetchData logic
  const fetchData = useMemo(
    () => async () => {
      const response = await getTotalCostMonthWise(id);
      setData(JSON.parse(response));
    },
    [id]
  );

  const chartConfig = {
    totalCost: {
      label: "TotalCost",
      color: "hsl(var(--chart-4))",
      radius: [0, 0, 4, 4],
    },
    totalHours: {
      label: "TotalHours",
      color: "hsl(var(--chart-2))",
      radius: [4, 4, 0, 0],
    },
  };

  // Fetch site details function

  // Effect to fetch data and site details once isVerified becomes true
  useEffect(() => {
    siteDetail();
    fetchData(); // Invoke the memoized function
  }, [id]); // Dependency array includes isVerified
  return (
    <>
      <div className="max-w-7xl w-full mx-auto">
        <div className="space-y-5 lg:shadow-sm lg:p-5 bg-white border border-gray-200 rounded-xl flex flex-col dark:xl:bg-neutral-800 dark:xl:border-neutral-700 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row lg:divide-x divide-gray-200">
            {/* Project Deatil Body */}
            <div className="divide-y divide-gray-200 h-max p-2 w-64">
              <div className="pb-2">
                <SiteDetailHeader siteHeader={siteDetails} />
              </div>
              <div>
                <EmployeDetailHeader siteHeader={siteDetails} />
              </div>
            </div>
            {/* Content */}
            <div className="lg:ps-5 flex-grow space-y-2 sm:max-w-4xl w-full mx-auto sm:px-0 sm:pb-0 pb-2 px-2">
              {/* Sales Card */}
              <SiteDetailCard
                overallTotal={data?.overallTotal[0]}
                employee={data?.employeeWiseTotals?.length}
              />
              <WeekCalendarWithListEvent />
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 sm:space-x-4 sm:gap-0 gap-2 py-4">
          <div className="max-w-2xl">
            {data?.monthWiseTotals && (
              <Card>
                <CardHeader>
                  <CardTitle>Month Wise</CardTitle>
                  <CardDescription>
                    January - December {new Date().getFullYear()}{" "}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChartMonth
                    chartData={data?.monthWiseTotals}
                    chartConfig={chartConfig}
                  />
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="leading-none text-muted-foreground">
                    Showing total pay & hour for the current year
                  </div>
                </CardFooter>
              </Card>
            )}
            {/* <BarChartLabel chartData={data?.monthWiseTotals} /> */}
          </div>
          <SiteEmployeeTotal employeedata={data?.employeeWiseTotals} />
        </div>
      </div>
    </>
  );
};

export default SiteDetail;

const SiteDetailHeader = ({ siteHeader }) => {
  return (
    <div className="lg:pe-4 mt-3">
      <div className=" first:pt-0 pt-4">
        <h2
          id="hs-pro-dupsd-label"
          className="text-neutral-800 font-semibold text-sm dark:text-neutral-200"
        >
          Project Details
        </h2>
        <ul className="mt-3 space-y-2">
          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <Building className="size-4 text-neutral-500" />
              {siteHeader?.projectSiteID?.siteName}
            </div>
          </li>
          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <MapPin className="size-4 text-neutral-500" />
              {siteHeader?.projectSiteID?.siteAddress}
            </div>
          </li>
          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <MapPinCheck className="size-4 text-neutral-500" />
              United Kingdom
            </div>
          </li>
          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <Clock4 className="size-4 text-neutral-500" />
              London (GMT)
            </div>
          </li>
          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <Calendar className="size-4 text-neutral-500" />
              {/* we have to check the date is expire or not based on today date if pass  then show expire else show active */}
              {changeDateToString(new Date(siteHeader?.startDate))}
            </div>
          </li>

          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <Briefcase className="size-4 text-neutral-500" />
              <TableSiteStatus title={siteHeader?.projectSiteID?.status} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const EmployeDetailHeader = ({ siteHeader }) => {
  return (
    <div className="lg:pe-4 mt-3">
      <div className=" first:pt-0 pt-4">
        <h2
          id="hs-pro-dupsd-label"
          className="text-neutral-800 font-semibold text-sm dark:text-neutral-200"
        >
          Project Manager
        </h2>
        <ul className="mt-3 space-y-2">
          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <User className="size-4 text-neutral-500" />
              {siteHeader?.roleId?.name ?? "Not Available"}
            </div>
          </li>
          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <Mail className="size-4 text-neutral-500" />
              {siteHeader?.roleId?.email ?? "Not Available"}
            </div>
          </li>
          <li>
            <div className="inline-flex items-center gap-x-3 text-sm text-neutral-800">
              <Target
                className={`size-4 ${
                  siteHeader?.roleId?.isActive
                    ? "text-green-600"
                    : "text-rose-600"
                }`}
              />
              {siteHeader?.roleId?.isActive ? "Active" : "Inactive"}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SiteDetailCard = ({ overallTotal, employee }) => {
  const allEmployeeTotalPay = overallTotal?.allEmployeeTotalPay;
  const allEmployeeTotalAttendanceHours =
    overallTotal?.allEmployeeTotalAttendanceHours;
  const allEmployeeTotalExtraHours = overallTotal?.allEmployeeTotalExtraHours;

  const data = [
    {
      label: "Total Pay",
      value: allEmployeeTotalPay,
    },
    {
      label: "Total Hours",
      value: allEmployeeTotalAttendanceHours,
    },
    {
      label: "Total Extra Hours",
      value: allEmployeeTotalExtraHours,
    },
    {
      label: "Total Employees",
      value: employee,
    },
  ];

  return (
    <div className="lg:shadow-none shadow-sm bg-white border border-gray-200 rounded-xl p-5 flex-col flex dark:bg-neutral-800 dark:border-neutral-700 space-y-3">
      {/* Header Name for sale */}
      <div className="flex items-center justify-between">
        <h2 className="text-neutral-700 inline-block font-semibold">Cost</h2>
        {/* <div className="text-xs">Date Picker</div> */}
      </div>
      {/* Grid For Total Cost */}
      <div className="md:grid-cols-4 grid-cols-2 gap-4 grid">
        {/* Card */}
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-neutral-300 rounded-xl flex-col flex"
          >
            <h2 className="text-sm text-neutral-600">{item.label}</h2>
            <div className="flex items-center gap-x-1.5">
              <p className="text-neutral-900 font-semibold text-xl">
                {item.label === "Total Pay"
                  ? `£${item?.value?.toFixed(2) || 0.0}`
                  : item?.value || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SiteEmployeeTotal = ({ employeedata }) => {
  return (
    <Card className="h-[27.5rem] overflow-y-scroll">
      <CardHeader className="px-7 flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Employee data</CardTitle>
          <CardDescription>Total hour & pay.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Employe Name</TableHead>
              <TableHead className="hidden sm:table-cell">Total Hour</TableHead>
              <TableHead className="hidden sm:table-cell">BreakHour</TableHead>
              <TableHead className="hidden sm:table-cell">ExtraHour</TableHead>
              <TableHead className="hidden sm:table-cell">Total Pay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeedata?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">
                    {item?.firstName} {item?.lastName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="hidden text-sm  md:inline">
                    {item?.totalAttendanceHours || "0:00"}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {item?.totalBreakHours || "0:00"}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item?.totalExtraHours || "0:00"}
                </TableCell>
                <TableCell className="text-right font-medium">
                  £{(item.totalPay && item?.totalPay.toFixed(2)) || "0.00"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const PasswordForm = ({ name, setIsVerified }) => {
  const [password, setPassword] = useState();
  const handle2FA = (e) => {
    // preventDefault
    e.preventDefault();
    if (password === "1234") {
      console.log(password);
      setIsVerified(true);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center h-full">
      <main class="p-6 max-w-sm w-full mx-auto">
        <div>
          <div class="text-center mb-3">
            <a
              class="text-xl rounded-sm font-semibold inline-block flex-none"
              href="#"
              aria-label="Preline"
              target="_parent"
            >
              <Image
                src={"/images/Logo.svg"}
                alt="CDC Logo"
                className="w-20 h-auto"
                height={20}
                width={20}
              />
            </a>
          </div>

          <div class="shadow-sm p-5 bg-white rounded-lg flex-col flex">
            <div class="text-center mb-8">
              <h1 class="text-neutral-600 font-semibold text-xl">
                👋 Welcome back,
                <span className="text-neutral-800">{name?.user?.name}</span>
              </h1>
              <p class="text-neutral-500 text-sm mt-1">
                Enter Password to see the Site Details.
              </p>
            </div>

            <form onSubmit={handle2FA}>
              <div>
                <div>
                  <div>
                    <label
                      for="hs-pro-dalp"
                      class="text-neutral-700 font-medium text-sm block mb-2"
                    >
                      Password
                    </label>

                    <div class="relative">
                      <input
                        id="hs-pro-dalp"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        class="text-sm py-2.5 px-3 border border-neutral-300 rounded-lg w-full block"
                        placeholder="********"
                      />
                      <button
                        type="button"
                        class="absolute flex items-center cursor-pointer text-neutral-500 px-3 rounded-e-xl z-20 end-0 inset-y-0"
                      ></button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="space-y-3 text-white font-semibold text-sm py-2.5 px-3 bg-cyan-600 border-transparent border rounded-lg gap-x-2 justify-center w-full items-center inline-flex mt-2"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
