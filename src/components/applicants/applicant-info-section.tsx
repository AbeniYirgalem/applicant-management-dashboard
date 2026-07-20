import type { ReactNode } from "react";
export function ApplicantInfoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b pb-5 last:border-0">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-3 space-y-3 text-sm">{children}</div>
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
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 break-words text-foreground">{children}</div>
    </div>
  );
}
