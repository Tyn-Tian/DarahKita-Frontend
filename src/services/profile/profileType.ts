export type UpdateProfileParams = {
  name?: string;
  address?: string;
  city?: string;
  phone?: string;
  blood?: string;
  rhesus?: string;
};

export type UpdatePmiProfileParams = {
  name?: string;
  address?: string;
  city?: string;
  phone?: string;
}

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

export type PmiProfileData = {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  avatar: string;
};

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
}

export interface PmiProfileResponse {
  success: boolean;
  message: string;
  data: PmiProfileData;
}
