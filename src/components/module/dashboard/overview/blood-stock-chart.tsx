"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBloodStocks } from "@/services/dashboard/dashbaordService";

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
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["blood-stock"],
    queryFn: async () => {
      const response = await getBloodStocks();
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["blood-stock"]),
  });

  const chartData = [
    {
      blood: "A",
      "rhesus +": data?.a["rhesus +"] ?? 0,
      "rhesus -": data?.a["rhesus -"] ?? 0,
    },
    {
      blood: "B",
      "rhesus +": data?.b["rhesus +"] ?? 0,
      "rhesus -": data?.b["rhesus -"] ?? 0,
    },
    {
      blood: "AB",
      "rhesus +": data?.ab["rhesus +"] ?? 0,
      "rhesus -": data?.ab["rhesus -"] ?? 0,
    },
    {
      blood: "O",
      "rhesus +": data?.o["rhesus +"] ?? 0,
      "rhesus -": data?.o["rhesus -"] ?? 0,
    },
  ];

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
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="rhesus +" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="rhesus -" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
