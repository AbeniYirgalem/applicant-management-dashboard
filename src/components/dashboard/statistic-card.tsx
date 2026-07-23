import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatisticCardProps {
  title: string;
  value?: number;
  description: string;
  icon: LucideIcon;
  isLoading?: boolean;
}

export function StatisticCard({
  title,
  value,
  description,
  icon: Icon,
  isLoading,
}: StatisticCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="size-3.5" />
          </div>
          <Skeleton className="mt-3 h-7 w-14" />
          <Skeleton className="mt-2 h-3 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-colors duration-150 hover:border-border/80">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <Icon className="size-3.5 text-muted-foreground/70" aria-hidden />
        </div>
        <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">
          {value?.toLocaleString() ?? "—"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
