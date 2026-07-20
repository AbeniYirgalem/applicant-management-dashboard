import { Suspense } from "react";
import { ApplicantSkeleton } from "@/components/applicants/applicant-skeleton";
import { ApplicantsPageClient } from "./applicants-page-client";

export default function ApplicantsPage() {
  return (
    <Suspense fallback={<ApplicantSkeleton />}>
      <ApplicantsPageClient />
    </Suspense>
  );
}