"use client";

import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDonorSchedules } from "@/services/dashboard/dashbaordService";

export default function DonationComponent() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["donation-schedule"],
    queryFn: async () => {
      const response = await getDonorSchedules();
      return response.data;
    },
    initialData: () => queryClient.getQueryData(["donation-schedule"]),
  });

  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 mb-5">
        Jadwal Donor Darah
      </h2>
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
