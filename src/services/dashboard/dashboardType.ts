type BloodStockData = {
  "rhesus +": number;
  "rhesus -": number;
};

type DonationsByMonth = {
  donations: number;
};

type TopDonors = {
  name: string;
  donations: number;
}

export interface BloodStocksResponse {
  success: boolean;
  message: string;
  data: Record<string, BloodStockData>;
}

export interface DonationsByMonthResponse {
  success: boolean;
  message: string;
  data: Record<string, DonationsByMonth>;
}

export interface TopDonorsResponse {
  success: boolean;
  message: string;
  data: TopDonors[];
}