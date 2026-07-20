import { Inbox } from "lucide-react";
export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed p-10 text-center">
      <Inbox className="mx-auto size-9 text-muted-foreground" />
      <h2 className="mt-3 font-semibold">No data available yet.</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Statistics will appear after applications are submitted.
      </p>
    </div>
  );
}
