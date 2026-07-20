export const QUERY_KEYS = {
  auth: ["auth"] as const,
  applicants: {
    list: ["applicants", "list"] as const,
    detail: ["applicants", "detail"] as const,
  },
  dashboard: { summary: ["dashboard", "summary"] as const },
} as const;
