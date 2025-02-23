import { getJWTToken } from "@/lib/utils";
import axios from "axios";
import { BloodSchedulesParams, BloodSchedulesResponse } from "./donationType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getDonorSchedules = async ({
  page,
  per_page,
  city,
}: BloodSchedulesParams): Promise<BloodSchedulesResponse> => {
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
