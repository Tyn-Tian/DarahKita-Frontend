export type HistoryParams = {
  page: number;
  per_page: number;
  status: string;
};

export type HistoryData = {
  id: string;
  date: string;
  location: string;
  status: "pending" | "success" | "failed";
  pmi: string;
};

export type HistoryDetailData = {
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

type PaginationData = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export interface HistoryResponse {
  success: boolean;
  message: string;
  data: HistoryData[];
  pagination: PaginationData;
}

export interface HistoryDetailResponse {
  success: boolean;
  message: string;
  data: HistoryDetailData;
}
