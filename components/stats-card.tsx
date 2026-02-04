import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: {
    icon: "text-primary bg-primary/10",
    trend: "text-primary",
  },
  success: {
    icon: "text-emerald-500 bg-emerald-500/10",
    trend: "text-emerald-500",
  },
  warning: {
    icon: "text-yellow-500 bg-yellow-500/10",
    trend: "text-yellow-500",
  },
  danger: {
    icon: "text-red-500 bg-red-500/10",
    trend: "text-red-500",
  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground tracking-wide uppercase mb-2">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {trend.isPositive ? "+" : "-"}
                  {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground">
                  from last month
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl ${styles.icon}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
