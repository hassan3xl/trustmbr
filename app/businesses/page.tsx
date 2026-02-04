"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search, SlidersHorizontal } from "lucide-react";

import { BusinessCard } from "@/components/business-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { businesses, Business } from "@/lib/data";

type FilterStatus = "all" | Business["verificationStatus"];

export default function BusinessesPage() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      // Filter by status
      if (
        statusFilter !== "all" &&
        business.verificationStatus !== statusFilter
      ) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          business.name.toLowerCase().includes(query) ||
          business.industry.toLowerCase().includes(query) ||
          business.location.toLowerCase().includes(query) ||
          business.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, statusFilter]);

  const filterButtons: { label: string; value: FilterStatus; count: number }[] =
    [
      { label: "ALL", value: "all", count: businesses.length },
      {
        label: "VERIFIED",
        value: "verified",
        count: businesses.filter((b) => b.verificationStatus === "verified")
          .length,
      },
      {
        label: "PENDING",
        value: "pending",
        count: businesses.filter((b) => b.verificationStatus === "pending")
          .length,
      },
      {
        label: "UNVERIFIED",
        value: "unverified",
        count: businesses.filter((b) => b.verificationStatus === "unverified")
          .length,
      },
    ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-wide mb-2">
            BROWSE BUSINESSES
          </h1>
          <p className="text-muted-foreground">
            Discover verified and trusted businesses in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, industry, or location..."
            className="max-w-2xl"
          />

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filter:</span>
            </div>
            {filterButtons.map((filter) => (
              <Button
                key={filter.value}
                variant={statusFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(filter.value)}
                className={`tracking-wide ${
                  statusFilter === filter.value
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : ""
                }`}
              >
                {filter.label}
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 px-1.5 text-xs bg-background/20"
                >
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-medium">
              {filteredBusinesses.length}
            </span>{" "}
            {filteredBusinesses.length === 1 ? "business" : "businesses"}
            {searchQuery && (
              <>
                {" "}
                for "<span className="text-emerald-400">{searchQuery}</span>"
              </>
            )}
          </p>
        </div>

        {/* Business Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business, index) => (
              <BusinessCard
                key={business.id}
                business={business}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
