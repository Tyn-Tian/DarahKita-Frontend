import { getJWTToken } from "@/lib/utils";
import axios from "axios";
import {
  BloodStocksResponse,
  DonationsByMonthResponse,
  LastDonationResponse,
  LastDonorScheduleResponse,
  TopDonorsResponse,
} from "./overviewType";

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

export const getLastDonation = async (): Promise<LastDonationResponse> => {
  try {
    const token = getJWTToken();

    const response = await axios.get(`${API_URL}/last-donation`, {
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

export const getLastDonorSchedule =
  async (): Promise<LastDonorScheduleResponse> => {
    try {
      const token = getJWTToken();

      const response = await axios.get(`${API_URL}/last-donor-schedule`, {
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
