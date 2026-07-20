export interface DashboardSummary {
  totalApplicants: number;
  byStatus: Record<string, number>;
  byTrack: Record<string, number>;
}

export interface DashboardStatistics {
  totalApplicants: number;
  pendingApplicants: number;
  underReviewApplicants: number;
  interviewStageApplicants: number;
  acceptedApplicants: number;
  rejectedApplicants: number;
}
