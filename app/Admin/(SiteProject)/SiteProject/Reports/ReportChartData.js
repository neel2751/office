import { memo } from "react";
import ReportChartComponent from "./reportChart";
import { ChartContainerCategory } from "../Expense/ExpenseCategoryChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ReportExpenseTrackerChart = memo(({ chartData }) => {
  const chartConfig = {
    totalExpense: {
      label: "TotalExpense",
      color: "hsl(var(--chart-1))",
    },
  };
  return (
    <ReportChartComponent
      chartData={chartData}
      chartTitle={"Site Expenses"}
      chartDescription={"Last 3 months total site expenses"}
      chartConfig={chartConfig}
    />
  );
});

const ReportEmployeTrackerChart = memo(({ chartData }) => {
  const chartConfig = {
    totalPay: {
      label: "TotalPay",
      color: "hsl(var(--chart-2))",
    },
    totalHours: {
      label: "TotalHours",
      color: "hsl(var(--chart-1))",
    },
  };
  return (
    <ReportChartComponent
      chartData={chartData}
      chartTitle={" Employee Tracker"}
      chartDescription={" Last 3 months total employee hours and pay"}
      chartConfig={chartConfig}
    />
  );
});

const ReportCategoryTrackerChart = memo(
  ({
    chartData,
    chartTitle,
    chartDescription,
    cardFooterTitle,
    cardFooterDescription,
  }) => {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{chartTitle ?? "Expense Category"}</CardTitle>
          <CardDescription>
            {chartDescription ??
              "January - December" + " " + new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainerCategory chartData={chartData} />
        </CardContent>
        {cardFooterTitle && (
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              {cardFooterTitle ?? "All expense category with total amount"}
            </div>
            <div className="leading-none text-muted-foreground">
              {cardFooterDescription ?? "Showing only category who is used in"}
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);

export {
  ReportEmployeTrackerChart,
  ReportExpenseTrackerChart,
  ReportCategoryTrackerChart,
};
