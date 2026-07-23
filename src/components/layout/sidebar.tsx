"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="space-y-0.5">
      {DASHBOARD_NAVIGATION.map(({ label, href, icon: Icon, available }) => {
        const active = available && pathname === href;
        const className = cn(
          "relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-150",
          active
            ? "bg-accent text-foreground"
            : available
              ? "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              : "cursor-not-allowed text-muted-foreground/50",
        );

        const content = (
          <>
            {active ? (
              <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
            ) : null}
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
            {!available ? (
              <span className="ml-auto text-[10px] font-normal uppercase tracking-wide text-muted-foreground/70">
                Soon
              </span>
            ) : null}
          </>
        );

        return available ? (
          <Link
            key={label}
            href={href}
            className={className}
            onClick={onNavigate}
          >
            {content}
          </Link>
        ) : (
          <span key={label} className={className} aria-disabled="true">
            {content}
          </span>
        );
      })}
    </nav>
  );
}
