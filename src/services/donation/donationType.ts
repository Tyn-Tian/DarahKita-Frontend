export type BloodSchedulesParams = {
  page: number;
  per_page: number;
  city: string;
};

export type BloodScheduleData = {
  id: string;
  date: string;
  location: string;
  time: string;
  name: string;
  contact: string;
};

export type BloodScheduleDetailData = {
  id: string;
  date: string;
  location: string;
  time: string;
  name: string;
  contact: string;
  lastDonation: string;
  isDonor: boolean;
  isScheduleRegistered: boolean;
  isRegistered: boolean;
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

export interface BloodScheduleDetailResponse {
  success: boolean;
  message: string;
  data: BloodScheduleDetailData;
}

export interface RegisterBloodScheduleResponse {
  success: boolean;
  message: string;
}
