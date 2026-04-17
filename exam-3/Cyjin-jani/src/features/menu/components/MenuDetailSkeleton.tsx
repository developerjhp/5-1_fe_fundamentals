export function MenuDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-4 pb-8 pt-3">
      <div className="aspect-4/3 w-full animate-pulse rounded-xl bg-muted" />
      <div className="flex flex-col gap-2">
        <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        <div className="h-5 w-24 animate-pulse rounded bg-muted" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="h-24 animate-pulse rounded-xl bg-muted" />
        <div className="h-24 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  );
}
