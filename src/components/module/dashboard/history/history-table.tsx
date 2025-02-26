import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

const statusOptions = [
  { value: "semua" },
  { value: "success" },
  { value: "pending" },
  { value: "failed" },
];

export default function HistoryTable() {
  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 mb-5">
        History Donor Darah
      </h2>

      <Tabs defaultValue="semua">
        <div className="w-full flex mb-4 justify-end">
          <TabsList className="w-full lg:w-auto">
            {statusOptions.map((n) => (
              <TabsTrigger
                key={n.value}
                value={n.value}
                className="w-full lg:w-auto"
              >
                {n.value.charAt(0).toUpperCase() + n.value.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {statusOptions.map((n) => (
          <TabsContent key={n.value} value={n.value}>
            <DataTable columns={columns} status={n.value} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
