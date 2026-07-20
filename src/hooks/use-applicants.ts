"use client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getApplicants } from "@/services/applicants";
import type { ApplicantFilters } from "@/types/applicant";
export function useApplicants(filters: ApplicantFilters) {
  return useQuery({
    queryKey: [...QUERY_KEYS.applicants.list, filters],
    queryFn: () => getApplicants(filters),
    placeholderData: (previous) => previous,
  });
}
