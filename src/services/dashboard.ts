import { API_ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/services/axios";
import type { DashboardSummary } from "@/types/dashboard";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const { data } = await axiosInstance.get<DashboardSummary>(
    API_ENDPOINTS.dashboard.summary,
  );
  return data;
}
