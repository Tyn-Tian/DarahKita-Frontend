export type DonorsParams = {
  page: number;
  per_page: number;
};

export type DonorData = {
  id: string;
  name: string;
  phone: string;
  blood: string;
  rhesus: string;
  address: string;
  last_donation: string;
};

export type DonorDetailData = {
  id: string;
  name: string;
  phone: string;
  blood: string;
  rhesus: string;
  address: string;
  last_donation: string;
  city: string;
  email: string;
};

type PaginationData = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export interface DonorsResponse {
  success: boolean;
  message: boolean;
  data: DonorData[];
  pagination: PaginationData;
}

export interface DonorDetailResponse {
  success: boolean;
  message: string;
  data: DonorDetailData;
}
