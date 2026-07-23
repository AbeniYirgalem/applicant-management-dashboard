import type { ReactNode } from "react";

export function ApplicantInfoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b pb-4 last:border-0 last:pb-0">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      <div className="mt-2.5 space-y-2.5 text-sm">{children}</div>
    </section>
  );
}

export function InfoRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-0.5 break-words text-foreground">{children}</div>
    </div>
  );
}
