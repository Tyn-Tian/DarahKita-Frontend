"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { postCreateDonorSchedule } from "@/services/donor-schedule/donorScheduleService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    )
    .refine((value) => {
      const today = new Date();
      const selectedDate = new Date(value);
      const maxDate = new Date();
      maxDate.setMonth(today.getMonth() + 3);
  
      return selectedDate <= maxDate;
    }, { message: "Tanggal hanya bisa dipilih maksimal 3 bulan ke depan" }),
  location: z
    .string()
    .nonempty({ message: "Lokasi tidak boleh kosong" })
    .min(10, { message: "Alamat harus terdiri dari minimal 10 karakter" })
    .max(100, { message: "Alamat tidak boleh lebih dari 100 karakter" })
    .regex(/^[a-zA-Z0-9\s,.-]+$/, {
      message: "Lokasi hanya boleh mengandung huruf, angka, spasi, koma, titik, dan tanda hubung",
    }),
  time: z
    .string()
    .nonempty({ message: "Waktu pelaksanaan tidak boleh kosong" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Format waktu harus HH:mm (24 jam)",
    })
    .refine((value) => {
      const [hours, minutes] = value.split(":").map(Number);
      return hours >= 8 && hours <= 17;
    }, { message: "Waktu harus antara 08:00 dan 17:00" }),
});

export default function DonorScheduleForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      date: "",
      location: "",
      time: "",
    },
  });

  const createDonorScheduleMutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      await postCreateDonorSchedule(data);
    },
    onSuccess: () => {
      toast({
        title: "Membuat Jadwal Donor Darah Berhasil",
        description: "Anda berhasil membuat jadwal donor darah",
      });
      router.push("/donor-schedule");
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat membuat jadwal donor",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) =>
    createDonorScheduleMutation.mutate(data);

  return (
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
                <FormLabel>Tanggal Pelaksanaan</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm sm:text-base sm:w-min"
                    type="time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="mt-10 mb-5" />

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="destructive" asChild>
              <Link href="/donor-schedule">Kembali</Link>
            </Button>
            <SubmitButton
              onSubmit={form.handleSubmit(onSubmit)}
              isLoading={createDonorScheduleMutation.isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
