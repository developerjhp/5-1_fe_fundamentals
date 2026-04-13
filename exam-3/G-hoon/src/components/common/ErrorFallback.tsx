interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorFallback({
  message = '문제가 발생했습니다.',
  onRetry,
}: ErrorFallbackProps) {
  return (
    <section
      className="flex flex-col items-center justify-center gap-4 py-16"
      role="alert"
      aria-live="assertive"
    >
      <p className="text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-700 active:bg-amber-800"
        >
          다시 시도
        </button>
      )}
    </section>
  );
}
