export type BloodSchedulesParams = {
  page: number;
  per_page: number;
  city: string;
}

export type BloodScheduleData = {
  id: string;
  date: string;
  location: string;
  time: string;
  name: string;
  contact: string;
};

type PaginationData = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export interface BloodSchedulesResponse {
  success: boolean;
  message: string;
  data: BloodScheduleData[];
  pagination: PaginationData;
}
