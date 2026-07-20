import { Skeleton } from "@/components/ui/skeleton";
export function ApplicantSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border bg-card p-4">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 border-b pb-3 last:border-0"
        >
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-52" />
          </div>
          <Skeleton className="h-7 w-20" />
        </div>
      ))}
    </div>
  );
}
