"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getHistoryDetail } from "@/services/history/historyService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import HistoryDetailSkeleton from "./history-detail-skeleton";

export default function HistoryDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["history-detail", id],
    queryFn: async () => {
      const response = await getHistoryDetail(id);
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["history-detail"]),
  });

  return (
    <div>
      {isLoading ? (
        <HistoryDetailSkeleton />
      ) : (
        <div className="flex justify-center">
          <div className="mb-5 sm:w-3/5">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Detail History Donor Darah
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Ini adalah informasi detail mengenai history donor darah anda.
            </p>

            <div className="mt-6">
              <Label htmlFor="status">Status</Label>
              <Input
                className="text-sm sm:text-base sm:w-min mt-2"
                id="status"
                type="text"
                value={
                  data
                    ? data.status.charAt(0).toUpperCase() + data.status.slice(1)
                    : ""
                }
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="date">Tanggal Pelaksanaan</Label>
              <Input
                className="text-sm sm:text-base sm:w-min mt-2"
                id="date"
                type="date"
                value={data ? data.date : ""}
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="location">Lokasi</Label>
              <Textarea
                className="text-sm sm:text-base sm:w-4/5 mt-2"
                id="location"
                value={data ? data.location : ""}
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="time">Waktu Pelaksanaan</Label>
              <Input
                className="text-sm sm:text-base sm:w-min mt-2"
                id="time"
                type="time"
                value={data ? data.time : ""}
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="pmi_center">PMI Pelaksana</Label>
              <Input
                className="text-sm sm:text-base sm:w-1/2 mt-2"
                id="pmi_center"
                type="text"
                value={data ? data.pmi : ""}
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="contact">Kontak Pelaksana</Label>
              <Input
                className="text-sm sm:text-base sm:w-min mt-2"
                id="contact"
                type="number"
                value={data ? data.contact : ""}
                readOnly
              />
            </div>

            {data?.status !== "pending" && (
              <>
                <Separator className="my-10" />

                <h2 className="text-base/7 font-semibold text-gray-900">
                  Pemeriksaan Fisik
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Ini adalah informasi dari pemeriksaan fisik anda saat
                  melakukan donor darah.
                </p>

                <div className="flex gap-3 sm:w-3/5 mt-6">
                  <div className="w-3/5">
                    <Label htmlFor="blood">Golongan Darah</Label>
                    <Input
                      className="text-sm sm:text-base mt-2"
                      id="blood"
                      type="text"
                      value={data ? data.blood.toUpperCase() : ""}
                      readOnly
                    />
                  </div>
                  <div className="w-2/5">
                    <Label htmlFor="rhesus">Rhesus</Label>
                    <Input
                      className="text-sm sm:text-base mt-2"
                      id="rhesus"
                      type="text"
                      value={data ? `Rh${data.rhesus}` : ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <div className="sm:w-2/5">
                    <Label htmlFor="systolic">
                      Tekanan Darah Sistolic (mmHg)
                    </Label>
                    <Input
                      className="text-sm sm:text-base"
                      id="systolic"
                      type="text"
                      value={data ? data.systolic : ""}
                      readOnly
                    />
                  </div>
                  <div className="sm:w-2/5">
                    <Label htmlFor="diastolic">
                      Tekanan Darah Diastolic (mmHg)
                    </Label>
                    <Input
                      className="text-sm sm:text-base"
                      id="diastolic"
                      type="text"
                      value={data ? data.diastolic : ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <div className="sm:w-1/3">
                    <Label htmlFor="pulse">Denyut Nadi (bpm)</Label>
                    <Input
                      className="text-sm sm:text-base"
                      id="pulse"
                      type="text"
                      value={data ? data.pulse : ""}
                      readOnly
                    />
                  </div>
                  <div className="sm:w-1/4">
                    <Label htmlFor="weight">Berat Badan (kg)</Label>
                    <Input
                      className="text-sm sm:text-base"
                      id="weight"
                      type="text"
                      value={data ? data.weight : ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <div className="sm:w-1/5">
                    <Label htmlFor="temperatur">Suhu Tubuh</Label>
                    <Input
                      className="text-sm sm:text-base"
                      id="temperatur"
                      type="text"
                      value={data ? data.temperatur : ""}
                      readOnly
                    />
                  </div>
                  <div className="sm:w-1/4">
                    <Label htmlFor="hemoglobin">Kadar Hemoglobin (g/dl)</Label>
                    <Input
                      className="text-sm sm:text-base"
                      id="hemoglobin"
                      type="text"
                      value={data ? data.hemoglobin : ""}
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}

            <Separator className="mt-10 mb-5" />

            <div className="flex justify-end">
              <Button variant="destructive" asChild>
                <Link href="/history">Kembali</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
