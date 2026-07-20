"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getDashboardSummary } from "@/services/dashboard";

export function useDashboardStats() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard.summary,
    queryFn: getDashboardSummary,
  });
}
