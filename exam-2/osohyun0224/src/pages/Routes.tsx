import { Suspense } from 'react';
import { Navigate, Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { PageLayout } from './PageLayout';
import { ROUTES } from './routes.constants';
import { TimelinePage } from './TimelinePage';
import { ReservationNewPage } from './ReservationNewPage';
import { ReservationDetailPage } from './ReservationDetailPage';
import { MyReservationsPage } from './MyReservationsPage';

export function Routes() {
  return (
    <ErrorBoundary message="페이지를 불러오는데 실패했습니다.">
      <Suspense fallback={<LoadingSpinner />}>
        <ReactRouterRoutes>
          <Route element={<PageLayout />}>
            <Route path={ROUTES.HOME} element={<TimelinePage />} />
            <Route path={ROUTES.BOOKING} element={<ReservationNewPage />} />
            <Route path={ROUTES.DETAIL} element={<ReservationDetailPage />} />
            <Route
              path={ROUTES.MY_RESERVATIONS}
              element={<MyReservationsPage />}
            />
            <Route path="*" element={<Navigate replace to={ROUTES.HOME} />} />
          </Route>
        </ReactRouterRoutes>
      </Suspense>
    </ErrorBoundary>
  );
}
