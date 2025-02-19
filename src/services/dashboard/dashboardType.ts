type BloodStockData = {
  blood: string;
  "rhesus +": number;
  "rhesus -": number;
};

type DonationsByMonth = {
  month: string;
  donations: number;
};

type TopDonors = {
  name: string;
  donations: number;
};

export interface BloodStocksResponse {
  success: boolean;
  message: string;
  data: BloodStockData[];
}

export interface DonationsByMonthResponse {
  success: boolean;
  message: string;
  data: DonationsByMonth[];
}

export interface TopDonorsResponse {
  success: boolean;
  message: string;
  data: TopDonors[];
}
