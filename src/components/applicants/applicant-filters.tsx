"use client";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  APPLICANT_STATUSES,
  APPLICANT_TRACKS,
  type ApplicantStatus,
  type ApplicantTrack,
  type SortBy,
  type SortOrder,
} from "@/types/applicant";

interface Props {
  status?: ApplicantStatus;
  track?: ApplicantTrack;
  sortBy: SortBy;
  sortOrder: SortOrder;
  onChange: (key: string, value?: string) => void;
  onClear: () => void;
}

export function ApplicantFilters({
  status,
  track,
  sortBy,
  sortOrder,
  onChange,
  onClear,
}: Props) {
  const active = Boolean(
    status || track || sortBy !== "applicationDate" || sortOrder !== "desc",
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SlidersHorizontal
        className="size-3.5 text-muted-foreground"
        aria-hidden
      />
      <select
        className="native-select"
        value={status ?? ""}
        onChange={(e) => onChange("status", e.target.value || undefined)}
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>
        {APPLICANT_STATUSES.map((item) => (
          <option key={item} value={item}>
            {item === "shortlisted"
              ? "Review"
              : item[0].toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      <select
        className="native-select"
        value={track ?? ""}
        onChange={(e) => onChange("track", e.target.value || undefined)}
        aria-label="Filter by position"
      >
        <option value="">All positions</option>
        {APPLICANT_TRACKS.map((item) => (
          <option key={item} value={item}>
            {item.replace("-", " ")}
          </option>
        ))}
      </select>
      <select
        className="native-select"
        value={sortBy}
        onChange={(e) => onChange("sortBy", e.target.value)}
        aria-label="Sort by"
      >
        <option value="applicationDate">Date</option>
        <option value="fullName">Name</option>
        <option value="status">Status</option>
      </select>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          onChange("sortOrder", sortOrder === "asc" ? "desc" : "asc")
        }
      >
        {sortOrder === "asc" ? "Asc" : "Desc"}
      </Button>
      {active ? (
        <Button type="button" variant="ghost" size="sm" onClick={onClear}>
          <X className="size-3.5" />
          Clear
        </Button>
      ) : null}
    </div>
  );
}
