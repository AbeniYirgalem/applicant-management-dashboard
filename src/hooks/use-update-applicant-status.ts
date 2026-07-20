"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateApplicantStatus } from "@/services/applicants";
import { QUERY_KEYS } from "@/constants/query-keys";
import type {
  Applicant,
  ApplicantDetail,
  ApplicantStatus,
  PaginatedApplicants,
} from "@/types/applicant";
export function useUpdateApplicantStatus() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicantStatus }) =>
      updateApplicantStatus(id, status),
    onSuccess: (updated) => {
      client.setQueryData<ApplicantDetail>(
        [...QUERY_KEYS.applicants.detail, updated.id],
        (current) => (current ? { ...current, ...updated } : current),
      );
      client.setQueriesData<PaginatedApplicants>(
        { queryKey: QUERY_KEYS.applicants.list },
        (current) =>
          current
            ? {
                ...current,
                data: current.data.map((applicant): Applicant =>
                  applicant.id === updated.id
                    ? { ...applicant, ...updated }
                    : applicant,
                ),
              }
            : current,
      );
      client.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.summary });
      toast.success("Applicant status updated successfully.");
    },
    onError: () =>
      toast.error("Unable to update applicant status. Please try again."),
  });
}
