"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateIntl, formatTime } from "@/lib/utils";
import { BloodScheduleData } from "@/services/donation/donationType";
import Link from "next/link";

export const columns: ColumnDef<BloodScheduleData>[] = [
  {
    accessorKey: "date",
    header: "Tanggal Pelaksanaan",
    cell: ({ row }) => {
      const formatedValue = formatDateIntl(row.getValue("date"));
      return <div>{formatedValue}</div>;
    },
  },
  {
    accessorKey: "location",
    header: "Lokasi",
  },
  {
    accessorKey: "time",
    header: "Waktu",
    cell: ({ row }) => {
      const formatedValue = formatTime(row.getValue("time"));
      return <div>{formatedValue}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "PMI Center",
  },
  {
    accessorKey: "contact",
    header: "Kontak",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const bloodSchedule = row.original;

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
              <Link href={`/donation/${bloodSchedule.id}`}>Lihat Detail</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
