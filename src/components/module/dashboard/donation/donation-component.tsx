import { BloodScheduleData, columns } from "./table/columns";
import { DataTable } from "./table/data-table";

async function getData(): Promise<BloodScheduleData[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      date: "20 Februari 2025",
      location: "Gedung Transmart, Jl. Soepomo No. 116",
      time: "09.00 WIB",
      name: "PMI Pangkalpinang",
      contact: "081386812278"
    },
    {
      id: "728ed52f",
      date: "20 Februari 2025",
      location: "Gedung Transmart, Jl. Soepomo No. 116",
      time: "09.00 WIB",
      name: "PMI Pangkalpinang",
      contact: "081386812278"
    },
    {
      id: "728ed52f",
      date: "20 Februari 2025",
      location: "Gedung Transmart, Jl. Soepomo No. 116",
      time: "09.00 WIB",
      name: "PMI Pangkalpinang",
      contact: "081386812278"
    },
  ];
}

export default async function DonationComponent() {
  const data = await getData();

  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900 mb-5">Jadwal Donor Darah</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
