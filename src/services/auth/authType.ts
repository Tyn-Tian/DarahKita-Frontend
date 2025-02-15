export type RegistUserParams = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserParams = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  phone: string;
  city: string;
};

export interface LoginUserResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
  error?: string;
}
