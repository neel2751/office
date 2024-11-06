import { getTaskChartAction } from "@/actions/tasksAction/taskAction";
import { Button } from "@/components/ui/button";
import { differenceInDays } from "date-fns";
import {
  ArrowUpRight,
  Gift,
  Mail,
  MapPinCheck,
  PhoneCall,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  BarChartStatus,
  PieChartPriority,
  PieChartStatus,
} from "../Task/TaskChart";
import { ChartContainerCategory } from "../Expense/ExpenseCategoryChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  expenseCategoryWiseCost,
  fetchTotalTaskCountByMonth,
  findEmployeeTotalCost,
  findLastThreeMonthEmployeeExpense,
  findLastThreeMonthExpense,
  getMonthlyReport,
  getSiteExpense,
  getTaskPerformance,
  totalExpenseCost,
} from "@/actions/reportAction/reportAction";
import ReportChart from "./reportChart";
import {
  ReportCategoryTrackerChart,
  ReportEmployeTrackerChart,
  ReportExpenseTrackerChart,
} from "./ReportChartData";
import { generate2faToken } from "@/actions/authAction.js/authAction";
import { generateQRCode } from "@/actions/commonAction/commonAction";
import { BarChartMonth } from "@/components/Chart/BarChartLabel";
import Category from "./@category/page";
import StatusChart from "./@status/page";

const Report = ({ id }) => {
  const startDate = new Date("2022-01-27");
  const endDate = new Date("2022-04-10");
  const budget = 12000;
  const laborcost = 2420;
  const materialcost = 1000;
  const overheadcost = 500;

  // we have to find out avg monthly  cost

  const avgMonthlyCost =
    (budget - laborcost - materialcost - overheadcost) / 12;
  console.log(avgMonthlyCost);

  const totalcost = laborcost + materialcost + overheadcost;
  const profit = budget - totalcost;
  // we have to find the ROI(Profit Margin)
  const profitmargin = (profit / budget) * 100;
  const profitmarginpercentage = profitmargin.toFixed(2);

  //we have to find Markup
  const markup = (profit / totalcost) * 100;
  const markuppercentage = markup.toFixed(2);
  // we have to find the percantage  of labor cost in the total budget
  const laborcostpercentage = (laborcost / budget) * 100;
  const laborcostpercentagevalue = laborcostpercentage.toFixed(2);
  const materialcostpercentage = (materialcost / budget) * 100;
  const materialcostpercentagevalue = materialcostpercentage.toFixed(2);
  const overheadcostpercentage = (overheadcost / budget) * 100;
  const overheadcostpercentagevalue = overheadcostpercentage.toFixed(2);
  const totalcostpercentage = (totalcost / budget) * 100;
  const totalcostpercentagevalue = totalcostpercentage.toFixed(2);

  // we have to find the key  performance indicator
  const laborcostindicator = (laborcost / totalcost) * 100;
  const laborcostindicatorvalue = laborcostindicator.toFixed(2);
  const materialcostindicator = (materialcost / totalcost) * 100;
  const materialcostindicatorvalue = materialcostindicator.toFixed(2);
  const overheadcostindicator = (overheadcost / totalcost) * 100;
  const overheadcostindicatorvalue = overheadcostindicator.toFixed(2);
  const profitindicator = (profit / totalcost) * 100;
  const profitindicatorvalue = profitindicator.toFixed(2);
  const totalcostindicator = (totalcost / budget) * 100;
  const totalcostindicatorvalue = totalcostindicator.toFixed(2);
  // we have to find client satisfaction scores
  // if client  is satisfied then 5
  // if client is not satisfied then 1
  const clientsatisfaction = 5;
  const clientsatisfactionpercentage = (clientsatisfaction / 5) * 100;
  const clientssatisfactionpercentage = clientsatisfactionpercentage.toFixed(2);
  // we have to find the  key performance indicator for client satisfaction
  const clientsatisfactionindicator = (clientsatisfaction / 5) * 100;
  const clientsatisfactionindicatorvalue =
    clientsatisfactionindicator.toFixed(2);
  // we have to find the quality defects
  // if quality is good then 0
  // if quality is bad then 10
  const qualitydefects = 0;
  const qualitydefectspercentage = (qualitydefects / 10) * 100;
  const qualitydefectspercentagevalue = qualitydefectspercentage.toFixed(2);

  // first we have to find the projection completion
  const projectioncompletion = 100;
  const projectioncompletionpercentage = (projectioncompletion / 100) * 100;
  const projectcompletionpercentagevalue =
    projectioncompletionpercentage.toFixed(2);
  // we have to find th days  taken to complete the project depend on start  date and end date
  const datedifference = differenceInDays(endDate, startDate);
  // find the percantage
  const dayspercentage = (datedifference / 30) * 100;
  const dayspercentagevalue = dayspercentage.toFixed(2);
  console.log(datedifference);

  // if risk is low then 1
  // if risk is high then 5
  // how to find risk we can't put directly we have to find the  risk by using the formula
  // risk = (laborcost + materialcost + overheadcost) / totalcost
  const risk = (laborcost + materialcost + overheadcost) / totalcost;
  const riskpercentage = (risk / 5) * 100;
  const riskpercentagevalue = riskpercentage.toFixed(2);
  let riskindicator;
  if (riskpercentagevalue <= 20) {
    riskindicator = 1;
  } else if (riskpercentagevalue > 20 && riskpercentagevalue <= 40) {
    riskindicator = 2;
  } else if (riskpercentagevalue > 40 && riskpercentagevalue <= 60) {
    riskindicator = 3;
  } else if (riskpercentagevalue > 60 && riskpercentagevalue <= 80) {
    riskindicator = 4;
  } else {
    riskindicator = 5;
  }
  // we have to find the quality defects

  console.log(riskindicator, " riskpercentagevalue");
  // we have to find gross profit margin

  // @ formula Gross profit margin = (sales - totalcost)  / sales * 100
  const sales = 100000;
  const grossprofitmargin = ((sales - totalcost) / sales) * 100;
  const grossprofitmarginvalue = grossprofitmargin.toFixed(2);
  // we have to find the net profit margin
  // @ formula Net profit margin = (sales -  totalcost - laborcost - materialcost - overheadcost) / sales * 100
  const netprofitmargin =
    ((sales - totalcost - laborcost - materialcost - overheadcost) / sales) *
    100;
  const netprofitmarginvalue = netprofitmargin.toFixed(2);
  // we have to find the return on investment
  // @ formula Return on investment = (profit / totalcost) * 100
  const returnoninvestment = (profit / totalcost) * 100;
  const returnoninvestmentvalue = returnoninvestment.toFixed(2);
  // quick ratio formula Quick  ratio = (currentasset - inventory) / currentliability
  const currentasset = budget - totalcost;
  const inventory = 0;
  const currentliability = 0;
  const quickratio = (currentasset - inventory) / currentliability;
  const quickratiovalue = quickratio.toFixed(2);

  return (
    <div className="relative pb-36">
      <Category />
      <ProjectDetailCard id={id} />
      <div className="bg-white h-auto left-0 right-0 bottom-0 fixed lg:ml-64 shadow-sm drop-shadow-md before:w-full before:shadow-2xl before:bottom-10">
        <div className="flex justify-between items-center p-4 border-t border-neutral-200 shadow-sm text-neutral-600">
          <div className="flex justify-between items-center gap-4">
            <ProjectCard
              title={"Company Labor Costs"}
              cost={`£${laborcost.toFixed(2)}`}
              percenatge={`${laborcostpercentagevalue} %`}
            />
            +
            <ProjectCard
              title={"Company Material costs"}
              cost={`£${materialcost.toFixed(2)}`}
              percenatge={`${materialcostpercentagevalue}%`}
            />
            +
            <ProjectCard
              title={"Company expense costs"}
              cost={`£${overheadcost.toFixed(2)}`}
              percenatge={`${overheadcostpercentagevalue} %`}
            />
            =
            <ProjectCard
              title={"Total Company  Costs"}
              cost={`£${totalcost.toFixed(2)}`}
              percenatge={`${totalcostpercentagevalue}%`}
            />
            <EstimatedProjectCard
              title={"Total Company  Costs"}
              cost={`£${totalcost.toFixed(2)} - £${profit}`}
              markup={markuppercentage}
              margin={profitmarginpercentage}
            />
          </div>
          <Total />
        </div>
      </div>
    </div>
  );
};
export default Report;

const ProjectCard = ({ title, cost, percenatge }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-white p-2 flex flex-col justify-center">
        <h2 className="text-xs mb-2 uppercase text-neutral-500 tracking-tight font-medium">
          {title}
        </h2>
        <p className="text-neutral-700 text-sm font-semibold mb-0.5">{cost}</p>
        <p className="text-neutral-500 text-xs">{percenatge}</p>
      </div>
    </div>
  );
};
const EstimatedProjectCard = ({ title, cost, markup, margin }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-white p-2 flex flex-col justify-center">
        <h2 className="text-xs mb-2 uppercase text-neutral-700 tracking-tight font-medium">
          {title}
        </h2>
        <p className="text-blue-700 text-sm font-semibold mb-0.5">{cost}</p>
        <div className="flex gap-4 mt-1">
          <div className="text-xs font-medium">
            <p className="text-neutral-500">MARKUP</p>
            <p className="text-neutral-800 text-sm font-semibold">{markup}%</p>
          </div>
          <div className="text-xs font-medium">
            <p className="text-neutral-500 ">MARGIN</p>
            <p className="text-neutral-800 text-sm font-semibold">{margin}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Total = () => {
  return (
    <div className="flex flex-col gap-2 justify-start">
      <div className="text-sm flex tracking-tight gap-1 justify-between">
        <p className="text-neutral-600">Taxable subtotal:</p>
        <p className="text-neutral-600 font-medium">£11,000.00</p>
      </div>

      <div className="text-sm flex tracking-tight gap-1 justify-between mt-0.5">
        <p className="text-neutral-600">Tax 10%:</p>
        <p className="text-neutral-600 font-medium">£1,032.48</p>
      </div>
      <div className="text-base flex tracking-tight gap-1 justify-between mt-1">
        <p className="text-neutral-600">Estimated Total:</p>
        <p className="font-semibold text-blue-700">£12,032.48</p>
      </div>
    </div>
  );
};
const ProjectDetailCard = ({ id }) => {
  const [chartData, setChartData] = useState();
  const [barData, setBarData] = useState();
  const [taskTotal, setTaskTotal] = useState();
  const [categoryTotal, setCategoryTotal] = useState();
  const [employeChartData, setEmployeChartData] = useState();
  useEffect(() => {
    taskPerformance();
  }, []);

  const taskPerformance = async () => {
    try {
      const responses = await findLastThreeMonthExpense(id);
      const datas = JSON.parse(responses);
      setChartData(datas);
      const employeeResponse = await findLastThreeMonthEmployeeExpense(id);
      const employeeData = JSON.parse(employeeResponse);
      setEmployeChartData(employeeData);
      const response = await fetchTotalTaskCountByMonth();
      const data = JSON.parse(response);
      setTaskTotal(data);
      const category = await expenseCategoryWiseCost();
      const categoryData = JSON.parse(category);
      setCategoryTotal(categoryData);

      const barchart = await getMonthlyReport();
      const barData = JSON.parse(barchart);
      console.log(barData);
      setBarData(barData);
      //   const barChart1 = await getSiteExpense();
      //   const barData1 = JSON.parse(barChart1);
    } catch (error) {
      console.log(error, "Client side Report Error");
    }
  };

  //   const chartConfig = {
  //     totalExpense: {
  //       label: "TotalExpense",
  //       color: "hsl(var(--chart-4))",
  //       radius: [4, 4, 4, 4],
  //     },
  //   };
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
  return (
    <div className="divide-y bg-white p-4 rounded-xl border border-dashed border-neutral-300 shadow ">
      <div className="grid sm:grid-cols-5 grid-cols-1  gap-4 pb-4 ">
        <div className="p-2 flex flex-col justify-center col-span-2 -mt-3">
          <h2 className="text-xs mb-2 uppercase text-neutral-700 tracking-tight font-medium">
            Company Information
          </h2>
          {/* company logo */}
          <div className="mt-2 mb-2">
            <Image src={"/images/Logo.svg"} width={50} height={50} alt="CDC" />
          </div>
          <div className="flex flex-col gap-2 mt-4 max-w-sm">
            <DetailCard title={"Name:"} value={"CDC"} />
            <DetailCard
              title={"Address:"}
              value={" 595a, Crankbrook Road, London, UK"}
            />
            <DetailCard title={"Phone:"} value={"020-8004-3327"} />
            <DetailCard title={"Email:"} value={"info@cdc.construction"} />
            <DetailCard title={"Website:"} value={"www.cdc.construction"} />
          </div>
        </div>
        <div className="p-2 flex flex-col justify-center col-span-2">
          <h2 className="text-xs mb-2 uppercase text-neutral-700 tracking-tight font-medium">
            Customer Information
          </h2>
          {/* company logo */}
          <div className="flex gap-4">
            <PhoneCall className="bg-gray-100 rounded-md p-2 size-9 text-neutral-600 cursor-pointer hover:bg-neutral-200 hover:text-neutral-700" />
            <Mail className="bg-gray-100 rounded-md p-2 size-9 text-neutral-600 cursor-pointer hover:bg-neutral-200 hover:text-neutral-700" />
            <MapPinCheck className="bg-gray-100 rounded-md p-2 size-9 text-neutral-600 cursor-pointer hover:bg-neutral-200 hover:text-neutral-700" />
          </div>
          <div className="flex flex-col gap-2 mt-4 max-w-sm">
            <DetailCard title={"Project Name:"} value={"Tower  Bridge"} />
            <DetailCard title={"Customer Name:"} value={" Mr. John Smith"} />
            <DetailCard
              title={"Billing Address:"}
              value={"4517 Washing Ave. Manchester, Kentucky 39495"}
            />
            <DetailCard
              title={"Project Address:"}
              value={"3517 W.Gray St. Central London , UK"}
            />
            <DetailCard title={"Project Status:"} value={"In Progress"} />
          </div>
        </div>
      </div>
      <div className="py-4">
        <h2 className="text-xs mb-2 uppercase text-neutral-700 tracking-tight font-semibold">
          Project Images
        </h2>
        <ProjctImages />
      </div>
      <StatusChart id={id} />
      <div className="flex gap-4 py-4">
        <ReportCategoryTrackerChart
          chartData={categoryTotal?.chartData}
          cardFooterTitle="All expense category with total amount"
          chartDescription=" Showing only category who is used in with  total amount"
        />
        <ReportCategoryTrackerChart
          chartData={taskTotal}
          chartTitle={"Total Task by month"}
          chartDescription={`Show total task by month ${new Date().getFullYear()}`}
        />
      </div>
      <div className="flex gap-4">
        {chartData && <ReportExpenseTrackerChart chartData={chartData} />}
        {employeChartData && (
          <ReportEmployeTrackerChart chartData={employeChartData} />
        )}
      </div>
      <BarChartMonth chartData={barData?.chartData} chartConfig={chartConfig} />
      <div>
        <BillingPage />
      </div>
    </div>
  );
};
const DetailCard = ({ title, value }) => {
  return (
    <div className="flex flex-row bg-white">
      <h3 className="text-sm text-neutral-500 font-medium w-1/2">{title}</h3>
      <p className="text-neutral-800 text-sm font-medium w-2/3">{value}</p>
    </div>
  );
};

const ProjctImages = () => {
  return (
    <div className="lg:grid-cols-3 sm:grid-cols-2 gap-5 grid-cols-1 grid">
      <ImageCard
        title={"Initial Design"}
        description={
          " In intitial  design we have to design the building and  the surrounding area"
        }
      />
      <ImageCard
        title={"Design Progress"}
        description={
          "This is the second stage of the project and in this stage playing area  is designed"
        }
      />
      <ImageCard
        title={"Final Design"}
        description={
          " This is the final stage of the project and  in this stage the final design is done"
        }
      />
    </div>
  );
};
const ImageCard = ({ title, description, images }) => {
  return (
    <div className="bg-white  border-gray-200 border rounded-xl relative">
      <div className="grid-cols-5 h-80 grid">
        <div className="pe-0 p-1 col-span-3">
          <Image
            className="object-cover bg-gray-100 rounded-lg w-full h-[calc(20rem-8px)]"
            src={
              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=3058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="test"
            width={200}
            height={200}
          />
        </div>
        <div className="p-1 col-span-2 space-y-1">
          <Image
            className="object-cover bg-gray-100 rounded-lg w-full h-[calc(10rem-6px)]"
            src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="test"
            width={200}
            height={200}
          />
          <Image
            className="object-cover bg-gray-100 rounded-lg w-full h-[calc(10rem-6px)]"
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="test"
            width={200}
            height={200}
          />
        </div>
      </div>
      {/* Body */}
      <div className="text-center p-6">
        <h4 className="text-neutral-800 font-medium text-base">{title}</h4>
        <p className="text-neutral-600 text-sm mt-1">{description}</p>
        <p className="mt-3">
          <span className=" underline-offset-4 underline text-neutral-700 text-sm gap-x-1.5 items-center inline-flex">
            View More
          </span>
        </p>
      </div>
      {/* End Body */}
      <a href="#" className="after:z-10 after:inset-0 after:absolute"></a>
    </div>
  );
};

const CustomerReview = () => {
  return (
    <div className="py-10 bg-white max-w-7xl w-full mx-auto">
      <div className="max-w-md w-full mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-neutral-800 md:text-2xl text-xl">
            Write a Reviews
          </h2>
        </div>
        {/* End Headng */}
        <div className="space-y-8">
          {/* Site Info */}
          <div>
            <div className="p-3 border border-gray-200 rounded-xl gap-x-5 items-center flex -ms-3">
              <Image
                className="object-cover bg-white rounded-lg shrink-0 size-16"
                src={
                  "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Tower Bridge"
                width={50}
                height={50}
              />
              <div className="grow">
                <h2 className="text-neutral-800">Tower Bridge</h2>
              </div>
            </div>
          </div>
          {/* Rating */}
          <div>
            <h3 className="text-neutral-700 font-medium text-sm mb-3">
              Would you like to rate this place?
            </h3>
            {/* Radio Group */}
            <div className="gap-2 grid-cols-2 grid">
              <label className="text-neutral-800 text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="like"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  <span className="text-base me-1">😀</span>
                  <span className="text-sm">Yes</span>
                </span>
              </label>
              <label className="text-neutral-800 text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="like"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  <span className="text-base me-1">😠</span>
                  <span className="text-sm">No</span>
                </span>
              </label>
            </div>
          </div>
          {/* Fit Rating */}
          <div>
            <h3 className="text-neutral-700 font-medium text-sm mb-3">
              How would you describe the interior?
            </h3>
            {/* Heading */}
            <div className="gap-5 justify-between items-center flex mb-3">
              <span className="text-neutral-600 text-xs"> Good</span>
              <span className="text-neutral-600 text-xs"> Average</span>
              <span className="text-neutral-600 text-xs"> Bad</span>
            </div>
            {/* Radio Group */}
            <div className="gap-5 justify-between flex items-center relative after:bg-gray-200 after:-translate-y-1/2 after:w-full after:h-px after:top-1/2 after:inset-x-0 after:absolute">
              {/* Radio */}
              <label
                htmlFor="good"
                className="group text-sm items-center inline-flex z-10 relative"
              >
                <input
                  id="good"
                  type="radio"
                  name="interior"
                  className="text-indigo-600 border-gray-200 border rounded-full cursor-pointer shrink-0 size-5 dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800 has-[:checked]:bg-[url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e)] has-[:checked]:border-transparent has-[:checked]:bg-white has-[:checked]:bg-center bg-no-repeat bg-[length:100%_100%]"
                />
                <span className="sr-only">Good</span>
              </label>
              <label
                htmlFor="slightly-good"
                className="group text-sm items-center inline-flex z-10 relative"
              >
                <input
                  id="slightly-good"
                  type="radio"
                  name="interior"
                  className="text-indigo-600 border-gray-200 border rounded-full cursor-pointer shrink-0 size-5 dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800 has-[:checked]:bg-[url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e)] has-[:checked]:border-transparent has-[:checked]:bg-white has-[:checked]:bg-center bg-no-repeat bg-[length:100%_100%]"
                />
                <span className="sr-only">Slightly Good</span>
              </label>
              <label
                htmlFor="avarage"
                className="group text-sm items-center inline-flex z-10 relative"
              >
                <input
                  id="avarage"
                  type="radio"
                  name="interior"
                  className="text-indigo-600 border-gray-200 border rounded-full cursor-pointer shrink-0 size-5 dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800 has-[:checked]:bg-[url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e)] has-[:checked]:border-transparent has-[:checked]:bg-white has-[:checked]:bg-center bg-no-repeat bg-[length:100%_100%]"
                />
                <span className="sr-only">Avarage</span>
              </label>
              <label
                htmlFor="slightly-avarge"
                className="group text-sm items-center inline-flex z-10 relative"
              >
                <input
                  id="slightly-avarge"
                  type="radio"
                  name="interior"
                  className="text-indigo-600 border-gray-200 border rounded-full cursor-pointer shrink-0 size-5 dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800 has-[:checked]:bg-[url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e)] has-[:checked]:border-transparent has-[:checked]:bg-white has-[:checked]:bg-center bg-no-repeat bg-[length:100%_100%]"
                />
                <span className="sr-only">Slightly Avarge</span>
              </label>
              <label
                htmlFor="slightly-bad"
                className="group text-sm items-center inline-flex z-10 relative"
              >
                <input
                  id="slightly-bad"
                  type="radio"
                  name="interior"
                  className="text-indigo-600 border-gray-200 border rounded-full cursor-pointer shrink-0 size-5 dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800 has-[:checked]:bg-[url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e)] has-[:checked]:border-transparent has-[:checked]:bg-white has-[:checked]:bg-center bg-no-repeat bg-[length:100%_100%]"
                />
                <span className="sr-only">Slightly Bad</span>
              </label>
              <label
                htmlFor="bad"
                className="group text-sm items-center inline-flex z-10 relative"
              >
                <input
                  id="bad"
                  type="radio"
                  name="interior"
                  className="text-indigo-600 border-gray-200 border rounded-full cursor-pointer shrink-0 size-5 dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800 has-[:checked]:bg-[url(data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e)] has-[:checked]:border-transparent has-[:checked]:bg-white has-[:checked]:bg-center bg-no-repeat bg-[length:100%_100%]"
                />
                <span className="sr-only">Bad</span>
              </label>
            </div>
          </div>
          {/* OverAll Rating */}
          <div>
            <h3 className="text-neutral-700 font-medium text-sm mb-3">
              OverAll Rating
            </h3>
            <div className="gap-2 grid-cols-5 grid">
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="overall"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  1
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="overall"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  2
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>{" "}
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="overall"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  3
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>{" "}
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="overall"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  4
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>{" "}
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="overall"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  5
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>
            </div>
          </div>
          {/* Rate Comfort */}
          <div>
            <h3 className="text-neutral-700 font-medium text-sm mb-3">
              How would you rate the comfort of the product?
            </h3>
            <div className="gap-2 grid-cols-5 grid">
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="comfort"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  1
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="comfort"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  2
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>{" "}
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="comfort"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  3
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>{" "}
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="comfort"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  4
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>{" "}
              <label className="text-neutral-800 group text-xs text-center p-2.5 bg-white border border-gray-200 rounded-lg gap-x-3 justify-center items-center cursor-pointer flex relative has-[:checked]:text-indigo-600 has-[:checked]:border-indigo-600 has-[:checked]:ring-1 has-[:checked]:ring-indigo-600 has-[:disabled]:after:bg-[linear-gradient(to_right_bottom,transparent_calc(50%_-_1px),theme(colors.gray.200)_calc(50%_-_1px),theme(colors.gray.200)_50%,transparent_50%)]">
                <input
                  type="radio"
                  //   className="sr-only peer"
                  name="comfort"
                  className="hidden text-blue-600 bg-transparent border-gray-200 appearance-none"
                />
                <span className="block">
                  5
                  <Star className="shrink-0 size-4 mb-1 group-has-[:checked]:fill-indigo-600" />
                </span>
              </label>
            </div>
          </div>
          {/* Headline */}
          <div>
            <label
              htmlFor="headline"
              className="block text-neutral-800 font-medium text-sm mb-2"
            >
              Add a headline
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              className="sm:text-sm py-3 px-4 border border-gray-200 rounded-lg w-full block outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          {/* Review */}
          <div>
            <label
              htmlFor="review"
              className="block text-neutral-800 font-medium text-sm mb-2"
            >
              Add a review
            </label>
            <textarea
              type="text"
              id="review"
              name="review"
              rows={4}
              className="sm:text-sm py-3 px-4 border border-gray-200 rounded-lg w-full block outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          {/* Review */}
          <div>
            <label
              htmlFor="name"
              className="block text-neutral-800 font-medium text-sm mb-2"
            >
              Project Manager Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="sm:text-sm py-3 px-4 border border-gray-200 rounded-lg w-full block outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter Name"
            />
          </div>
          {/* Review */}
          <div>
            <label
              htmlFor="email"
              className="block text-neutral-800 font-medium text-sm mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="sm:text-sm py-3 px-4 border border-gray-200 rounded-lg w-full block outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="example@cdc.construction"
            />
            <p className="text-neutral-500 text-xs mt-2">
              We will use your email address to follow-up on account issues, and
              for no other purpose.
            </p>
          </div>
          {/* Button */}
          <Button className="bg-gradient-to-b from-cyan-600 to-cyan-900 text-white w-full">
            Submit Review
          </Button>
        </div>
      </div>
    </div>
  );
};
const ThankYou = () => {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50 via-90% to-blue-100 py-4 rounded-md border border-dashed border-cyan-900 pt-4 max-w-sm">
      <div className=" flex flex-col items-center justify-center">
        <Image
          src={"/images/tk.svg"}
          alt="Thank  You"
          height={100}
          width={100}
          className="size-60"
        />
        <p className="mt-4  text-neutral-700 font-semibold text-base tracking-tight">
          Thank you for your valuable review!
        </p>
        <span className="text-sm text-neutral-600">
          Your review will help us improve our services
        </span>
        <Button variant="outline" className="mt-2">
          Thank You 😍
        </Button>
      </div>
    </div>
  );
};

const PerformanceIndicator = () => {
  return (
    <div className="space-y-3 my-4">
      {/* Header */}
      <div className="mt-3">
        <h4 className="text-neutral-400 text-sm"> Performance Indicator</h4>
        <span className="text-neutral-700 font-semibold text-xl block">
          Tower Bridge
        </span>
      </div>
      {/* Indicator */}
      <div className="flex items-center justify-between mb-1">
        <div className="inline-flex w-1/4 items-center">
          <span className="sm:inline-flex bg-red-500 rounded shrink-0 size-2.5 hidden me-1.5"></span>
          <span className="text-neutral-800 text-sm">Bad</span>
        </div>
        <div className="inline-flex w-1/4 items-center">
          <span className="sm:inline-flex bg-orange-500 rounded shrink-0 size-2.5 hidden me-1.5"></span>
          <span className="text-neutral-800 text-sm">Average</span>
        </div>
        <div className="inline-flex w-1/4 items-center">
          <span className="sm:inline-flex bg-yellow-200 rounded shrink-0 size-2.5 hidden me-1.5"></span>
          <span className="text-neutral-800 text-sm">Good</span>
        </div>
        <div className="inline-flex w-1/4 items-center">
          <span className="sm:inline-flex bg-teal-400 rounded shrink-0 size-2.5 hidden me-1.5"></span>
          <span className="text-neutral-800 text-sm"> Excellent</span>
        </div>
      </div>
      {/*   Progress */}
      <div className="relative">
        <div className="bg-gray-200 rounded-full overflow-hidden w-full h-2.5 flex">
          <div className="bg-white text-xs text-center bg-gradient-to-r from-[#ef4444] via-[#facc15] to-[#2dd4bf] whitespace-nowrap overflow-hidden justify-center flex-col w-full flex"></div>
        </div>
        <div className="absolute bg-[#f97316] border-white border-2 rounded-full transform -translate-y-1/2 w-2 h-5 top-1/2 start-[40%]"></div>
      </div>
    </div>
  );
};

const BillingPage = () => {
  return (
    <div className=" space-y-3 md:p-8 shadow-sm p-5 bg-white border-gray-200 border rounded-xl">
      {/* <!-- Title --> */}
      <div className="xl:mb-8 gap-x-3 justify-between flex ">
        <div>
          <h1 className="text-gray-800 font-semibold text-lg">
            Plan &amp; Budget
          </h1>
          <p className=" text-sm text-gray-500">
            Manage your budget and plan with ease and minimum risk.
          </p>
        </div>
        {/* <!-- End Col --> */}

        <div className=" flex-shrink-0">
          <Button
            variant="outline"
            className="flex items-center shadow-sm text-neutral-700 text-sm py-2 px-3 bg-gradient-to-r from-[#ffedd5] via-[#e9d5ff] via-70% to-[#c7d2fe] border-none rounded-lg gap-x-2 hover:text-white hover:bg-gradient-to-r hover:from-neutral-700 hover:to-slate-700"
          >
            <Sparkles className="shrink-0 size-4" />
            Try with AI
          </Button>
        </div>
      </div>

      {/*  we have to add some fincial  health tips here like improve task  management, improve financial literacy, improve financial planning, improve financial discipline, improve financial goal setting */}

      {/* <!-- End Title --> */}

      <div className="space-y-11">
        {/* <!-- Grid --> */}
        <div className="xl:grid gap-6 xl:grid-cols-2 flex flex-col">
          {/* <!-- Card --> */}
          <div className="flex border rounded-xl flex-col">
            {/* <!-- Body --> */}
            <div className=" p-2 h-full">
              <Image
                src={"/images/Logo.svg"}
                alt="CDC"
                width={40}
                height={40}
                className=" h-8 w-9"
              />
              {/* <!-- Grid --> */}
              <div className=" gap-x-2 grid-cols-2 grid mt-3">
                <div>
                  <div className="flex items-center gap-x-2">
                    <h2 className="text-gray-800 font-semibold  text-lg">
                      Tower Bridge
                    </h2>
                    <span className="inline-flex items-center text-amber-800 font-medium text-xs px-2 py-2 bg-amber-100  rounded-full gap-1 ">
                      {/* <span className="bg-cyan-800 rounded-full size-[0.375rem] inline-block"></span> */}
                      <span className="bg-amber-600 rounded-full size-2 absolute animate-ping"></span>
                      <span className="bg-amber-600 rounded-full size-2"></span>
                      In Progress
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mt-2">
                    Finish on November 29th, 2024
                  </p>
                </div>
                {/* <!-- End Col --> */}

                <div className=" text-end">
                  <h2 className="text-gray-800 font-semibold text-2xl">
                    £673.33
                  </h2>

                  <p className="text-gray-500 text-sm">Avg. Monthly</p>
                </div>
                {/* <!-- End Col --> */}
              </div>
              {/* <!-- End Grid --> */}

              {/* <!-- Progress --> */}
              <div className=" my-4">
                <div className="flex items-center gap-x-2 justify-between mb-1">
                  <h4 className="text-gray-800 font-medium">Budget</h4>
                  <p className="text-gray-500 text-sm">£12,000</p>
                </div>
                <div
                  className="flex w-full bg-gray-200 rounded-full overflow-hidden h-2"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="flex bg-cyan-600 text-xs text-white text-center rounded-full whitespace-nowrap overflow-hidden justify-center flex-col"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
              {/* <!-- End Progress --> */}

              <div className=" w-full mx-auto">
                <div className="sm:ps-16 p-2 bg-gradient-to-r from-[#ffedd5] via-[#e9d5ff] via-70% to-[#c7d2fe] rounded-md overflow-hidden mb-2 relative">
                  <div className="flex items-center gap-x-3">
                    <div className="hidden sm:block -start-4 -bottom-2 absolute">
                      <div className="text-7xl">🏕️</div>
                    </div>
                    <div className="grow">
                      <h4 className="text-orange-700 font-medium">
                        Improve your Risk Management
                      </h4>
                      <p className="text-neutral-800 text-xs mt-1">
                        Get the best financial health tips and advice to improve
                        your financial health.
                      </p>
                    </div>
                    <button className="text-neutral-800 text-xs border-transparent rounded-full gap-x-1 justify-center items-center inline-flex size-7">
                      <X className="shrink-0 size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Body --> */}

            {/* <!-- Footer --> */}
            <div className="flex border-t divide-x border-gray-200">
              <button
                type="button"
                className=" shadow-sm rounded-es-xl gap-x-2 divide-gray-200 divide-x justify-center w-full inline-flex items-center cursor-pointer text-gray-800 font-medium text-sm py-3 px-4 bg-white hover:bg-rose-50"
                data-hs-overlay="#hs-pro-dlcsam"
              >
                Close Project
              </button>
              <a
                className="w-full items-center divide-x divide-gray-400 divide-solid shadow-sm text-gray-800 font-medium rounded-ee-xl text-sm py-3 px-4 gap-x-2 justify-center inline-flex hover:bg-cyan-50"
                href="../../pro/dashboard/plans.html"
              >
                Update Date
                <ArrowUpRight className="shrink-0 size-4" />
              </a>
            </div>
            {/* <!-- End Footer --> */}
          </div>
          {/* <!-- End Card --> */}

          {/* <!-- Card --> */}
          <div className="flex flex-col rounded-xl border border-gray-200">
            {/* <!-- Body --> */}
            <div className=" p-6 h-full">
              <h2 className="text-gray-800 font-semibold text-lg">
                Payment methods
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Add and manage your payment methods using our secure payment
                system.
              </p>

              {/* <!-- List Group --> */}
              <ul className="flex bg-white border-gray-200 border rounded-xl flex-col mt-4 -space-y-px">
                {/* <!-- List Item --> */}
                <li className=" border-t-0 p-3 border-gray-200">
                  {/* <!-- Media --> */}
                  <div className="flex gap-x-3">
                    {/* <!-- Logo --> */}
                    <div>
                      <div className=" px-3 py-[0.65rem] border rounded-lg">
                        <svg
                          className="flex-shrink-0 w-8 h-auto"
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
                    <div className=" sm:gap-x-3 sm:justify-between sm:flex gap-y-2 flex-grow">
                      <div>
                        <p className="text-gray-800 font-medium text-sm">
                          Visa •••• 9016
                        </p>
                        <p className="text-gray-500 text-xs">
                          Debit - Expires 12/25
                        </p>
                      </div>

                      {/* <!-- Button Group --> */}
                      <div className="flex gap-x-2">
                        <div>
                          <button
                            type="button"
                            className=" opacity-50 pointer-events-none shadow-sm text-gray-800 font-medium text-xs py-2 px-[0.625rem] bg-white border-gray-200 border rounded-lg gap-x-2 items-center inline-flex"
                            disabled=""
                          >
                            Default
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="text-gray-800 font-semibold text-xs py-2 px-[0.625rem] bg-gray-200 border-transparent border rounded-lg items-center inline-flex"
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
                <li className="-space-y-px p-3 border-gray-200 border-t">
                  {/* <!-- Media --> */}
                  <div className="flex gap-x-3">
                    {/* <!-- Logo --> */}
                    <div>
                      <div className=" px-3 py-[0.65rem] border rounded-lg">
                        <svg
                          className="flex-shrink-0 w-8 h-auto"
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
                    <div className=" sm:gap-x-3 sm:justify-between sm:flex gap-y-2 flex-grow">
                      <div>
                        <p className="text-gray-800 font-medium text-sm">
                          MasterCard •••• 4242
                        </p>
                        <p className="text-gray-500 text-xs">
                          Debit - Expires 04/24
                        </p>
                      </div>

                      {/* <!-- Button Group --> */}
                      <div className="flex gap-x-2">
                        <div>
                          <button
                            type="button"
                            className="shadow-sm text-gray-800 font-medium text-xs py-2 px-[0.625rem] bg-white border-gray-200 border rounded-lg gap-x-2 items-center inline-flex"
                          >
                            Set as default
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="text-gray-800 font-semibold text-xs py-2 px-[0.625rem] bg-gray-200 border-transparent border rounded-lg items-center inline-flex"
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
            <div className="flex border-t divide-x border-gray-200">
              <button
                type="button"
                className=" shadow-sm rounded-es-xl gap-x-2 divide-gray-200 divide-x justify-center w-full inline-flex items-center cursor-pointer text-gray-800 font-medium text-sm py-3 px-4 bg-white "
                data-hs-overlay="#hs-pro-dlcsam"
              >
                Manage cards
              </button>
              <button
                type="button"
                className=" shadow-sm rounded-ee-xl gap-x-2 divide-gray-200 divide-x justify-center w-full inline-flex items-center cursor-pointer text-gray-800 font-medium text-sm py-3 px-4 bg-white "
                data-hs-overlay="#hs-pro-dlcsam"
              >
                <svg
                  className=" flex-shrink-0 size-4"
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
      </div>
    </div>
  );
};
