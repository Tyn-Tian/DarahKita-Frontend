import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

export default function DonorTable() {
  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 mb-5">
        Data Pendonor
      </h2>
      <DataTable columns={columns} />
    </div>
  );
}
