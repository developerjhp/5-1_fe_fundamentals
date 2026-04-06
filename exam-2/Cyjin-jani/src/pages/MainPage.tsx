import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { TimelineTable } from '@/features/reservations/components/TimelineTable';
import { formatLocalDate } from '@/lib/dateFormat';

export function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDate = searchParams.get('date') ?? formatLocalDate(new Date());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ date: e.target.value });
  };

  return (
    <main className="w-full h-dvh overflow-hidden mx-auto max-w-full px-6 py-6">
      <h1>회의실 예약 현황</h1>
      <label htmlFor="timeline-date">
        날짜 선택:{' '}
        <input id="timeline-date" type="date" value={selectedDate} onChange={handleDateChange} />
      </label>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            resetKeys={[selectedDate]}
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                <p>데이터를 불러오지 못했습니다.</p>
                <button type="button" onClick={() => resetErrorBoundary()}>
                  다시 시도
                </button>
              </div>
            )}
          >
            <Suspense key={selectedDate} fallback={<p>로딩 중…</p>}>
              <TimelineTable date={selectedDate} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </main>
  );
}
