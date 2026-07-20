export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_34%),linear-gradient(180deg,theme(colors.background),theme(colors.muted/20))] p-6">
      <section className="w-full max-w-md rounded-2xl border bg-card/90 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
            IN
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              INFNOVA
            </p>
            <p className="text-sm text-muted-foreground">
              Applicant Management Dashboard
            </p>
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}
