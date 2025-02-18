"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { blood: "A", "rhesus +": 16, "rhesus -": 13 },
  { blood: "B", "rhesus +": 15, "rhesus -": 20 },
  { blood: "AB", "rhesus +": 7, "rhesus -": 11 },
  { blood: "O", "rhesus +": 13, "rhesus -": 9 },
];

const chartConfig = {
  desktop: {
    label: "Rhesus +",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Rhesus -",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BloodStockChart() {
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Persediaan Darah</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="blood"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="rhesus +" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="rhesus -" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
