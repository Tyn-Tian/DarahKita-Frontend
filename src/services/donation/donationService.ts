import { getJWTToken } from "@/lib/utils";
import axios from "axios";
import { AddDonationParams } from "./donationType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const postAddDonation = async (
  data: AddDonationParams
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getJWTToken();

    const response = await axios.post(`${API_URL}/donations`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
