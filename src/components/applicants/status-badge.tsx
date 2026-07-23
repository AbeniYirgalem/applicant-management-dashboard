import { Clock3, CircleDashed, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ApplicantStatus } from "@/types/applicant";

const config = {
  pending: {
    label: "Pending",
    icon: Clock3,
    className:
      "border-amber-200/80 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400",
  },
  shortlisted: {
    label: "Review",
    icon: CircleDashed,
    className:
      "border-blue-200/80 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400",
  },
  accepted: {
    label: "Accepted",
    icon: CheckCircle2,
    className:
      "border-emerald-200/80 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className:
      "border-red-200/80 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400",
  },
} as const;

export function StatusBadge({ status }: { status: ApplicantStatus }) {
  const item = config[status];
  const Icon = item.icon;

  return (
    <Badge variant="outline" className={`gap-1 font-normal ${item.className}`}>
      <Icon className="size-3" aria-hidden />
      {item.label}
    </Badge>
  );
}
