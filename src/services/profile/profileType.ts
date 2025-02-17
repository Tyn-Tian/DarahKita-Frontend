export type UpdateProfileParams = {
  name?: string;
  address?: string;
  city?: string;
  phone?: string;
  blood?: string;
  rhesus?: string;
};

export type ProfileData = {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  blood: string;
  rhesus: string;
  avatar: string;
};

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}
