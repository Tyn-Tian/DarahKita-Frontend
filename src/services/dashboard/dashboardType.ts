type BloodStockData = {
  blood: string;
  "rhesus +": number;
  "rhesus -": number;
};

export interface BloodStocksResponse {
  success: boolean;
  message: string;
  data: Record<string, BloodStockData>;
}
