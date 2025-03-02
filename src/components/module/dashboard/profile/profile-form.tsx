"use client";

import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  getProfile,
  postUpdateProfile,
} from "@/services/profile/profileService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import CancelButton from "./cancel-button";
import SubmitButton from "../../../submit-button";
import ProfileSkeleton from "./profile-skeleton";

const FormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Nama tidak boleh kosong" })
    .min(3, { message: "Nama harus terdiri dari minimal 3 karakter" })
    .max(40, { message: "Nama tidak boleh lebih dari 40 karakter" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Nama hanya boleh berisi huruf dan spasi",
    }),
  email: z.string().email({ message: "Email tidak valid" }),
  address: z
    .string()
    .nonempty({ message: "Alamat tidak boleh kosong" })
    .min(10, { message: "Alamat harus terdiri dari minimal 10 karakter" })
    .max(100, { message: "Alamat tidak boleh lebih dari 100 karakter" }),
  city: z.string().nonempty({ message: "Pilih kota" }),
  phone: z
    .string()
    .nonempty({ message: "Nomor telepon tidak boleh kosong" })
    .regex(/^(0|\+62)/, {
      message: "Nomor telepon harus diawali dengan 0 atau +62",
    })
    .refine(
      (value) => {
        const numberPart = value.startsWith("+62")
          ? value.slice(3)
          : value.slice(1);
        return numberPart.length >= 9 && numberPart.length <= 13;
      },
      {
        message:
          "Nomor harus terdiri dari minimal 9 digit dan maksimal 13 digit",
      }
    ),
  blood: z.string().nonempty({ message: "Pilih golongan darah" }),
  rhesus: z.string().nonempty({ message: "Pilih rhesus" }),
});

export function ProfileForm() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getProfile();
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["profile"]),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: profile
      ? profile
      : {
          name: "",
          email: "",
          address: "",
          phone: "",
          city: "",
          blood: "",
          rhesus: "",
        },
  });

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [profile, form]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Fetch Data Profile Gagal",
        description:
          "Terjadi kesalahan saat fetch data profile. Coba reload website",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof FormSchema>) => {
      await postUpdateProfile(data);
    },
    onSuccess: () => {
      toast({
        title: "Update Profile Berhasil",
        description: "Anda berhasil update profile",
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memperbarui profil",
        variant: "destructive",
      });
    },
  });

  const onCancel = () => (profile ? form.reset(profile) : null);
  const onSubmit = (data: z.infer<typeof FormSchema>) => mutation.mutate(data);

  if (isLoading) {
    return <ProfileSkeleton isDonor={true} />;
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-5 sm:w-3/5"
          noValidate
        >
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

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

          <Separator className="my-10" />

          <h2 className="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="mt-6 sm:w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-sm sm:text-base"
                    {...field}
                    readOnly
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="mt-6 sm:w-4/5">
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Textarea className="text-sm sm:text-base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="mt-6 sm:w-1/3">
                <FormLabel>Kota</FormLabel>
                <Select
                  key={field.value} // Tambahkan key agar component reset saat data berubah
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="text-sm sm:text-base"
                        placeholder="Pilih kota"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pangkalpinang">Pangkalpinang</SelectItem>
                    <SelectItem value="bangka">Bangka</SelectItem>
                    <SelectItem value="bangka_barat">Bangka Barat</SelectItem>
                    <SelectItem value="bangka_selatan">
                      Bangka Selatan
                    </SelectItem>
                    <SelectItem value="bangka_tengah">Bangka Tengah</SelectItem>
                    <SelectItem value="belitung">Belitung</SelectItem>
                    <SelectItem value="belitung_timur">
                      Belitung Timur
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mt-6 sm:w-1/2">
                <FormLabel>No. Telpon</FormLabel>
                <FormControl>
                  <Input className="text-sm sm:text-base" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="mt-10 mb-5" />

          <div className="flex gap-3 justify-end">
            <CancelButton onCancel={onCancel} isLoading={mutation.isPending} />
            <SubmitButton
              onSubmit={form.handleSubmit(onSubmit)}
              isLoading={mutation.isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
