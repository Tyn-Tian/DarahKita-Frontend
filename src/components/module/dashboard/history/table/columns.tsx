"use client";

import { formatDateIntl } from "@/lib/utils";
import { HistoryData } from "@/services/history/historyType";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<HistoryData>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Tanggal Donor Darah",
    cell: ({ row }) => {
      const formatedValue = formatDateIntl(row.getValue("date"));
      return <div>{formatedValue}</div>;
    },
  },
  {
    accessorKey: "pmi",
    header: "PMI Center",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const history = row.original;

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
              <Link href={`/history/${history.id}`}>Lihat Detail</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
