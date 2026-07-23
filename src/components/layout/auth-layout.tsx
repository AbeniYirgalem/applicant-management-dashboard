export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4 sm:p-6">
      <section className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-md border bg-muted text-xs font-semibold">
            IN
          </div>
          <div>
            <p className="text-sm font-medium">INFNOVA</p>
            <p className="text-xs text-muted-foreground">
              Applicant Management
            </p>
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}
