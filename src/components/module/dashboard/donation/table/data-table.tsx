"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BloodScheduleData } from "@/services/donation/donationType";
import { getDonorSchedules } from "@/services/donation/donationService";
import TableSkeleton from "@/components/table-skeleton";

interface DataTableProps {
  columns: ColumnDef<BloodScheduleData, unknown>[];
}

export function DataTable({ columns }: DataTableProps) {
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const pageSize = 5;

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["donation-schedule", pageIndex, selectedCity],
    queryFn: async () => {
      const response = await getDonorSchedules({
        page: pageIndex,
        per_page: pageSize,
        city: selectedCity,
      });
      return response;
    },
    initialData: () => queryClient.getQueryData(["donation-schedule"]),
    placeholderData: (previousData) => previousData,
  });

  const table = useReactTable<BloodScheduleData>({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: data?.pagination?.last_page || 1,
  });

  return (
    <div>
      <div className="w-full flex mb-4 justify-end">
        <Select
          onValueChange={(value) => {
            setSelectedCity(value);
            setPageIndex(1);
          }}
          value={selectedCity}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Kota" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pangkalpinang">Pangkalpinang</SelectItem>
              <SelectItem value="bangka">Bangka</SelectItem>
              <SelectItem value="bangka_barat">Bangka Barat</SelectItem>
              <SelectItem value="bangka_selatan">Bangka Selatan</SelectItem>
              <SelectItem value="bangka_tengah">Bangka Tengah</SelectItem>
              <SelectItem value="belitung">Belitung</SelectItem>
              <SelectItem value="belitung_timur">Belitung Timur</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="h-12" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton
                columnCount={columns.length}
                rowCount={pageSize}
              />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Belum Ada Jadwal Donor Darah.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 1))}
          disabled={pageIndex === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => prev + 1)}
          disabled={pageIndex >= (data?.pagination?.last_page || 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
