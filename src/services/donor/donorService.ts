import { getJWTToken } from "@/lib/utils";
import { DonorDetailResponse, DonorsParams, DonorsResponse } from "./donorType";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getDonors = async ({
  page,
  per_page,
}: DonorsParams): Promise<DonorsResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/donors`, {
      params: { page, per_page },
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

export const getDonorDetail = async (
  id: string
): Promise<DonorDetailResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/donors/${id}`, {
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
