import { getJWTToken } from "@/lib/utils";
import axios from "axios";
import {
  AddParticipantParams,
  CreateDonorScheduleParams,
  DonorScheduleDetailResponse,
  DonorSchedulesParams,
  DonorSchedulesResponse,
  ParticipantDetailResponse,
  ParticipantsParams,
  ParticipantsResponse,
  RegisterDonorScheduleResponse,
  UpdateDonorScheduleParams,
  UpdateStatusParticipantParams,
} from "./donorScheduleType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getDonorSchedules = async ({
  page,
  per_page,
  city,
}: DonorSchedulesParams): Promise<DonorSchedulesResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/donor-schedules`, {
      params: { page, per_page, city },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const getDonorScheduleDetail = async (
  id: string
): Promise<DonorScheduleDetailResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/donor-schedules/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const postRegisterDonorSchedule = async (
  id: string
): Promise<RegisterDonorScheduleResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.post(
      `${API_URL}/donor-schedules/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const postUpdateDonorSchedule = async (
  id: string,
  data: UpdateDonorScheduleParams
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getJWTToken();

    const response = await axios.patch(
      `${API_URL}/donor-schedules/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const postCreateDonorSchedule = async (
  data: CreateDonorScheduleParams
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getJWTToken();

    const response = await axios.post(`${API_URL}/donor-schedules`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const getParticipants = async (
  id: string,
  { page, per_page, status }: ParticipantsParams
): Promise<ParticipantsResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(
      `${API_URL}/donor-schedules/${id}/participants`,
      {
        params: { page, per_page, status },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const getParticipantDetail = async (
  id: string,
  donorId: string
): Promise<ParticipantDetailResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(
      `${API_URL}/donor-schedules/${id}/participants/${donorId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const postUpdateStatusParticipant = async (
  id: string,
  donorId: string,
  data: UpdateStatusParticipantParams
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getJWTToken();

    const response = await axios.post(
      `${API_URL}/donor-schedules/${id}/participants/${donorId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const postAddParticipant = async (
  id: string,
  data: AddParticipantParams
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getJWTToken();

    const response = await axios.post(
      `${API_URL}/donor-schedules/${id}/participants`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        throw new Error(error.response.data.message || "Bad Request");
      }
    }
    throw new Error("Terjadi kesalahan pada server.");
  }
};
