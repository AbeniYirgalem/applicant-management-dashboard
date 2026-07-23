import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApplicantEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center">
      <SearchX className="mx-auto size-6 text-muted-foreground" aria-hidden />
      <h2 className="mt-2.5 text-sm font-semibold">No applicants found</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Try adjusting your search or filters.
      </p>
      <Button className="mt-4" variant="outline" size="sm" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}
