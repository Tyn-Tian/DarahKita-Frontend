import axios from "axios";
import { LoginUserParams, LoginUserResponse, RegistUserParams } from "./authType";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const postCreateUser = async (
  data: RegistUserParams
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      if (error.response.data.errors.email) {
        throw new Error(`Email sudah terdaftar`);
      }
    }
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const postLoginGoogle = async (
  token: string
): Promise<LoginUserResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}/google-login`,
      { token },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};

export const postLogin = async (
  data: LoginUserParams
): Promise<LoginUserResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error}`);
  }
};
