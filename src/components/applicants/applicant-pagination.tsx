import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApplicantPagination } from "@/types/applicant";

export function ApplicantPagination({
  meta,
  onPageChange,
  isFetching,
}: {
  meta: ApplicantPagination;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
}) {
  if (meta.totalPages <= 1) return null;
  const visibleCount = Math.min(meta.totalPages, 5);
  const startPage = Math.min(
    Math.max(1, meta.page - 2),
    meta.totalPages - visibleCount + 1,
  );
  const pages = Array.from(
    { length: visibleCount },
    (_, index) => startPage + index,
  );

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-3"
      aria-label="Applicants pagination"
    >
      <p className="text-sm text-muted-foreground">
        Showing page {meta.page} of {meta.totalPages} · {meta.total} applicants
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(meta.page - 1)}
          disabled={meta.page === 1 || isFetching}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            variant={page === meta.page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            disabled={isFetching}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(meta.page + 1)}
          disabled={meta.page === meta.totalPages || isFetching}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
}
