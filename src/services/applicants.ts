import { API_ENDPOINTS } from "@/constants/api";
import { axiosInstance } from "@/services/axios";
import type {
  Applicant,
  ApplicantDetail,
  ApplicantFilters,
  ApplicantStatus,
  PaginatedApplicants,
} from "@/types/applicant";

export async function getApplicants(
  filters: ApplicantFilters,
): Promise<PaginatedApplicants> {
  const { data } = await axiosInstance.get<PaginatedApplicants>(
    API_ENDPOINTS.applicants.list,
    { params: filters },
  );
  return data;
}
export async function getApplicant(id: string): Promise<ApplicantDetail> {
  const { data } = await axiosInstance.get<ApplicantDetail>(
    API_ENDPOINTS.applicants.detail(id),
  );
  return data;
}
export async function updateApplicantStatus(
  id: string,
  status: ApplicantStatus,
): Promise<Applicant> {
  const { data } = await axiosInstance.patch<Applicant>(
    API_ENDPOINTS.applicants.status(id),
    { status },
  );
  return data;
}
