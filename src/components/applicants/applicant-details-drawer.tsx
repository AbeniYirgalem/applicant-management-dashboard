"use client";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { ApplicantDetails } from "@/components/applicants/applicant-details";
import { useApplicant } from "@/hooks/use-applicant";

export function ApplicantDetailsDrawer({
  applicantId,
  onOpenChange,
}: {
  applicantId: string | null;
  onOpenChange: (open: boolean) => void;
}) {
  const query = useApplicant(applicantId);

  return (
    <Sheet open={Boolean(applicantId)} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-md"
      >
        <div className="shrink-0 border-b px-5 py-3.5">
          <h2 className="text-sm font-semibold">Applicant details</h2>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 pt-4">
          {query.isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : query.isError ? (
            <div className="py-12 text-center">
              <AlertCircle className="mx-auto size-6 text-destructive" />
              <h3 className="mt-3 text-sm font-semibold">
                Unable to load applicant
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                The applicant may no longer be available.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                size="sm"
                onClick={() => void query.refetch()}
              >
                <LoaderCircle className="size-3.5" />
                Try again
              </Button>
            </div>
          ) : query.data ? (
            <ApplicantDetails
              key={`${query.data.id}-${query.data.status}`}
              applicant={query.data}
            />
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
