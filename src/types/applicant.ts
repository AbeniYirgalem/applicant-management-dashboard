export const APPLICANT_STATUSES = [
  "pending",
  "shortlisted",
  "accepted",
  "rejected",
] as const;
export const APPLICANT_TRACKS = [
  "frontend",
  "backend",
  "ui-ux",
  "data-analytics",
  "mobile",
] as const;
export type ApplicantStatus = (typeof APPLICANT_STATUSES)[number];
export type ApplicantTrack = (typeof APPLICANT_TRACKS)[number];
export type SortBy =
  "fullName" | "email" | "applicationDate" | "status" | "track";
export type SortOrder = "asc" | "desc";
export interface Applicant {
  id: string;
  fullName: string;
  email: string;
  country: string;
  track: ApplicantTrack;
  status: ApplicantStatus;
  applicationDate: string;
}
export interface ApplicantDetail extends Applicant {
  phoneNumber: string;
  skills: string[];
  experienceLevel: "beginner" | "intermediate" | "advanced";
  portfolioUrl: string | null;
  githubUrl: string | null;
  linkedInUrl: string | null;
  motivation: string | null;
  notes: string | null;
  updatedAt: string;
}
export interface ApplicantFilters {
  page: number;
  limit: number;
  search?: string;
  status?: ApplicantStatus;
  track?: ApplicantTrack;
  country?: string;
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  sortBy: SortBy;
  sortOrder: SortOrder;
  simulateError?: boolean;
  delay?: number;
}
export interface ApplicantPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface PaginatedApplicants {
  data: Applicant[];
  meta: ApplicantPagination;
}
export interface UpdateApplicantStatusRequest {
  status: ApplicantStatus;
}
