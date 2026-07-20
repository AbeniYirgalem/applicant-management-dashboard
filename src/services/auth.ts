import { API_ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/services/axios";
import type { LoginCredentials, LoginResponse } from "@/types/auth";

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>(
    API_ENDPOINTS.auth.login,
    credentials,
  );
  return data;
}
