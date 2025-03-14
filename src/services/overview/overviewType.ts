type BloodStockData = {
  blood: string;
  "rhesus +": number;
  "rhesus -": number;
};

type DonationsByMonthData = {
  month: string;
  donations: number;
};

type TopDonorsData = {
  name: string;
  donations: number;
};

export type LastDonationData = {
  id: string;
  date: string;
  time: string;
  location: string;
  status: "pending" | "success" | "failed";
  pmi: string;
  contact: string;
  blood: string;
  rhesus: string;
  systolic: string;
  diastolic: string;
  pulse: string;
  weight: string;
  temperatur: string;
  hemoglobin: string;
};

type LastDonorScheduleData = {
  id: string;
  date: string;
  address: string;
  time: string;
};

export interface BloodStocksResponse {
  success: boolean;
  message: string;
  data: BloodStockData[];
}

export interface DonationsByMonthResponse {
  success: boolean;
  message: string;
  data: DonationsByMonthData[];
}

export interface TopDonorsResponse {
  success: boolean;
  message: string;
  data: TopDonorsData[];
}

export interface LastDonationResponse {
  success: boolean;
  message: string;
  data: LastDonationData;
}

export interface LastDonorScheduleResponse {
  success: boolean;
  message: string;
  data: LastDonorScheduleData;
}
