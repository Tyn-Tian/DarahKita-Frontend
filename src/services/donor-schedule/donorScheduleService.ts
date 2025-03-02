import { getJWTToken } from "@/lib/utils";
import axios from "axios";
import {
  CreateDonorScheduleParams,
  DonorScheduleDetailResponse,
  DonorScheduleParticipantsParams,
  DonorScheduleParticipantsResponse,
  DonorSchedulesParams,
  DonorSchedulesResponse,
  RegisterDonorScheduleResponse,
  UpdateDonorScheduleParams,
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

export const getDonorScheduleParticipants = async (
  id: string,
  { page, per_page, status }: DonorScheduleParticipantsParams
): Promise<DonorScheduleParticipantsResponse> => {
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
