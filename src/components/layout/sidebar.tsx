"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/utils";
export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard navigation" className="space-y-1">
      {DASHBOARD_NAVIGATION.map(({ label, href, icon: Icon, available }) => {
        const active = available && pathname === href;
        const className = cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
          active
            ? "bg-primary text-primary-foreground"
            : available
              ? "text-muted-foreground hover:bg-muted hover:text-foreground"
              : "cursor-not-allowed text-muted-foreground/60",
        );
        return available ? (
          <Link
            key={label}
            href={href}
            className={className}
            onClick={onNavigate}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ) : (
          <span key={label} className={className} aria-disabled="true">
            <Icon className="size-4" />
            {label}
            <span className="ml-auto text-xs">Soon</span>
          </span>
        );
      })}
    </nav>
  );
}
