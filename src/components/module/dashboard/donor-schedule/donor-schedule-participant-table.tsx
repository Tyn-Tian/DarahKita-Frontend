"use client";

import { columns } from "./participant-table/columns";
import { DataTable } from "./participant-table/data-table";

export default function DonorScheduleParticipantTable({ id }: { id: string }) {
  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 mb-5">
        Peserta Donor Darah
      </h2>
      <DataTable columns={columns(id)} id={id} />
    </div>
  );
}
