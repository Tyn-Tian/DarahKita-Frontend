"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./participant-table/columns";
import { DataTable } from "./participant-table/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const statusOptions = [
  { value: "semua" },
  { value: "success" },
  { value: "pending" },
  { value: "failed" },
];

export default function ParticipantTable({ id }: { id: string }) {
  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 mb-5">
        Peserta Donor Darah
      </h2>

      <Tabs defaultValue="semua">
        <div className="w-full flex flex-col md:flex-row gap-3 mb-4 justify-between">
          <TabsList className="w-full lg:w-auto">
            {statusOptions.map((n) => (
              <TabsTrigger
                key={n.value}
                value={n.value}
                className="w-full lg:w-auto"
              >
                {n.value.charAt(0).toUpperCase() + n.value.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button asChild>
            <Link href={`/donor-schedule/${id}/participant/add-participant`}>
              Tambah Peserta
            </Link>
          </Button>
        </div>

        {statusOptions.map((n) => (
          <TabsContent key={n.value} value={n.value}>
            <DataTable columns={columns(id)} id={id} status={n.value} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
