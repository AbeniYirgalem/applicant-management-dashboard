"use client";
import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDashed,
  Clock3,
  UsersRound,
  XCircle,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ErrorState } from "@/components/dashboard/error-state";
import { StatisticCard } from "@/components/dashboard/statistic-card";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardStats();

  if (isError) return <ErrorState onRetry={() => void refetch()} />;
  if (!isLoading && (!data || data.totalApplicants === 0))
    return <EmptyState />;

  const status = data?.byStatus;
  const cards = [
    {
      title: "Total Applicants",
      value: data?.totalApplicants,
      description: "All applications received",
      icon: UsersRound,
    },
    {
      title: "Pending",
      value: status?.pending ?? 0,
      description: "Awaiting initial review",
      icon: Clock3,
    },
    {
      title: "Under Review",
      value: status?.shortlisted ?? status?.under_review ?? 0,
      description: "Currently being assessed",
      icon: CircleDashed,
    },
    {
      title: "Interview Stage",
      value: status?.interview_scheduled ?? 0,
      description: "Interviews in progress",
      icon: BriefcaseBusiness,
    },
    {
      title: "Accepted",
      value: status?.accepted ?? 0,
      description: "Successful candidates",
      icon: CheckCircle2,
    },
    {
      title: "Rejected",
      value: status?.rejected ?? 0,
      description: "Applications closed",
      icon: XCircle,
    },
  ];

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <section className="space-y-5">
      <PageHeader
        title="Overview"
        description="Track application volume and pipeline status."
        meta={today}
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <StatisticCard key={card.title} {...card} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
}
