"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HistoryData } from "@/services/history/historyType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import TableSkeleton from "@/components/table-skeleton";
import { getHistories } from "@/services/history/historyService";

interface DataTableProps {
  columns: ColumnDef<HistoryData, unknown>[];
  status: string;
}

export function DataTable({ columns, status }: DataTableProps) {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const pageSize = 5;

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["history", pageIndex],
    queryFn: async () => {
      const response = await getHistories({
        page: pageIndex,
        per_page: pageSize,
        status: status,
      });
      return response;
    },
    initialData: () => queryClient.getQueryData(["history"]),
    placeholderData: (previousData) => previousData,
  });

  const table = useReactTable<HistoryData>({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: data?.pagination?.last_page || 1,
  });

  return (
    <div>
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
              <TableSkeleton columnCount={columns.length} rowCount={pageSize} />
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
