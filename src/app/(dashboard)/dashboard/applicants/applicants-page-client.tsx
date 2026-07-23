"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ApplicantCards } from "@/components/applicants/applicant-card";
import { ApplicantDetailsDrawer } from "@/components/applicants/applicant-details-drawer";
import { ApplicantFilters } from "@/components/applicants/applicant-filters";
import { ApplicantPagination } from "@/components/applicants/applicant-pagination";
import { ApplicantSearch } from "@/components/applicants/applicant-search";
import { ApplicantSkeleton } from "@/components/applicants/applicant-skeleton";
import { ApplicantTable } from "@/components/applicants/applicant-table";
import { ApplicantEmptyState } from "@/components/applicants/applicant-empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { ErrorState } from "@/components/dashboard/error-state";
import { useApplicants } from "@/hooks/use-applicants";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type {
  ApplicantFilters as Filters,
  ApplicantStatus,
  ApplicantTrack,
  SortBy,
} from "@/types/applicant";

const validStatus = new Set<ApplicantStatus>([
  "pending",
  "shortlisted",
  "accepted",
  "rejected",
]);
const validTrack = new Set<ApplicantTrack>([
  "frontend",
  "backend",
  "ui-ux",
  "data-analytics",
  "mobile",
]);
const validSort = new Set<SortBy>([
  "fullName",
  "email",
  "applicationDate",
  "status",
  "track",
]);

export function ApplicantsPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(
    null,
  );
  const deferredSearch = useDebouncedValue(search);
  const filters = useMemo<Filters>(() => {
    const status = params.get("status");
    const track = params.get("track");
    const sortBy = params.get("sortBy");
    return {
      page: Math.max(1, Number(params.get("page")) || 1),
      limit: 10,
      search: deferredSearch || undefined,
      status:
        status && validStatus.has(status as ApplicantStatus)
          ? (status as ApplicantStatus)
          : undefined,
      track:
        track && validTrack.has(track as ApplicantTrack)
          ? (track as ApplicantTrack)
          : undefined,
      sortBy:
        sortBy && validSort.has(sortBy as SortBy)
          ? (sortBy as SortBy)
          : "applicationDate",
      sortOrder: params.get("sortOrder") === "asc" ? "asc" : "desc",
      simulateError: params.get("simulateError") === "true",
      delay: Number(params.get("delay")) || undefined,
    };
  }, [params, deferredSearch]);
  const query = useApplicants(filters);
  const update = useCallback(
    (key: string, value?: string | number) => {
      const next = new URLSearchParams(params.toString());
      if (
        value === undefined ||
        value === "" ||
        (key === "page" && value === 1)
      )
        next.delete(key);
      else next.set(key, String(value));
      if (key !== "page") next.delete("page");
      router.replace(`${pathname}${next.size ? `?${next.toString()}` : ""}`);
    },
    [params, pathname, router],
  );
  useEffect(() => {
    const current = params.get("search") ?? "";
    if (deferredSearch !== current) update("search", deferredSearch);
  }, [deferredSearch, params, update]);
  const clear = () => {
    setSearch("");
    router.replace(pathname);
  };
  if (query.isError) return <ErrorState onRetry={() => void query.refetch()} />;
  const hasData = Boolean(query.data?.data.length);

  return (
    <section className="space-y-5">
      <PageHeader
        title="Applicants"
        description="Search, filter, and review internship applications."
      />
      <div className="space-y-3 rounded-lg border bg-card p-3.5">
        <ApplicantSearch
          value={search}
          onChange={setSearch}
          isSearching={search !== deferredSearch || query.isFetching}
        />
        <ApplicantFilters
          status={filters.status}
          track={filters.track}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onChange={update}
          onClear={clear}
        />
      </div>
      {query.isLoading ? (
        <ApplicantSkeleton />
      ) : hasData ? (
        <>
          <ApplicantTable
            applicants={query.data!.data}
            onSelect={setSelectedApplicantId}
          />
          <ApplicantCards
            applicants={query.data!.data}
            onSelect={setSelectedApplicantId}
          />
          <ApplicantPagination
            meta={query.data!.meta}
            onPageChange={(page) => update("page", page)}
            isFetching={query.isFetching}
          />
        </>
      ) : (
        <ApplicantEmptyState onClear={clear} />
      )}
      <ApplicantDetailsDrawer
        applicantId={selectedApplicantId}
        onOpenChange={(open) => {
          if (!open) setSelectedApplicantId(null);
        }}
      />
    </section>
  );
}
