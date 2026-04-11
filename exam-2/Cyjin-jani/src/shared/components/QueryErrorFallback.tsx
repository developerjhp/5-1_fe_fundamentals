import type { FallbackProps } from 'react-error-boundary';

import { Button } from '@/shared/components/ui/button';

export function QueryErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-lg font-medium">데이터를 불러오지 못했습니다.</p>
      <Button variant="outline" onClick={resetErrorBoundary}>
        다시 시도
      </Button>
    </div>
  );
}
