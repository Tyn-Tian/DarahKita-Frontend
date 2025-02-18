"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDonationsByMonth } from "@/services/dashboard/dashbaordService";

const chartConfig = {
  desktop: {
    label: "Donor",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SumDonorChart() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["donations-by-month"],
    queryFn: async () => {
      const response = await getDonationsByMonth();
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["donations-by-month"]),
  });

  const chartData = [
    { month: "Januari", Donor: data?.Januari?.donations ?? 0 },
    { month: "Febriari", Donor: data?.Februari?.donations ?? 0 },
    { month: "Maret", Donor: data?.Maret?.donations ?? 0 },
    { month: "April", Donor: data?.April?.donations ?? 0 },
    { month: "Mei", Donor: data?.Mei?.donations ?? 0 },
    { month: "Juni", Donor: data?.Juni?.donations ?? 0 },
  ];

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
              dataKey="Donor"
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
