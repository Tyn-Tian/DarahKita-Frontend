"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatDateIntl, getUserRole } from "@/lib/utils";
import {
  getDonorScheduleDetail,
  postRegisterDonorSchedule,
  postUpdateDonorSchedule,
} from "@/services/donor-schedule/donorScheduleService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Syringe } from "lucide-react";
import Link from "next/link";
import RegistButton from "./regist-button";
import DonorScheduleDetailSkeleton from "./donor-schedule-detail-skeleton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubmitButton from "@/components/submit-button";

const FormSchema = z.object({
  date: z
    .string()
    .nonempty({ message: "Tanggal pelaksanaan tidak boleh kosong" })
    .refine(
      (value) => {
        const today = new Date();
        const selectedDate = new Date(value);

        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        return selectedDate > today;
      },
      { message: "Tanggal harus minimal H+1 (besok)" }
    ),
  location: z
    .string()
    .nonempty({ message: "Lokasi tidak boleh kosong" })
    .min(10, { message: "Alamat harus terdiri dari minimal 10 karakter" })
    .max(100, { message: "Alamat tidak boleh lebih dari 100 karakter" }),
  time: z
    .string()
    .nonempty({ message: "Waktu pelaksanaan tidak boleh kosong" }),
});

export default function DonorScheduleDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isPmi = getUserRole() === "pmi";
  const isDonor = !isPmi;

  const {
    data: donorSchedule,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donor-schedule-detail", id],
    queryFn: async () => {
      const response = await getDonorScheduleDetail(id);
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["donor-schedule-detail"]),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: donorSchedule
      ? donorSchedule
      : {
          date: "",
          location: "",
          time: "",
        },
  });

  useEffect(() => {
    if (donorSchedule) {
      form.reset(donorSchedule);
    }
  }, [donorSchedule, form]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Fetch Data Jadwal Donor Gagal",
        description:
          "Terjadi kesalahan saat fetch data jadwal donor. Coba reload website",
        variant: "destructive",
      });
    }
  });

  const registDonorScheduleMutation = useMutation({
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

  const updateDonorScheduleMutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      await postUpdateDonorSchedule(id, data);
    },
    onSuccess: () => {
      toast({
        title: "Update Jadwal Donor Berhasil",
        description: "Anda berhasil update data jadwal donor",
      });
      queryClient.invalidateQueries({
        queryKey: ["donor-schedule-detail", id],
      });
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memperbarui jadwal donor",
      });
    },
  });

  const onRegist = () => registDonorScheduleMutation.mutate();
  const onSubmit = (data: z.infer<typeof FormSchema>) =>
    updateDonorScheduleMutation.mutate(data);

  if (isLoading) {
    return <DonorScheduleDetailSkeleton isDonor={isDonor} />;
  }

  return (
    <div>
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-5 sm:w-3/5"
            noValidate
          >
            <h2 className="text-base/7 font-semibold text-gray-900">
              Detail Jadwal Donor Darah
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Ini adalah informasi detail mengenai jadwal donor darah.
            </p>

            {!isPmi && (
              <>
                {!donorSchedule?.isDonor &&
                  !donorSchedule?.isScheduleRegistered &&
                  !donorSchedule?.isRegistered && (
                    <Alert variant="destructive" className="mt-3 -mb-3">
                      <AlertCircle className="w-4 h-4" />
                      <AlertTitle>Pemberitahuan</AlertTitle>
                      <AlertDescription>
                        Anda belum bisa melakukan pendaftaran donor darah.
                        Karena belum 4 bulan semenjak donor darah terakhir. [
                        {formatDateIntl(donorSchedule?.lastDonation ?? "")}]
                      </AlertDescription>
                    </Alert>
                  )}

                {donorSchedule?.isScheduleRegistered && (
                  <Alert className="mt-3 -mb-3">
                    <Syringe className="w-4 h-4" />
                    <AlertTitle>Pemberitahuan</AlertTitle>
                    <AlertDescription>
                      Anda sudah melakukan pendaftaran pada jadwal donor darah
                      ini.
                    </AlertDescription>
                  </Alert>
                )}

                {donorSchedule?.isRegistered &&
                  !donorSchedule?.isScheduleRegistered && (
                    <Alert className="mt-3 -mb-3">
                      <Syringe className="w-4 h-4" />
                      <AlertTitle>Pemberitahuan</AlertTitle>
                      <AlertDescription>
                        Anda sudah melakukan pendaftaran pada jadwal donor darah
                        lain.
                      </AlertDescription>
                    </Alert>
                  )}
              </>
            )}

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Tanggal Pelaksanaan</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm sm:text-base sm:w-1/4"
                      type="date"
                      readOnly={!isPmi}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Lokasi</FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-sm sm:text-base sm:w-4/5"
                      readOnly={!isPmi}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Jam Pelaksanaan</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm sm:text-base sm:w-min"
                      type="time"
                      readOnly={!isPmi}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isPmi && (
              <>
                <div className="mt-6">
                  <Label htmlFor="pmi_center">PMI Pelaksana</Label>
                  <Input
                    className="text-sm sm:text-base sm:w-1/2 mt-2"
                    id="pmi_center"
                    type="text"
                    value={donorSchedule ? donorSchedule.name : ""}
                    readOnly
                  />
                </div>

                <div className="mt-6">
                  <Label htmlFor="contact">Kontak Pelaksana</Label>
                  <Input
                    className="text-sm sm:text-base sm:w-min mt-2"
                    id="contact"
                    type="text"
                    value={donorSchedule ? donorSchedule.contact : ""}
                    readOnly
                  />
                </div>
              </>
            )}

            <Separator className="mt-10 mb-5" />

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="destructive" asChild>
                <Link href="/donor-schedule">Kembali</Link>
              </Button>
              {!isPmi && (
                <>
                  {donorSchedule?.isDonor && (
                    <RegistButton
                      onRegist={onRegist}
                      isLoading={registDonorScheduleMutation.isPending}
                    />
                  )}
                </>
              )}
              {isPmi && (
                <SubmitButton
                  onSubmit={form.handleSubmit(onSubmit)}
                  isLoading={updateDonorScheduleMutation.isPending}
                />
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
