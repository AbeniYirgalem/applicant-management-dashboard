import { Inbox } from "lucide-react";

export function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center">
      <Inbox className="mx-auto size-6 text-muted-foreground" aria-hidden />
      <h2 className="mt-2.5 text-sm font-semibold">No data yet</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Statistics will appear after applications are submitted.
      </p>
    </div>
  );
}
