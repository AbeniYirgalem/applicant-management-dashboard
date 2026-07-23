import { Skeleton } from "@/components/ui/skeleton";

export function ApplicantSkeleton() {
  return (
    <div className="space-y-0 overflow-hidden rounded-lg border bg-card">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 border-b px-4 py-3 last:border-0"
        >
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  );
}
