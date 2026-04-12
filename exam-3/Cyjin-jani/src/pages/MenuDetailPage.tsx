import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useRoute } from 'wouter';

import { MenuDetailContent } from '@/features/menu/components/MenuDetailContent';
import { MenuDetailGnb } from '@/features/menu/components/MenuDetailGnb';
import { MenuDetailSkeleton } from '@/features/menu/components/MenuDetailSkeleton';
import { ErrorFallback } from '@/shared/components/ErrorFallback';

export function MenuDetailPage() {
  const [, params] = useRoute('/menu/:itemId');
  const itemId = params?.itemId;
  const [, setLocation] = useLocation();

  if (!itemId) {
    return (
      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
        메뉴를 찾을 수 없어요.
      </div>
    );
  }

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <MenuDetailGnb onReturnToMenu={() => setLocation('/')} />
          <Suspense fallback={<MenuDetailSkeleton />}>
            <MenuDetailContent itemId={itemId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
