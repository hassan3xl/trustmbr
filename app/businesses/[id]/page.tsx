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
import BusinessDetailsCard from "@/components/BusinessDetailsCard";

export default function BusinessDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: business, isLoading, error } = useBusiness(id);

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-muted-foreground">Loading business details...</p>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Business Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The business you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/businesses">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Businesses
          </Button>
        </Link>
      </div>
    );
  }



  return (
    <div className="py-8">
      <BusinessDetailsCard business={business} />
    </div>
  );
}
