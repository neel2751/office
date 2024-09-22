// "use client";
// import React, { useRef, useEffect } from "react";
// import {
//   Chart,
//   //   Geom, Axis, Tooltip, Coord, Guide, Legend, Facet, Shape, Interval, Line, GuideLine, GuideDot, GuideText, FacetPie, FacetColumn, FacetRow, Scale, Util, UtilMixin, UtilMethods, UtilTypes, UtilProps, UtilEvents, UtilState, UtilComputed, UtilWatch, UtilLifecycle, UtilRender, UtilStyle, UtilClass, UtilPropsMixin, UtilEventsMixin, UtilStateMixin, UtilComputedMixin, UtilWatchMixin, UtilLifecycleMixin,
//   LineController,
//   BarController,
//   BarElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// Chart.register(
//   LineElement,
//   BarController,
//   BarElement,
//   LineController,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );
// export const LineChart = ({ data, options }) => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");

//     // Destroy previous chart instance if it exists
//     if (chartInstanceRef.current) {
//       chartInstanceRef.current.destroy();
//     }

//     // Create new chart instance
//     chartInstanceRef.current = new Chart(ctx, {
//       type: "bar",
//       data: data,
//       options: options,
//     });

//     // Cleanup when component unmounts
//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, [data, options]);

//   return (
//     <div className="max-w-7xl mx-auto p-4 w-[600px]">
//       <canvas ref={chartRef}></canvas>;
//     </div>
//   );
// };
// // const Chart = ({ data, options }) => {
// //   return <LineChart data={data} options={options} />; // Export the Chart component
// // };

// // export default Chart;

"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  Area,
  AreaChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Progress } from "../ui/progress";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export function ChartComponent({ chartData }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - December 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="totalHours"
                fill="var(--color-desktop)"
                radius={4}
              ></Bar>
              <Bar
                dataKey="totalPay"
                fill="var(--color-mobile)"
                radius={4}
              ></Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingDown className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
          <Progress value={40} />
        </CardFooter>
      </Card>
    </>
  );
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const chartConfigg = {
  visitors: {
    label: "Visitors",
  },
  TotalHours: {
    label: "TotalHours",
    color: "hsl(var(--chart-1))",
  },
  TotalPay: {
    label: "TotalPay",
    color: "hsl(var(--chart-2))",
  },
};

export function DateWiseChart({ dayData }) {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = dayData?.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Attendance Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total Attendance for the last{" "}
            {timeRange === "90d"
              ? "3 months"
              : timeRange === "30d"
              ? "30 days"
              : "7 days"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfigg}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-TotalHours)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-TotalHours)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-TotalPay)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-TotalPay)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="TotalPay"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-TotalPay)"
              stackId="a"
            />
            <Area
              dataKey="TotalHours"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-TotalHours)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
