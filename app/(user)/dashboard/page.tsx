"use client";

import Link from "next/link";
import {
  Building2,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Loader2,
  User,
  TrendingUp,
} from "lucide-react";

import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useGetMyBusinesses } from "@/lib/hooks/business.hook";
import { BusinessType, BusinessStatus } from "@/lib/types/business.types";
import DefaultLoader from "@/components/DefaultLoader";

function getStatusBadge(status: BusinessStatus) {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          VERIFIED
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          <Clock className="h-3 w-3 mr-1" />
          PENDING
        </Badge>
      );
    case "rejected":
      return (
        <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
          <AlertCircle className="h-3 w-3 mr-1" />
          REJECTED
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">
          UNKNOWN
        </Badge>
      );
  }
}

export default function UserDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { data: businesses = [], isLoading: businessesLoading } =
    useGetMyBusinesses();

  const isLoading = authLoading || businessesLoading;

  const verifiedCount = businesses.filter(
    (b: BusinessType) => b.status === "verified",
  ).length;
  const pendingCount = businesses.filter(
    (b: BusinessType) => b.status === "pending",
  ).length;

  if (isLoading) {
    return <DefaultLoader title="Loading dashboard..." />;
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-wide mb-2">
                WELCOME BACK
                {user?.full_name && (
                  <span className="text-emerald-500">, {user.full_name}</span>
                )}
              </h1>
              <p className="text-muted-foreground">
                Manage your businesses and track verification status
              </p>
            </div>
            <Link href="/my-businesses/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700 tracking-wide">
                <Plus className="h-4 w-4 mr-2" />
                REGISTER BUSINESS
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            <StatsCard
              title="My Businesses"
              value={businesses.length}
              subtitle="Registered"
              icon={Building2}
              variant="default"
            />
          </div>
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <StatsCard
              title="Verified"
              value={verifiedCount}
              subtitle="Approved"
              icon={CheckCircle}
              variant="success"
            />
          </div>
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <StatsCard
              title="Pending"
              value={pendingCount}
              subtitle="Awaiting review"
              icon={Clock}
              variant="warning"
            />
          </div>
        </div>

        {/* My Businesses */}
        <Card
          className="border-border/50 bg-card/50 backdrop-blur animate-slide-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg tracking-wide flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-500" />
                MY BUSINESSES
              </CardTitle>
              <Link href="/my-businesses/register">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {businesses.length > 0 ? (
              <div className="space-y-4">
                {businesses.map((business: BusinessType, index: number) => (
                  <div
                    key={business.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-background/50 border border-border/30 hover:border-emerald-500/30 transition-colors animate-fade-in opacity-0"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold">
                          {business.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-base">
                          {business.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{business.industry}</span>
                          <span>•</span>
                          <span>{business.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-medium">
                          {business.trust_score}/100
                        </span>
                      </div>
                      {getStatusBadge(business.status)}
                      <Link href={`/my-businesses/${business.id}`}>
                        <Button variant="ghost" size="sm" className="p-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No businesses registered yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Register your first business to get started with verification
                </p>
                <Link href="/businesses/register">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Register Business
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
