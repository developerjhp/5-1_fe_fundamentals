function MenuCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-card">
      <div className="aspect-square w-full animate-pulse bg-muted" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function MenuListSkeleton() {
  return (
    <ul className="grid grid-cols-2 gap-3 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: 스켈레톤은 정적 목록이므로 index 사용
        <li key={i}>
          <MenuCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
