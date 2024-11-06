import { BarComponent, PieCharts } from "@/components/Chart/PieChart";
import React, { memo } from "react";

const PieChartStatus = memo(({ chartData }) => {
  return (
    <PieCharts
      chartData={chartData?.statusData}
      chartTitle={"Task Status"}
      chartDesc={"Total tasks by status"}
      chartLabel={"Task"}
      totalTask={chartData?.totalTasks}
    />
  );
});

const PieChartPriority = memo(({ chartData }) => {
  return (
    <PieCharts
      chartTitle={"Task Priority"}
      chartDesc={"Total tasks by priority"}
      chartLabel={"Task"}
      chartData={chartData?.priorityData}
      totalTask={chartData?.totalTasks}
    />
  );
});

const BarChartStatus = memo(({ chartData }) => {
  return (
    <BarComponent
      chartData={chartData?.statusData}
      totalTask={chartData?.totalTasks}
    />
  );
});

export { PieChartStatus, PieChartPriority, BarChartStatus };
