export function PageHeader({
  title,
  description,
  meta,
}: {
  title: string;
  description?: string;
  meta?: string;
}) {
  return (
    <header className="space-y-1">
      <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h1>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
      {meta ? (
        <p className="text-xs text-muted-foreground">{meta}</p>
      ) : null}
    </header>
  );
}
