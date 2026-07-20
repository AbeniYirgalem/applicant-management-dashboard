export const API_ENDPOINTS = {
  auth: { login: "/auth/login" },
  applicants: {
    list: "/applicants",
    detail: (id: string) => `/applicants/${id}`,
    status: (id: string) => `/applicants/${id}/status`,
  },
  dashboard: { summary: "/dashboard/summary" },
} as const;
