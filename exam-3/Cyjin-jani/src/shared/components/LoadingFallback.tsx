export function LoadingFallback() {
  return (
    <div className="flex h-full min-h-40 items-center justify-center">
      <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  );
}
