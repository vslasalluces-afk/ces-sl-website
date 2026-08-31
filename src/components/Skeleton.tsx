export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-peach-100 via-peach-200 to-peach-100 rounded-lg ${className}`}
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-peach-100 overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function TeamCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-peach-100 p-8 text-center">
      <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 mx-auto mb-2" />
      <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-4/5 mx-auto" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[600px] bg-gradient-to-b from-cream to-warm-white flex items-center">
      <div className="container-wide mx-auto px-4 md:px-8">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-40 rounded-full" />
            <Skeleton className="h-14 w-44 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
