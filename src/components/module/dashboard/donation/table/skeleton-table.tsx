import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
  columnCount: number;
  rowCount: number;
}

const SkeletonTable = ({ columnCount, rowCount }: SkeletonTableProps) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonTable;