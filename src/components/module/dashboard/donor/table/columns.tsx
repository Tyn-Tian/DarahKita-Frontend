"use client";

import { formatDateIntl } from "@/lib/utils";
import { DonorData } from "@/services/donor/donorType";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<DonorData>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "phone",
    header: "Kontak",
  },
  {
    accessorKey: "last_donation",
    header: "Donasi Terakhir",
    cell: ({ row }) => {
      const formatedValue = formatDateIntl(row.getValue("last_donation"));
      if (formatedValue === "Invalid Date") {
        return <p>-</p>;
      }
      return <p>{formatedValue}</p>;
    },
  },
  {
    accessorKey: "address",
    header: "Alamat",
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
      const donor = row.original;

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
                href={`/donor/${donor.id}`}
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
