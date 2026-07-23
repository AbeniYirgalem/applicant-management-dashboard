import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/applicants/status-badge";
import type { Applicant } from "@/types/applicant";
import { capitalize, formatDate } from "@/utils/format";

export function ApplicantCards({
  applicants,
  onSelect,
}: {
  applicants: Applicant[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-2.5 md:hidden">
      {applicants.map((applicant) => (
        <Card key={applicant.id} className="shadow-none">
          <CardContent className="p-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-medium">{applicant.fullName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {applicant.email}
                </p>
              </div>
              <StatusBadge status={applicant.status} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
              <div>
                <dt className="text-muted-foreground">Country</dt>
                <dd className="mt-0.5">{applicant.country}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Position</dt>
                <dd className="mt-0.5">{capitalize(applicant.track)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted-foreground">Applied</dt>
                <dd className="mt-0.5">
                  {formatDate(applicant.applicationDate)}
                </dd>
              </div>
            </dl>
            <Button
              className="mt-3 w-full"
              variant="outline"
              size="sm"
              onClick={() => onSelect(applicant.id)}
            >
              <Eye className="size-3.5" />
              View details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
