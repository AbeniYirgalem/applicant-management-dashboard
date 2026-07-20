"use client";
import {
  BriefcaseBusiness,
  CheckCircle2,
  CircleDashed,
  Clock3,
  UsersRound,
  XCircle,
} from "lucide-react";
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
      title: "Pending Applications",
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
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary">Overview</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome back, Admin
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Manage internship applicants and track application progress from one
          place.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }).format(new Date())}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <StatisticCard key={card.title} {...card} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
}
