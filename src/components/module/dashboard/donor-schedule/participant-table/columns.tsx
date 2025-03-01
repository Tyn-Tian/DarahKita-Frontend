"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateIntl } from "@/lib/utils";

import { DonorScheduleParticipantData } from "@/services/donor-schedule/donorScheduleType";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns = (
  id: string
): ColumnDef<DonorScheduleParticipantData>[] => [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <p>{status.charAt(0).toUpperCase() + status.slice(1)}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Peserta",
  },
  {
    accessorKey: "last_donation",
    header: "Donasi Terakhir",
    cell: ({ row }) => {
      const formatedValue = formatDateIntl(row.getValue("last_donation"));
      return <p>{formatedValue}</p>;
    },
  },
  {
    accessorKey: "contact",
    header: "Kontak",
  },
  {
    header: "Tipe Darah",
    cell: ({ row }) => {
      const { blood, rhesus } = row.original;
      return (
        <p>
          {blood.toUpperCase()}
          {rhesus}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const participant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={`/donor-schedule/${id}/participant/${participant.id}`}
              >
                Lihat Detail
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
