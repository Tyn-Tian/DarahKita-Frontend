import { getJWTToken } from "@/lib/utils";
import axios from "axios";
import {
  BloodScheduleResponse,
  BloodStocksResponse,
  DonationsByMonthResponse,
  TopDonorsResponse,
} from "./dashboardType";

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

export const getDonationsByMonth =
  async (): Promise<DonationsByMonthResponse> => {
    try {
      const token = getJWTToken();

      const response = await axios.get(`${API_URL}/donations-month`, {
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

export const getTopDonors = async (): Promise<TopDonorsResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/top-donors`, {
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

export const getDonorSchedules = async (): Promise<BloodScheduleResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/donor-schedules`, {
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
