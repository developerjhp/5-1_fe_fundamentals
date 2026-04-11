export function MyReservationListSkeleton() {
  return (
    <ul className="flex w-full flex-col gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="animate-pulse rounded-xl border bg-card p-4 shadow-sm">
          <div className="mb-3 h-5 w-2/5 rounded bg-muted" />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 shrink-0 rounded bg-muted" />
              <div className="h-5 w-24 rounded bg-muted" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 shrink-0 rounded bg-muted" />
              <div className="h-5 w-28 rounded bg-muted" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 shrink-0 rounded bg-muted" />
              <div className="h-5 w-32 rounded bg-muted" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
