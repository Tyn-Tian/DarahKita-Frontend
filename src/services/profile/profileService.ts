import axios from "axios";
import {
  PmiProfileResponse,
  ProfileResponse,
  UpdateProfileParams,
} from "./profileType";
import { getJWTToken } from "@/lib/utils";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/profile`, {
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

export const postUpdateProfile = async (
  data: UpdateProfileParams
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getJWTToken();

    const response = await axios.patch(`${API_URL}/profile`, data, {
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

export const getPmiProfile = async (): Promise<PmiProfileResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/pmi-profile`, {
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

export const postUpdatePmiProfile = async (
  data: UpdateProfileParams
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const token = getJWTToken();

    const response = await axios.patch(`${API_URL}/pmi-profile`, data, {
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
