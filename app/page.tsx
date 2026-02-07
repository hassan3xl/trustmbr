"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Shield,
  CheckCircle,
  TrendingUp,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { BusinessCard } from "@/components/business-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllBusinesses } from "@/lib/hooks/business.hook";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: businesses, isLoading: isBusinessesLoading } =
    useGetAllBusinesses();
  console.log(businesses);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/businesses?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  if (isBusinessesLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 tracking-wide">
                TRUSTED BY 500+ USERS
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              VERIFY BEFORE
              <br />
              <span className="text-emerald-400">YOU TRUST</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Check if a business is verified and performing well before you
              invest your time or money. We verify local businesses and display
              transparent financial insights.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for a business by name, industry, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-32 h-16 text-base bg-card border-border/50 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500/20 tracking-wide"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 bg-emerald-600 hover:bg-emerald-700 rounded-xl tracking-wide"
                >
                  SEARCH
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>150+ Verified Businesses</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-500" />
                <span>500+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span>100% Transparent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-wide mb-2">
                FEATURED VERIFIED BUSINESSES
              </h2>
              <p className="text-muted-foreground">
                Recently verified and trusted by the community
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 tracking-wide"
              onClick={() => router.push("/businesses")}
            >
              VIEW ALL
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {businesses?.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          <Button
            variant="outline"
            className="md:hidden w-full mt-6 tracking-wide"
            onClick={() => router.push("/businesses")}
          >
            VIEW ALL BUSINESSES
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold tracking-wide mb-4">
              HOW IT WORKS
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple process to verify and discover trustworthy businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-emerald-500 text-background text-sm font-bold">
                01
              </div>
              <div className="mt-4">
                <div className="p-3 w-fit rounded-xl bg-emerald-500/10 mb-4">
                  <Building2 className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 tracking-wide">
                  BUSINESS REGISTERS
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Businesses sign up and submit their documentation for
                  verification including registration, financials, and proof of
                  operation.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-emerald-500 text-background text-sm font-bold">
                02
              </div>
              <div className="mt-4">
                <div className="p-3 w-fit rounded-xl bg-emerald-500/10 mb-4">
                  <Shield className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 tracking-wide">
                  WE VERIFY
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our team reviews all submitted documents, verifies
                  authenticity, and assesses the business's financial health and
                  legitimacy.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur">
              <div className="absolute -top-4 left-8 px-3 py-1 rounded-full bg-emerald-500 text-background text-sm font-bold">
                03
              </div>
              <div className="mt-4">
                <div className="p-3 w-fit rounded-xl bg-emerald-500/10 mb-4">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2 tracking-wide">
                  USERS CHECK
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Anyone can search and view verified businesses, check their
                  monthly income, trust score, and make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="relative text-center">
              <h2 className="text-3xl font-bold tracking-wide mb-4">
                REGISTER YOUR BUSINESS
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join hundreds of verified businesses building trust with their
                customers. Get verified and showcase your credibility.
              </p>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 tracking-wide px-8"
              >
                GET STARTED NOW
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
