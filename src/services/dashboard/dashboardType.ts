type BloodStockData = {
  "rhesus +": number;
  "rhesus -": number;
};

type DonationsByMonth = {
  donations: number;
};

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
