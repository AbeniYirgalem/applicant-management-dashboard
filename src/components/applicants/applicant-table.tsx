import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/applicants/status-badge";
import type { Applicant } from "@/types/applicant";
import { capitalize, formatDate } from "@/utils/format";

export function ApplicantTable({
  applicants,
  onSelect,
}: {
  applicants: Applicant[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="hidden overflow-hidden rounded-lg border bg-card md:block">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-9 px-4 text-xs font-medium uppercase tracking-wide">
              Applicant
            </TableHead>
            <TableHead className="h-9 px-4 text-xs font-medium uppercase tracking-wide">
              Country
            </TableHead>
            <TableHead className="h-9 px-4 text-xs font-medium uppercase tracking-wide">
              Position
            </TableHead>
            <TableHead className="h-9 px-4 text-xs font-medium uppercase tracking-wide">
              Status
            </TableHead>
            <TableHead className="h-9 px-4 text-xs font-medium uppercase tracking-wide">
              Applied
            </TableHead>
            <TableHead className="h-9 w-20 px-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map((applicant) => (
            <TableRow
              key={applicant.id}
              className="cursor-pointer transition-colors duration-150"
              onClick={() => onSelect(applicant.id)}
            >
              <TableCell className="px-4 py-2.5">
                <p className="font-medium leading-tight">{applicant.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {applicant.email}
                </p>
              </TableCell>
              <TableCell className="px-4 py-2.5 text-muted-foreground">
                {applicant.country}
              </TableCell>
              <TableCell className="px-4 py-2.5">
                {capitalize(applicant.track)}
              </TableCell>
              <TableCell className="px-4 py-2.5">
                <StatusBadge status={applicant.status} />
              </TableCell>
              <TableCell className="px-4 py-2.5 text-muted-foreground">
                {formatDate(applicant.applicationDate)}
              </TableCell>
              <TableCell className="px-4 py-2.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelect(applicant.id);
                  }}
                  aria-label={`View ${applicant.fullName}`}
                >
                  <Eye className="size-3.5" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
