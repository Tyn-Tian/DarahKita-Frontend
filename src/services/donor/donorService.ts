import { getJWTToken } from "@/lib/utils";
import { AddDonorParams } from "./donorType";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const postAddDonor = async (
  data: AddDonorParams
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getJWTToken();

    const response = await axios.post(`${API_URL}/donors`, data, {
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
