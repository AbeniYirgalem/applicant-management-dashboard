"use client";
import { useQuery } from "@tanstack/react-query";
import { getApplicant } from "@/services/applicants";
import { QUERY_KEYS } from "@/constants/query-keys";
export function useApplicant(id: string | null) {
  return useQuery({
    queryKey: [...QUERY_KEYS.applicants.detail, id],
    queryFn: () => getApplicant(id!),
    enabled: Boolean(id),
  });
}
