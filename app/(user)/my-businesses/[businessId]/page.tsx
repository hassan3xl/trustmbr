"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  AlertCircle,
  Loader2,
  CreditCard,
  MessageCircle,
  CheckCircle,
  Clock,
  XCircle,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBusiness } from "@/lib/hooks/business.hook";
import BusinessDetailsCard from "@/components/BusinessDetailsCard";

export default function MyBusinessDetailsPage() {
  const params = useParams();
  const businessId = params.businessId as string;

  const { data: business, isLoading, error } = useBusiness(businessId);

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
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Status Action Cards - Show based on status */}
        {business.status === "pending" && (
          <Card className="border-yellow-500/30 bg-yellow-500/5 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg tracking-wide flex items-center gap-2 text-yellow-500">
                <Clock className="h-5 w-5" />
                VERIFICATION PENDING
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-muted-foreground mb-2">
                    Your business is awaiting verification. Complete your
                    payment to start the verification process.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                    >
                      Verification Fee: ₦25,000
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      Processing Time: 2-3 Business Days
                    </Badge>
                  </div>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 tracking-wide shrink-0">
                  <CreditCard className="h-4 w-4 mr-2" />
                  PAY FOR VERIFICATION
                </Button>
              </div>

              {/* Payment Info */}
              <div className="mt-6 pt-4 border-t border-yellow-500/20">
                <h4 className="text-sm font-semibold mb-3 text-yellow-400">
                  What happens after payment?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <CreditCard className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">1. Payment Received</p>
                      <p className="text-xs text-muted-foreground">
                        Secure payment processing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <Shield className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">2. Review Process</p>
                      <p className="text-xs text-muted-foreground">
                        Documents verified by our team
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        3. Verification Complete
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Receive your trust badge
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {business.status === "rejected" && (
          <Card className="border-red-500/30 bg-red-500/5 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg tracking-wide flex items-center gap-2 text-red-500">
                <XCircle className="h-5 w-5" />
                VERIFICATION REJECTED
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-muted-foreground mb-2">
                    Unfortunately, your business verification was not approved.
                    Please contact our support team for more details and next
                    steps.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-red-500/10 text-red-500 border-red-500/30"
                    >
                      Status: Rejected
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 tracking-wide shrink-0"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  CONTACT ADMIN
                </Button>
              </div>

              {/* Rejection Info */}
              <div className="mt-6 pt-4 border-t border-red-500/20">
                <h4 className="text-sm font-semibold mb-3 text-red-400">
                  Common reasons for rejection:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    Invalid or expired registration documents
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    Incomplete business information
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    Unable to verify business address
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-3 w-3 text-red-500" />
                    Discrepancies in submitted data
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {business.status === "verified" && (
          <Card className="border-emerald-500/30 bg-emerald-500/5 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg tracking-wide flex items-center gap-2 text-emerald-500">
                <CheckCircle className="h-5 w-5" />
                VERIFIED BUSINESS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-muted-foreground mb-2">
                    Congratulations! Your business has been verified. You can
                    now display the TrustMBR verification badge on your website
                    and marketing materials.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground">
                      Trust Score: {business.trust_score}/100
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 tracking-wide"
                  >
                    DOWNLOAD BADGE
                  </Button>
                  <Link href={`/businesses/${business.id}`}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 tracking-wide">
                      VIEW PUBLIC PAGE
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Details Card */}
        <BusinessDetailsCard business={business} />
      </div>
    </div>
  );
}
