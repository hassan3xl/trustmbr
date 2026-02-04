"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Building2,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Eye,
  MoreVertical,
} from "lucide-react";

import { StatsCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { businesses, Business, formatCurrency } from "@/lib/data";

function getStatusBadge(status: Business["verificationStatus"]) {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          VERIFIED
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20">
          <Clock className="h-3 w-3 mr-1" />
          PENDING
        </Badge>
      );
    case "unverified":
      return (
        <Badge className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
          <AlertCircle className="h-3 w-3 mr-1" />
          UNVERIFIED
        </Badge>
      );
  }
}

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const verifiedCount = businesses.filter(
    (b) => b.verificationStatus === "verified",
  ).length;
  const pendingCount = businesses.filter(
    (b) => b.verificationStatus === "pending",
  ).length;
  const totalRevenue = businesses.reduce((sum, b) => sum + b.monthlyIncome, 0);

  const filteredBusinesses = businesses.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-emerald-500" />
            <h1 className="text-2xl font-bold tracking-wide">
              ADMIN DASHBOARD
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage and verify registered businesses
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
          >
            <StatsCard
              title="Total Businesses"
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
              subtitle="Approved businesses"
              icon={CheckCircle}
              variant="success"
            />
          </div>
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <StatsCard
              title="Pending Review"
              value={pendingCount}
              subtitle="Awaiting verification"
              icon={Clock}
              variant="warning"
            />
          </div>
          <div
            className="animate-slide-up opacity-0"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <StatsCard
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              subtitle="Monthly combined"
              icon={TrendingUp}
              variant="success"
              trend={{ value: 8, isPositive: true }}
            />
          </div>
        </div>

        {/* Business Management */}
        <Card
          className="border-border/50 bg-card/50 backdrop-blur animate-slide-up opacity-0"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg tracking-wide flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-500" />
                BUSINESS MANAGEMENT
              </CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search businesses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9 bg-background/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="text-xs tracking-wide">
                      BUSINESS
                    </TableHead>
                    <TableHead className="text-xs tracking-wide">
                      INDUSTRY
                    </TableHead>
                    <TableHead className="text-xs tracking-wide">
                      STATUS
                    </TableHead>
                    <TableHead className="text-xs tracking-wide">
                      MONTHLY INCOME
                    </TableHead>
                    <TableHead className="text-xs tracking-wide">
                      TRUST SCORE
                    </TableHead>
                    <TableHead className="text-xs tracking-wide text-right">
                      ACTIONS
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBusinesses.map((business, index) => (
                    <TableRow
                      key={business.id}
                      className="border-border/50 hover:bg-emerald-500/5 animate-fade-in opacity-0"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-border">
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-xs">
                              {business.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {business.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {business.location}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{business.industry}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(business.verificationStatus)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium text-emerald-400">
                          {formatCurrency(business.monthlyIncome)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                business.trustScore >= 80
                                  ? "bg-emerald-500"
                                  : business.trustScore >= 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${business.trustScore}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {business.trustScore}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/businesses/${business.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredBusinesses.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No businesses found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
