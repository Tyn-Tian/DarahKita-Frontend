import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableDonorScheduleSkeleton {
  columnCount: number;
  rowCount: number;
}

const TableDonorScheduleSkeleton = ({
  columnCount,
  rowCount,
}: TableDonorScheduleSkeleton) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-6 w-4/5" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableDonorScheduleSkeleton;
