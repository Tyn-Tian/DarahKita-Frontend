"use client";

import SubmitButton from "@/components/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CancelButton from "../profile/cancel-button";
import { postAddDonation } from "@/services/donation/donationService";

const FormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email tidak boleh kosong" })
    .email({ message: "Email tidak valid" }),
  name: z.string().nonempty({ message: "Nama tidak boleh kosong" }),
  blood: z.string().nonempty({ message: "Pilih golongan darah" }),
  rhesus: z.string().nonempty({ message: "Pilih rhesus" }),
  systolic: z
    .string()
    .nonempty({ message: "Tekanan darah systolic tidak boleh kosong" })
    .refine((val) => !isNaN(Number(val)), { message: "Harus berupa angka" }),
  diastolic: z
    .string()
    .nonempty({ message: "Tekanan darah diastolic tidak boleh kosong" })
    .refine((val) => !isNaN(Number(val)), { message: "Harus berupa angka" }),
  pulse: z
    .string()
    .nonempty({ message: "Detak jantung tidak boleh kosong" })
    .refine((val) => !isNaN(Number(val)), { message: "Harus berupa angka" }),
  weight: z
    .string()
    .nonempty({ message: "Berat badan tidak boleh kosong" })
    .refine((val) => !isNaN(Number(val)), { message: "Harus berupa angka" }),
  temperatur: z
    .string()
    .nonempty({ message: "Temperatur tidak boleh kosong" })
    .refine((val) => !isNaN(Number(val)), { message: "Harus berupa angka" }),
  hemoglobin: z
    .string()
    .nonempty({ message: "Hemoglobin tidak boleh kosong" })
    .refine((val) => !isNaN(Number(val)), { message: "Harus berupa angka" }),
  worthy: z.boolean().default(false).optional(),
});

export default function DonationForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      email: "",
      name: "",
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

  const addDonorMutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      await postAddDonation(data);
    },
    onSuccess: () => {
      toast({
        title: "Tambah Donor Darah Berhasil",
        description: "Anda berhasil tambah donor darah",
      });
      router.push(`/history`);
    },
    onError: (error) => {
      toast({
        title: "Gagal",
        description:
          error.message || "Terjadi kesalahan saat menambahkan data pendonor",
        variant: "destructive",
      });
    },
  });

  const onCancel = () => form.reset();
  const onSubmit = (data: z.infer<typeof FormSchema>) =>
    addDonorMutation.mutate(data);

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-5 sm:w-3/5"
          noValidate
        >
          <h2 className="text-base/7 font-semibold text-gray-900">
            Tambah Donor Darah
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Ini adalah form untuk donor secara langsung.
          </p>

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="mt-6 sm:w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="text-sm sm:text-base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-6 sm:w-1/2">
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input className="text-sm sm:text-base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-10" />

          <h2 className="text-base/7 font-semibold text-gray-900">
            Masukan Data Berikut
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Masukan data ini untuk menyelesaikan status donor darah.
          </p>

          <div className="flex gap-3 sm:w-3/5">
            <FormField
              control={form.control}
              name="blood"
              render={({ field }) => (
                <FormItem className="mt-6 w-3/5">
                  <FormLabel>Golongan Darah</FormLabel>
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
                    <Input className="text-sm sm:text-base" {...field} />
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
                    <Input className="text-sm sm:text-base" {...field} />
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
                    <Input className="text-sm sm:text-base" {...field} />
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
                    <Input className="text-sm sm:text-base" {...field} />
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
                    <Input className="text-sm sm:text-base" {...field} />
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
                    <Input className="text-sm sm:text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <Separator className="mt-10 mb-5" />

          <div className="flex gap-3 justify-end">
            <CancelButton
              onCancel={onCancel}
              isLoading={addDonorMutation.isPending}
            />
            <SubmitButton
              onSubmit={form.handleSubmit(onSubmit)}
              isLoading={addDonorMutation.isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
