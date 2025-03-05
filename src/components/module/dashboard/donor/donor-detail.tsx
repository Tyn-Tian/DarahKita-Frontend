"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import ProfileSkeleton from "../profile/profile-skeleton";
import { getDonorDetail } from "@/services/donor/donorService";

export default function DonorDetail({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["donor-detail", id],
    queryFn: async () => {
      const response = await getDonorDetail(id);
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["donor-detail", id]),
  });

  return (
    <div>
      {isLoading ? (
        <ProfileSkeleton isDonor={true} />
      ) : (
        <div className="flex justify-center">
          <div className="mb-5 sm:w-3/5">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Data Detail Pendonor
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Ini adalah informasi data detail pendonor.
            </p>

            <div className="mt-6">
              <Label htmlFor="name">Nama</Label>
              <Input
                className="text-sm sm:text-base sm:w-1/2 mt-2"
                id="name"
                type="text"
                value={data ? data.name : ""}
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="last_donation">Donasi Terakhir</Label>
              <Input
                className="text-sm sm:text-base sm:w-1/4 mt-2"
                id="last_donation"
                type="date"
                value={data ? data.last_donation : ""}
                readOnly
              />
            </div>

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

            <div className="mt-6">
              <Label htmlFor="email">Email</Label>
              <Input
                className="text-sm sm:text-base sm:w-1/2 mt-2"
                id="email"
                type="text"
                value={data ? data.email : ""}
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                className="text-sm sm:text-base sm:w-4/5 mt-2"
                id="address"
                value={data ? data.address : ""}
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="city">Kota</Label>
              <Input
                className="text-sm sm:text-base sm:w-1/3 mt-2"
                id="city"
                value={data ? data.city : ""}
                readOnly
              />
            </div>

            <div className="mt-6">
              <Label htmlFor="phone">No. Telpon</Label>
              <Input
                className="text-sm sm:text-base sm:w-1/2 mt-2"
                id="phone"
                value={data ? data.phone : ""}
                readOnly
              />
            </div>

            <Separator className="mt-10 mb-5" />

            <div className="flex justify-end">
              <Button variant="destructive" asChild>
                <Link href="/donor">Kembali</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
