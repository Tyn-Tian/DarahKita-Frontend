import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getJWTToken = (): string => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("JWT token not found in cookie");
  }
  return token;
};

export const getUserRole = (): string | undefined => {
  const token = getJWTToken();
  const decoded = jwtDecode(token);
  return decoded.role;
};

export const formatDateIntl = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatTime = (timeString: string): string => {
  const [hour, minute] = timeString.split(":");
  return `${hour}:${minute} WIB`;
};
