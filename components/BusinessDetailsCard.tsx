"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  MapPin,
  Building2,
  Calendar,
  Users,
  Globe,
  Mail,
  Phone,
  FileText,
  Shield,
  Star,
  Loader2,
} from "lucide-react";

import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BusinessType, BusinessStatus } from "@/lib/types/business.types";
import { useBusiness } from "@/lib/hooks/business.hook";

interface BusinessDetailsCardProps {
  business: BusinessType;
}

function getStatusConfig(status: BusinessStatus) {
  switch (status) {
    case "verified":
      return {
        label: "VERIFIED",
        icon: CheckCircle2,
        className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        description: "This business has been verified by TrustMBR",
      };
    case "pending":
      return {
        label: "PENDING VERIFICATION",
        icon: Clock,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        description: "Verification is in progress",
      };
    case "rejected":
      return {
        label: "REJECTED",
        icon: AlertCircle,
        className: "bg-red-500/10 text-red-500 border-red-500/20",
        description: "This business verification was rejected",
      };
    default:
      return {
        label: "UNKNOWN",
        icon: AlertCircle,
        className: "bg-gray-500/10 text-gray-500 border-gray-500/20",
        description: "Status unknown",
      };
  }
}

function getTrustScoreColor(score: number) {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const BusinessDetailsCard = ({ business }: BusinessDetailsCardProps) => {
  const statusConfig = getStatusConfig(business.status);
  const StatusIcon = statusConfig.icon;
  return (
    <div>
      {" "}
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Business Info */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Avatar */}
                  <Avatar className="h-24 w-24 border-4 border-border">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-2xl font-bold">
                      {business.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start gap-3 mb-4">
                      <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                        {business.name}
                      </h1>
                      <Badge
                        variant="outline"
                        className={`${statusConfig.className} flex items-center gap-1 text-xs tracking-wide`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusConfig.label}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {business.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{business.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{business.industry}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Score Card */}
          <div>
            <Card className="border-border/50 bg-card/50 backdrop-blur h-full">
              <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                <Shield className="h-12 w-12 text-emerald-500 mb-4" />
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  Trust Score
                </p>
                <p
                  className={`text-6xl font-bold ${getTrustScoreColor(
                    business.trust_score,
                  )}`}
                >
                  {business.trust_score}
                </p>
                <p className="text-sm text-muted-foreground mt-2">out of 100</p>
                <div className="flex items-center gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(business.trust_score / 20)
                          ? "text-emerald-500 fill-emerald-500"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Trust Score"
            value={`${business.trust_score}/100`}
            subtitle="Overall rating"
            icon={Shield}
            variant="success"
          />
          <StatsCard
            title="Industry"
            value={business.industry}
            icon={Building2}
            variant="default"
          />
          <StatsCard
            title="Status"
            value={statusConfig.label}
            icon={statusConfig.icon}
            variant={business.status === "verified" ? "success" : "default"}
          />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Verification Details */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg tracking-wide flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                VERIFICATION STATUS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl ${statusConfig.className} border`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon className="h-5 w-5" />
                    <span className="font-semibold">{statusConfig.label}</span>
                  </div>
                  <p className="text-sm opacity-80">
                    {statusConfig.description}
                  </p>
                </div>

                {business.verified_at && (
                  <div className="flex items-center justify-between py-3 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">
                      Verified On
                    </span>
                    <span className="text-sm font-medium">
                      {new Date(business.verified_at).toLocaleDateString(
                        "en-NG",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">
                    Registration Number
                  </span>
                  <span className="text-sm font-medium font-mono">
                    {business.registration_number}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">
                    Trust Score
                  </span>
                  <span
                    className={`text-sm font-bold ${getTrustScoreColor(
                      business.trust_score,
                    )}`}
                  >
                    {business.trust_score}/100
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg tracking-wide flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-500" />
                CONTACT INFORMATION
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <MapPin className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Address
                    </p>
                    <p className="text-sm">{business.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <Mail className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-sm">{business.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <Phone className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-sm">{business.phone}</p>
                  </div>
                </div>

                {business.website && (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50">
                    <div className="p-3 rounded-lg bg-emerald-500/10">
                      <Globe className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Website
                      </p>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-400 hover:underline"
                      >
                        {business.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsCard;
