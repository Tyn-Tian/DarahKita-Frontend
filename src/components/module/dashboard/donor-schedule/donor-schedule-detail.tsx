"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatDateIntl } from "@/lib/utils";
import {
  getDonorScheduleDetail,
  postRegisterDonorSchedule,
} from "@/services/donation/donationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Syringe } from "lucide-react";
import Link from "next/link";
import RegistButton from "./regist-button";
import DonorScheduleDetailSkeleton from "./donor-schedule-detail-skeleton";

export default function DonorScheduleDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["donor-schedule-detail", id],
    queryFn: async () => {
      const response = await getDonorScheduleDetail(id);
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["donor-schedule-detail"]),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await postRegisterDonorSchedule(id);
    },
    onSuccess: () => {
      toast({
        title: "Daftar Jadwal Donor Darah Berhasil",
        description: "Anda berhasil daftar jadwal donor darah",
      });
      queryClient.invalidateQueries({
        queryKey: ["donor-schedule-detail", id],
      });
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat daftar jadwal donor darah",
        variant: "destructive",
      });
    },
  });

  const onRegist = () => mutation.mutate();

  return (
    <div>
      {isLoading ? (
        <DonorScheduleDetailSkeleton />
      ) : (
        <div className="flex justify-center">
          <div className="mb-5 sm:w-3/5">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Detail Jadwal Donor Darah
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Ini adalah informasi detail mengenai jadwal donor darah.
            </p>

            {!data?.isDonor &&
              !data?.isScheduleRegistered &&
              !data?.isRegistered && (
                <Alert variant="destructive" className="mt-3 -mb-3">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Pemberitahuan</AlertTitle>
                  <AlertDescription>
                    Anda belum bisa melakukan pendaftaran donor darah. Karena
                    belum 4 bulan semenjak donor darah terakhir. [
                    {formatDateIntl(data?.lastDonation ?? "")}]
                  </AlertDescription>
                </Alert>
              )}

            {data?.isScheduleRegistered && (
              <Alert className="mt-3 -mb-3">
                <Syringe className="w-4 h-4" />
                <AlertTitle>Pemberitahuan</AlertTitle>
                <AlertDescription>
                  Anda sudah melakukan pendaftaran pada jadwal donor darah ini.
                </AlertDescription>
              </Alert>
            )}

            {data?.isRegistered && !data?.isScheduleRegistered && (
              <Alert className="mt-3 -mb-3">
                <Syringe className="w-4 h-4" />
                <AlertTitle>Pemberitahuan</AlertTitle>
                <AlertDescription>
                  Anda sudah melakukan pendaftaran pada jadwal donor darah lain.
                </AlertDescription>
              </Alert>
            )}

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
                value={data ? data.name : ""}
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

            <Separator className="mt-10 mb-5" />

            <div className="flex gap-3 justify-end">
              <Button variant="destructive" asChild>
                <Link href="/donor-schedulue">Kembali</Link>
              </Button>
              {data?.isDonor && <RegistButton onRegist={onRegist} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
