import { getJWTToken } from "@/lib/utils";
import axios from "axios";
import { BloodStocksResponse } from "./dashboardType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getBloodStocks = async (): Promise<BloodStocksResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/blood-stocks`, {
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
