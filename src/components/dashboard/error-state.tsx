import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
interface ErrorStateProps {
  onRetry: () => void;
}
export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
      <AlertCircle className="mx-auto size-8 text-destructive" />
      <h2 className="mt-3 font-semibold">
        Unable to load dashboard statistics.
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Check your connection and try again.
      </p>
      <Button className="mt-5" variant="outline" onClick={onRetry}>
        <RefreshCw className="size-4" />
        Retry
      </Button>
    </div>
  );
}
