"use client";
import { ExternalLink, LoaderCircle, Save } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ApplicantInfoSection,
  InfoRow,
} from "@/components/applicants/applicant-info-section";
import { StatusBadge } from "@/components/applicants/status-badge";
import { StatusSelector } from "@/components/applicants/status-selector";
import { useUpdateApplicantStatus } from "@/hooks/use-update-applicant-status";
import type { ApplicantDetail, ApplicantStatus } from "@/types/applicant";
import { capitalize, formatDate } from "@/utils/format";
function LinkItem({ href, label }: { href: string | null; label: string }) {
  return href ? (
    <a
      className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label}
      <ExternalLink className="size-3.5" />
    </a>
  ) : null;
}
export function ApplicantDetails({
  applicant,
}: {
  applicant: ApplicantDetail;
}) {
  const [status, setStatus] = useState<ApplicantStatus>(applicant.status);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = useUpdateApplicantStatus();
  const changed = status !== applicant.status;
  const save = () => {
    if (status === "accepted" || status === "rejected") setConfirmOpen(true);
    else mutation.mutate({ id: applicant.id, status });
  };
  const confirm = () => {
    setConfirmOpen(false);
    mutation.mutate({ id: applicant.id, status });
  };
  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">{applicant.fullName}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {applicant.email}
            </p>
          </div>
          <StatusBadge status={applicant.status} />
        </div>
      </div>
      <ApplicantInfoSection title="Personal information">
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Phone">{applicant.phoneNumber}</InfoRow>
          <InfoRow label="Location">{applicant.country}</InfoRow>
        </div>
      </ApplicantInfoSection>
      <ApplicantInfoSection title="Application">
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Position">{capitalize(applicant.track)}</InfoRow>
          <InfoRow label="Experience">
            {capitalize(applicant.experienceLevel)}
          </InfoRow>
          <InfoRow label="Applied">
            {formatDate(applicant.applicationDate)}
          </InfoRow>
          <InfoRow label="Last updated">
            {formatDate(applicant.updatedAt)}
          </InfoRow>
        </div>
      </ApplicantInfoSection>
      <ApplicantInfoSection title="Skills and links">
        <InfoRow label="Skills">
          <div className="flex flex-wrap gap-2">
            {applicant.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-muted px-2 py-1 text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </InfoRow>
        <div className="flex flex-wrap gap-4">
          <LinkItem href={applicant.portfolioUrl} label="Portfolio" />
          <LinkItem href={applicant.githubUrl} label="GitHub" />
          <LinkItem href={applicant.linkedInUrl} label="LinkedIn" />
        </div>
      </ApplicantInfoSection>
      {applicant.motivation ? (
        <ApplicantInfoSection title="Motivation">
          <p className="leading-6 text-muted-foreground">
            {applicant.motivation}
          </p>
        </ApplicantInfoSection>
      ) : null}
      <ApplicantInfoSection title="Update status">
        <StatusSelector
          value={status}
          onChange={setStatus}
          disabled={mutation.isPending}
        />
        <Button
          className="mt-4 w-full"
          disabled={!changed || mutation.isPending}
          onClick={save}
        >
          {mutation.isPending ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {mutation.isPending ? "Saving..." : "Save status"}
        </Button>
      </ApplicantInfoSection>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <h2 className="text-lg font-semibold">Confirm status change</h2>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to mark this applicant as {status}?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={status === "rejected" ? "destructive" : "default"}
              onClick={confirm}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
