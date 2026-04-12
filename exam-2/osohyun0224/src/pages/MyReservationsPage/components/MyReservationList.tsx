import { useMemo, type ReactNode } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getRoomsQueryOptions, getMyReservationsQueryOptions } from '@/shared/queries';
import { EmptyState } from '@/shared/components/EmptyState';
import type { Reservation } from '@/types';

interface MyReservationListProps {
  renderRight: (reservation: Reservation) => ReactNode;
  onItemClick: (id: string) => void;
}

function groupByDate(
  reservations: Reservation[],
): Record<string, Reservation[]> {
  const groups: Record<string, Reservation[]> = {};
  const sorted = [...reservations].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
  );
  for (const reservation of sorted) {
    if (!groups[reservation.date]) groups[reservation.date] = [];
    groups[reservation.date].push(reservation);
  }
  return groups;
}

function formatDateLabel(dateStr: string): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(dateStr);
  const dayName = days[date.getDay()];
  return `${dateStr} (${dayName})`;
}

export function MyReservationList({
  renderRight,
  onItemClick,
}: MyReservationListProps) {
  const [{ data: roomsData }, { data: reservationsData }] = useQueries({
    queries: [getRoomsQueryOptions(), getMyReservationsQueryOptions()],
  });

  const rooms = roomsData?.rooms ?? [];
  const reservations = reservationsData?.reservations ?? [];
  const grouped = useMemo(() => groupByDate(reservations), [reservations]);
  const dateKeys = Object.keys(grouped);

  function getRoomName(roomId: string): string {
    return rooms.find((room) => room.id === roomId)?.name ?? roomId;
  }

  if (reservations.length === 0) {
    return <EmptyState message="예약이 없습니다." />;
  }

  return (
    <div className="reservation-list">
      {dateKeys.map((date) => (
        <div key={date}>
          <div className="date-group-header">{formatDateLabel(date)}</div>
          {grouped[date].map((reservation) => (
            <div
              key={reservation.id}
              className="reservation-card"
              onClick={() => onItemClick(reservation.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onItemClick(reservation.id);
              }}
            >
              <div className="reservation-card-content">
                <div>
                  <div className="reservation-card-title">
                    {reservation.title}
                  </div>
                  <div className="reservation-card-info">
                    <span>{getRoomName(reservation.roomId)}</span>
                    <span>
                      {reservation.startTime} ~ {reservation.endTime}
                    </span>
                  </div>
                  <div className="reservation-card-meta">
                    {reservation.organizer} · {reservation.attendees}명
                  </div>
                </div>
                <div
                  className="reservation-card-right"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  {renderRight(reservation)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
