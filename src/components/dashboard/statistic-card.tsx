import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  if (isLoading)
    return (
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="size-10 rounded-xl" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-9 w-16" />
          <Skeleton className="mt-3 h-4 w-36" />
        </CardContent>
      </Card>
    );
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
          <Icon className="size-5" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">
          {value?.toLocaleString() ?? "—"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
