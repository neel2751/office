"use client";

import * as React from "react";
import { Square, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartConfig = {
  count: {
    label: "Count",
  },
  notstarted: {
    label: "Not Started",
    color: "hsl(var(--chart-3))",
  },
  inprogress: {
    label: "In Progress",
    color: "hsl(var(--chart-4))",
  },
  review: {
    label: "Review",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
  onhold: {
    label: "On Hold",
    color: "hsl(var(--chart-5))",
  },

  high: {
    label: "High",
    color: "hsl(var(--chart-1))",
  },
  medium: {
    label: "Medium",
    color: "hsl(var(--chart-4))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-2))",
  },
};

export function PieCharts({
  chartData,
  totalTask,
  chartTitle,
  chartDesc,
  chartLabel,
}) {
  return (
    <div className="w-full">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>{chartTitle || "Chart Title"}</CardTitle>
          <CardDescription>{chartDesc || "Chart Description"}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalTask || 0}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {chartLabel || "Total"}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex gap-2 text-sm items-center justify-center">
          {chartData?.map((item) => {
            // Find matching chartConfig for the current status
            const configKey = item.status.toLowerCase().replace(/\s+/g, ""); // Convert to lowercase and remove spaces to match keys in chartConfig
            const config = chartConfig[configKey]; // Access the config using the computed key
            return (
              <div key={item.status} className="flex items-center gap-2">
                <Square
                  className="size-4 stroke-none"
                  style={{ fill: config?.color }} // Apply the matching color from chartConfig
                />
                {config?.label || item.status}
              </div>
            );
          })}
        </CardFooter>
      </Card>
    </div>
  );
}

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

export function BarComponent({ chartData, totalTask }) {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Chart</CardTitle>
          <CardDescription>All Task data {totalTask}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="status"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                //   tickFormatter={(value) => chartConfig[value]?.label}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="count"
                strokeWidth={2}
                radius={8}
                activeIndex={2}
                activeBar={({ ...props }) => {
                  return (
                    <Rectangle
                      {...props}
                      fillOpacity={0.8}
                      stroke={props.payload.fill}
                      strokeDasharray={4}
                      strokeDashoffset={4}
                    />
                  );
                }}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Task Trending up by 5.2% this month
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total task for the last 12 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
