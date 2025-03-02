export type DonorSchedulesParams = {
  page: number;
  per_page: number;
  city: string;
};

export type UpdateDonorScheduleParams = {
  date: string;
  location: string;
  time: string;
};

export type CreateDonorScheduleParams = {
  date: string;
  location: string;
  time: string;
};

export type DonorScheduleParticipantsParams = {
  page: number;
  per_page: number;
  status: string;
};

export type DonorScheduleData = {
  id: string;
  date: string;
  location: string;
  time: string;
  name: string;
  contact: string;
};

export type DonorScheduleDetailData = {
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

export type DonorScheduleParticipantData = {
  id: string;
  name: string;
  status: string;
  contact: string;
  blood: string;
  rhesus: string;
  last_donation: string;
};

type PaginationData = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export interface DonorSchedulesResponse {
  success: boolean;
  message: string;
  data: DonorScheduleData[];
  pagination: PaginationData;
}

export interface DonorScheduleDetailResponse {
  success: boolean;
  message: string;
  data: DonorScheduleDetailData;
}

export interface RegisterDonorScheduleResponse {
  success: boolean;
  message: string;
}

export interface DonorScheduleParticipantsResponse {
  success: boolean;
  message: string;
  data: DonorScheduleParticipantData[];
  pagination: PaginationData;
}
