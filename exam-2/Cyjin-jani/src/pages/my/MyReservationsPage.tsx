import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { MyReservationList } from '@/features/my/components/MyReservationList';
import { QueryErrorFallback } from '@/shared/components/QueryErrorFallback';
import { MyReservationListSkeleton } from '@/features/my/components/MyReservationListSkeleton';

export function MyReservationsPage() {
  return (
    <main className="flex flex-col items-center w-full min-h-dvh max-w-[800px] mx-auto px-6 py-6">
      <h1 className="mb-6 text-2xl font-bold">내 예약 목록</h1>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={QueryErrorFallback}>
            <Suspense fallback={<MyReservationListSkeleton />}>
              <MyReservationList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}
