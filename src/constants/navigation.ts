import { BarChart3, LayoutDashboard, Settings, Users } from "lucide-react";
import { ROUTES } from "@/constants/routes";
export const DASHBOARD_NAVIGATION = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard.home,
    icon: LayoutDashboard,
    available: true,
  },
  {
    label: "Applicants",
    href: ROUTES.dashboard.applicants,
    icon: Users,
    available: true,
  },
  { label: "Analytics", href: "#", icon: BarChart3, available: false },
  { label: "Settings", href: "#", icon: Settings, available: false },
] as const;
