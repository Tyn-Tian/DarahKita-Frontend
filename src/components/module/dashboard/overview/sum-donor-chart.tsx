"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Januari", Orang: 26 },
  { month: "Febriari", Orang: 35 },
  { month: "Maret", Orang: 17 },
  { month: "April", Orang: 23 },
  { month: "Maret", Orang: 19 },
  { month: "Juni", Orang: 14 },
];

const chartConfig = {
  desktop: {
    label: "Orang",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SumDonorChart() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Jumlah Pendonor Tiap Bulan</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="Orang"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
