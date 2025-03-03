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

export type ParticipantsParams = {
  page: number;
  per_page: number;
  status: string;
};

export type UpdateStatusParticipantParams = {
  blood: string;
  rhesus: string;
  systolic: string;
  diastolic: string;
  pulse: string;
  weight: string;
  temperatur: string;
  hemoglobin: string;
  worthy?: boolean;
};

export type AddParticipantParams = {
  email: string;
  name: string;
  blood: string;
  rhesus: string;
  systolic: string;
  diastolic: string;
  pulse: string;
  weight: string;
  temperatur: string;
  hemoglobin: string;
  worthy?: boolean;
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

export type ParticipantData = {
  id: string;
  name: string;
  status: string;
  contact: string;
  blood: string;
  rhesus: string;
  last_donation: string;
};

export type ParticipantDetailData = {
  id: string;
  name: string;
  status: string;
  contact: string;
  blood: string;
  rhesus: string;
  last_donation: string;
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

export interface ParticipantsResponse {
  success: boolean;
  message: string;
  data: ParticipantData[];
  pagination: PaginationData;
}

export interface ParticipantDetailResponse {
  success: boolean;
  message: string;
  data: ParticipantDetailData;
}
