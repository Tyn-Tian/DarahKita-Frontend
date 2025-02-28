"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTopDonors } from "@/services/overview/overviewService";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  desktop: {
    label: "Donations",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function LeaderboardDonorChart() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["top-donors"],
    queryFn: async () => {
      const response = await getTopDonors();
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["top-donors"]),
  });

  const chartData = Array.from({ length: 5 }, (_, i) => {
    if (data?.[i]) {
      return {
        name: data[i].name ?? "",
        donations: data[i].donations ?? 0,
      };
    } else {
      return { name: "-", donations: 0 };
    }
  });

  if (isLoading) {
    return <Skeleton className="aspect-video rounded-xl" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard Pendonor Terbanyak</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="donations" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="donations"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="donations"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
