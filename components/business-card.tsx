import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  MapPin,
  Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Business, formatCurrency } from "@/lib/data";

interface BusinessCardProps {
  business: Business;
  index?: number; // For staggered animations
}

function getStatusConfig(status: Business["verificationStatus"]) {
  switch (status) {
    case "verified":
      return {
        label: "VERIFIED",
        icon: CheckCircle2,
        className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      };
    case "pending":
      return {
        label: "PENDING",
        icon: Clock,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      };
    case "unverified":
      return {
        label: "UNVERIFIED",
        icon: AlertCircle,
        className: "bg-red-500/10 text-red-500 border-red-500/20",
      };
  }
}

export function BusinessCard({ business, index = 0 }: BusinessCardProps) {
  const statusConfig = getStatusConfig(business.verificationStatus);
  const StatusIcon = statusConfig.icon;
  const animationDelay = `${index * 100}ms`;

  return (
    <Link href={`/businesses/${business.id}`}>
      <Card
        className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 opacity-0 animate-slide-up"
        style={{ animationDelay, animationFillMode: "forwards" }}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-sm font-bold">
                  {business.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold tracking-wide text-foreground group-hover:text-emerald-400 transition-colors">
                  {business.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{business.location}</span>
                </div>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`${statusConfig.className} flex items-center gap-1 text-xs tracking-wide`}
            >
              <StatusIcon className="h-3 w-3" />
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {business.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground tracking-wide">
                {business.industry}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-400 tracking-wide">
                {formatCurrency(business.monthlyIncome)}
                <span className="text-xs text-muted-foreground font-normal">
                  /mo
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
