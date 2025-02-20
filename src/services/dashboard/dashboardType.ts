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

export type BloodScheduleData = {
  id: string;
  date: string;
  location: string;
  time: string;
  name: string;
  contact: string;
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

export interface BloodScheduleResponse {
  success: boolean;
  message: string;
  data: BloodScheduleData[];
}
