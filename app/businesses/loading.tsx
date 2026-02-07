"use client";

import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";

function BusinessCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full skeleton-shimmer" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 skeleton-shimmer" />
            <Skeleton className="h-3 w-24 skeleton-shimmer" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full skeleton-shimmer" />
      </div>
      <Skeleton className="h-10 w-full skeleton-shimmer" />
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <Skeleton className="h-4 w-24 skeleton-shimmer" />
        <Skeleton className="h-4 w-28 skeleton-shimmer" />
      </div>
    </div>
  );
}

export default function BusinessesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="mb-10">
            <Skeleton className="h-8 w-64 mb-2 skeleton-shimmer" />
            <Skeleton className="h-4 w-96 skeleton-shimmer" />
          </div>

          {/* Search and Filters Skeleton */}
          <div className="mb-8 space-y-4">
            <Skeleton className="h-12 w-full max-w-2xl rounded-xl skeleton-shimmer" />
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  className="h-9 w-24 rounded-lg skeleton-shimmer"
                />
              ))}
            </div>
          </div>

          {/* Results Info Skeleton */}
          <Skeleton className="h-4 w-40 mb-6 skeleton-shimmer" />

          {/* Business Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
