"use client";

import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  getParticipantDetail,
  postUpdateStatusParticipant,
} from "@/services/donor-schedule/donorScheduleService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/submit-button";

const FormSchema = z.object({
  blood: z.string().nonempty({ message: "Pilih golongan darah" }),
  rhesus: z.string().nonempty({ message: "Pilih rhesus" }),
  systolic: z
    .string()
    .nonempty({ message: "Tekanan darah systolic tidak boleh kosong" }),
  diastolic: z
    .string()
    .nonempty({ message: "Tekanan darah diastolic tidak boleh kosong" }),
  pulse: z.string().nonempty({ message: "Detak jantung tidak boleh kosong" }),
  weight: z.string().nonempty({ message: "Berat badan tidak boleh kosong" }),
  temperatur: z.string().nonempty({ message: "Temperatur tidak boleh kosong" }),
  hemoglobin: z.string().nonempty({ message: "Hemoglobin tidak boleh kosong" }),
  worthy: z.boolean().default(false).optional(),
});

export default function ParticipantDetail({
  id,
  donorId,
}: {
  id: string;
  donorId: string;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: participant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["participant-detail", id],
    queryFn: async () => {
      const response = await getParticipantDetail(id, donorId);
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["participant-detail"]),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: participant
      ? participant
      : {
          blood: "",
          rhesus: "",
          systolic: "",
          diastolic: "",
          pulse: "",
          weight: "",
          temperatur: "",
          hemoglobin: "",
          worthy: false,
        },
  });

  useEffect(() => {
    if (participant) {
      form.reset(participant);
    }
  }, [participant, form]);

  const updateStatusMutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      await postUpdateStatusParticipant(id, donorId, data);
    },
    onSuccess: () => {
      toast({
        title: "Update Status Peserta Berhasil",
        description: "Anda berhasil update status peserta",
      });
      queryClient.invalidateQueries({ queryKey: ["participant-detail", id] });
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memperbarui status peserta",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Fetch Data Peserta Gagal",
        description:
          "Terjadi kesalahan saat fetch data peserta. Coba reload website",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const onSubmit = (data: z.infer<typeof FormSchema>) =>
    updateStatusMutation.mutate(data);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form className="mb-5 sm:w-3/5" noValidate>
          <h2 className="text-base/7 font-semibold text-gray-900">
            Detail Peserta Donor Darah
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Ini adalah informasi detail mengenai peserta donor darah.
          </p>

          <div className="mt-6">
            <Label htmlFor="status">Status</Label>
            <Input
              className="text-sm sm:text-base sm:w-min mt-2"
              id="status"
              type="text"
              value={
                participant
                  ? participant.status.charAt(0).toUpperCase() +
                    participant.status.slice(1)
                  : ""
              }
              readOnly
            />
          </div>

          <div className="mt-6">
            <Label htmlFor="name">Nama Pendonor</Label>
            <Input
              className="text-sm sm:text-base sm:w-1/2 mt-2"
              id="name"
              type="text"
              value={participant ? participant.name : ""}
              readOnly
            />
          </div>

          <div className="mt-6">
            <Label htmlFor="last_donation">Donasi Terakhir</Label>
            <Input
              className="text-sm sm:text-base sm:w-min mt-2"
              id="last_donation"
              type="date"
              value={participant ? participant.last_donation : ""}
              readOnly
            />
          </div>

          <div className="mt-6">
            <Label htmlFor="contact">Kontak Pendonor</Label>
            <Input
              className="text-sm sm:text-base sm:w-min mt-2"
              id="contact"
              type="text"
              value={participant ? participant.contact : ""}
              readOnly
            />
          </div>

          <Separator className="my-10" />

          <h2 className="text-base/7 font-semibold text-gray-900">
            Masukan Data Berikut
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Masukan data ini untuk menyelesaikan status donor darah peserta.
          </p>

          <div className="flex gap-3 sm:w-3/5">
            <FormField
              control={form.control}
              name="blood"
              render={({ field }) => (
                <FormItem className="mt-6 w-3/5">
                  <FormLabel>Golongan Darah</FormLabel>
                  {participant?.status !== "pending" ? (
                    <Input
                      className="text-sm sm:text-base"
                      {...field}
                      value={field.value ? field.value.toUpperCase() : ""}
                      readOnly={participant?.status !== "pending"}
                    />
                  ) : (
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className="text-sm sm:text-base"
                            placeholder="Pilih golongan darah"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="a">A</SelectItem>
                        <SelectItem value="b">B</SelectItem>
                        <SelectItem value="o">O</SelectItem>
                        <SelectItem value="ab">AB</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rhesus"
              render={({ field }) => (
                <FormItem className="mt-6 w-2/5">
                  <FormLabel>Rhesus</FormLabel>
                  {participant?.status !== "pending" ? (
                    <Input
                      className="text-sm sm:text-base"
                      {...field}
                      value={field.value ? `Rh${field.value}` : ""}
                      readOnly={participant?.status !== "pending"}
                    />
                  ) : (
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className="text-sm sm:text-base"
                            placeholder="Pilih rhesus"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="+">Rh+</SelectItem>
                        <SelectItem value="-">Rh-</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <FormField
              control={form.control}
              name="systolic"
              render={({ field }) => (
                <FormItem className="sm:w-2/5">
                  <FormLabel>Tekanan Darah Sistolik (mmHg)</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm sm:text-base"
                      {...field}
                      readOnly={participant?.status !== "pending"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diastolic"
              render={({ field }) => (
                <FormItem className="sm:w-2/5">
                  <FormLabel>Tekanan Darah Diastolik (mmHg)</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm sm:text-base"
                      {...field}
                      readOnly={participant?.status !== "pending"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <FormField
              control={form.control}
              name="pulse"
              render={({ field }) => (
                <FormItem className="sm:w-1/3">
                  <FormLabel>Denyut Nadi (bpm)</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm sm:text-base"
                      {...field}
                      readOnly={participant?.status !== "pending"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="sm:w-1/4">
                  <FormLabel>Berat Badan (kg)</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm sm:text-base"
                      {...field}
                      readOnly={participant?.status !== "pending"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <FormField
              control={form.control}
              name="temperatur"
              render={({ field }) => (
                <FormItem className="sm:w-1/5">
                  <FormLabel>Suhu Tubuh</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm sm:text-base"
                      {...field}
                      readOnly={participant?.status !== "pending"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hemoglobin"
              render={({ field }) => (
                <FormItem className="sm:w-1/4">
                  <FormLabel>Kadar Hemoglobin (g/dl)</FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm sm:text-base"
                      {...field}
                      readOnly={participant?.status !== "pending"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {participant && participant.status === "pending" && (
            <FormField
              control={form.control}
              name="worthy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-6">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Apakah peserta memenuhi syarat donor darah?
                    </FormLabel>
                    <FormDescription>
                      Hal ini akan menentukan status donasi peserta.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          )}

          <Separator className="mt-10 mb-5" />

          <div className="flex gap-3 justify-end">
            <Button variant="destructive" asChild>
              <Link href={`/donor-schedule/${id}/participant`}>Kembali</Link>
            </Button>
            {participant && participant.status === "pending" && (
              <SubmitButton
                onSubmit={form.handleSubmit(onSubmit)}
                isLoading={updateStatusMutation.isPending}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
