import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
      <AlertCircle className="mx-auto size-6 text-destructive" aria-hidden />
      <h2 className="mt-2.5 text-sm font-semibold">Unable to load data</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Check your connection and try again.
      </p>
      <Button className="mt-4" variant="outline" size="sm" onClick={onRetry}>
        <RefreshCw className="size-3.5" />
        Retry
      </Button>
    </div>
  );
}
