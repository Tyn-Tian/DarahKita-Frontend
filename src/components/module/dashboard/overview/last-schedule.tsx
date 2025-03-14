"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { getLastDonorSchedule } from "@/services/overview/overviewService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function LastSchedule() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["last-schedule"],
    queryFn: async () => {
      const response = await getLastDonorSchedule();
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["last-schedule"]),
  });

  if (isLoading) {
    return (
      <Skeleton className="min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    );
  }

  return (
    <Card className="flex-1 rounded-xl md:min-h-min">
      {error ? (
        <>
          <CardHeader>
            <CardTitle>Belum Ada Jadwal Donor Darah</CardTitle>
          </CardHeader>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Jadwal Donor Darah Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-3">
              <Label htmlFor="date">Tanggal Pelaksanaan</Label>
              <Input
                className="text-sm sm:text-base sm:w-1/4 mt-2"
                id="date"
                type="date"
                readOnly
                value={data ? data.date : ""}
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="address">Lokasi</Label>
              <Textarea
                className="text-sm sm:text-base sm:w-4/5 mt-2"
                id="address"
                readOnly
                value={data ? data.address : ""}
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="time">Jam Pelaksanaan</Label>
              <Input
                className="text-sm sm:text-base sm:w-min mt-2"
                id="time"
                type="time"
                readOnly
                value={data ? data.time : ""}
              />
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
