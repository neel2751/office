import { getTaskChartAction } from "@/actions/tasksAction/taskAction";
import React, { useEffect, useState } from "react";
import {
  BarChartStatus,
  PieChartPriority,
  PieChartStatus,
} from "../../Task/TaskChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainerCategory } from "../../Expense/ExpenseCategoryChart";

const page = ({ id }) => {
  const [statusChartData, setStatusChartData] = useState();
  const getTaskstatusTotal = async () => {
    try {
      const response = await getTaskChartAction(id);
      const data = JSON.parse(response.chartData);
      setStatusChartData(data);
    } catch (error) {
      console.log(error, "Client side Report Error");
    }
  };
  useEffect(() => {
    getTaskstatusTotal();
  }, []);
  return (
    <div className=" flex flex-col gap-4 pt-4 divide-y divide-gray-200">
      <div className="flex gap-4">
        <PieChartStatus chartData={statusChartData} />
        <PieChartPriority chartData={statusChartData} />
      </div>
      <div className="flex gap-4 pt-4">
        <BarChartStatus chartData={statusChartData} />
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Expense Category</CardTitle>
              <CardDescription>
                January - June {new Date().getFullYear()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainerCategory
                chartData={statusChartData?.categoryData}
              />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                All expense category with total amount
              </div>
              <div className="leading-none text-muted-foreground">
                Showing only category who is used in
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
