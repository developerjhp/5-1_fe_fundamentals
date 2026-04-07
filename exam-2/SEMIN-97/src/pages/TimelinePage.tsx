import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { getTodayString } from '@/utils/time.ts'
import { useReservations, useRooms } from '@/hooks/useRooms.ts'
import Layout from '@/components/layout/Layout.tsx'
import ErrorFallback from '@/components/common/ErrorFallback.tsx'
import LoadingFallback from '@/components/common/LoadingFallback.tsx'
import TimelineGrid from '@/components/timeline/TimelineGrid.tsx'
import {QueryErrorResetBoundary} from "@tanstack/react-query";

function TimelineContent({ date }: { date: string }) {
  const { data: roomsData } = useRooms()
  const { data: reservationsData } = useReservations(date)

  return (
    <div className="overflow-x-auto">
      <TimelineGrid
        rooms={roomsData.rooms}
        reservations={reservationsData.reservations}
        date={date}
      />
    </div>
  )
}

function TimelinePage() {
  const [date, setDate] = useState(getTodayString)

  return (
    <Layout title="타임라인 페이지">
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm mb-6"
      />

      <QueryErrorResetBoundary>
        {({reset}) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
            <Suspense fallback={<LoadingFallback/>}>
              <TimelineContent date={date}/>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Layout>
  );
}

export default TimelinePage
