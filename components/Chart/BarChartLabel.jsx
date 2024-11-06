// "use client";
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// export const description = "A Employee Total Pay & Hours";
// const chartConfig = {
//   totalCost: {
//     label: "TotalCost",
//     color: "hsl(var(--chart-4))",
//   },
//   totalHours: {
//     label: "TotalHours",
//     color: "hsl(var(--chart-2))",
//   },
// };

// export function BarChartLabel({ chartData }) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Month Wise</CardTitle>
//         <CardDescription>
//           January - December {new Date().getFullYear()}{" "}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               // dataKey={Object.keys(chartData[0])[0]}
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//             <ChartLegend content={<ChartLegendContent />} />
//             <Bar
//               dataKey="totalCost"
//               stackId="a"
//               fill="var(--color-totalCost)"
//               radius={[0, 0, 4, 4]}
//             />
//             <Bar
//               dataKey="totalHours"
//               stackId="a"
//               fill="var(--color-totalHours)"
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="leading-none text-muted-foreground">
//           Showing total pay & hour for the current year
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { memo } from "react";

export const BarChartMonth = memo(function BarChartMonth({
  chartData,
  chartConfig,
}) {
  return (
    <ChartContainerMonth chartConfig={chartConfig} chartData={chartData} />
  );
});

const ChartContainerMonth = memo(({ chartConfig, chartData }) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          // dataKey={Object.keys(chartData[0])[0]}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        {Object.entries(chartConfig).map(([key, { lable, color, radius }]) => (
          <Bar
            dataKey={key}
            fill={color}
            key={key}
            stackId={"a"}
            radius={radius}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
});
