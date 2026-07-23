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
      className="inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label}
      <ExternalLink className="size-3" />
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
    <>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 space-y-5 overflow-y-auto pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold leading-tight">
                {applicant.fullName}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {applicant.email}
              </p>
            </div>
            <StatusBadge status={applicant.status} />
          </div>

          <ApplicantInfoSection title="Personal information">
            <div className="grid grid-cols-2 gap-3">
              <InfoRow label="Phone">{applicant.phoneNumber}</InfoRow>
              <InfoRow label="Location">{applicant.country}</InfoRow>
            </div>
          </ApplicantInfoSection>

          <ApplicantInfoSection title="Application">
            <div className="grid grid-cols-2 gap-3">
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
              <div className="flex flex-wrap gap-1.5">
                {applicant.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border bg-muted/50 px-2 py-0.5 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </InfoRow>
            <div className="flex flex-wrap gap-3 pt-1">
              <LinkItem href={applicant.portfolioUrl} label="Portfolio" />
              <LinkItem href={applicant.githubUrl} label="GitHub" />
              <LinkItem href={applicant.linkedInUrl} label="LinkedIn" />
            </div>
          </ApplicantInfoSection>

          {applicant.motivation ? (
            <ApplicantInfoSection title="Motivation">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {applicant.motivation}
              </p>
            </ApplicantInfoSection>
          ) : null}
        </div>

        <div className="shrink-0 border-t bg-card pt-3.5">
          <StatusSelector
            value={status}
            onChange={setStatus}
            disabled={mutation.isPending}
          />
          <Button
            className="mt-3 w-full"
            size="sm"
            disabled={!changed || mutation.isPending}
            onClick={save}
          >
            {mutation.isPending ? (
              <LoaderCircle className="size-3.5 animate-spin" />
            ) : (
              <Save className="size-3.5" />
            )}
            {mutation.isPending ? "Saving..." : "Save status"}
          </Button>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="gap-3">
          <div className="space-y-1.5">
            <h2 className="text-base font-semibold">Confirm status change</h2>
            <p className="text-sm text-muted-foreground">
              Mark this applicant as{" "}
              <span className="font-medium text-foreground">{status}</span>?
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant={status === "rejected" ? "destructive" : "default"}
              onClick={confirm}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
