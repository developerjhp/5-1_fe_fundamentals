import type { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-muted-foreground text-sm">
        {error instanceof Error ? error.message : '오류가 발생했어요.'}
      </p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="text-primary text-sm underline underline-offset-4"
      >
        다시 시도하기
      </button>
    </div>
  );
}
