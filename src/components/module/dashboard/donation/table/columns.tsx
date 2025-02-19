"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type BloodScheduleData = {
  id: string;
  date: string;
  location: string;
  time: string;
  name: string;
  contact: string;
};

export const columns: ColumnDef<BloodScheduleData>[] = [
  {
    accessorKey: "date",
    header: "Tanggal Pelaksanaan",
  },
  {
    accessorKey: "location",
    header: "Lokasi",
  },
  {
    accessorKey: "time",
    header: "Waktu",
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(bloodSchedule.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
