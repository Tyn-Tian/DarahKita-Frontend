import { getJWTToken } from "@/lib/utils";
import axios from "axios";
import { HistoryParams, HistoryResponse } from "./historyType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const getHistories = async ({
  page,
  per_page,
  status
}: HistoryParams): Promise<HistoryResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/histories`, {
      params: { page, per_page, status },
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
