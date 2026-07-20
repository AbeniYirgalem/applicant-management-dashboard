export const ROUTES = {
  home: "/",
  auth: { login: "/login" },
  dashboard: { home: "/dashboard", applicants: "/dashboard/applicants" },
} as const;
