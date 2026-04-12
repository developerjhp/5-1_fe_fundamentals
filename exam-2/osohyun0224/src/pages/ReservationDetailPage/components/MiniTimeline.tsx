import { TIME_SLOTS, slotIndex } from '@/shared/utils/time';
import type { Reservation } from '@/types';

interface MiniTimelineProps {
  reservations: Reservation[];
  roomId: string;
  currentId: string;
}

export function MiniTimeline({
  reservations,
  roomId,
  currentId,
}: MiniTimelineProps) {
  const roomReservations = reservations.filter((r) => r.roomId === roomId);

  return (
    <div className="mini-timeline">
      <div className="mini-timeline-header">해당 날짜 타임라인</div>
      <div className="mini-timeline-bar">
        {TIME_SLOTS.map((slot, index) => {
          const reservation = roomReservations.find((reservation) => {
            const startIdx = slotIndex(reservation.startTime);
            const endIdx = slotIndex(reservation.endTime);
            return index >= startIdx && index < endIdx;
          });

          const isCurrent = reservation?.id === currentId;
          let className = 'mini-slot';
          if (reservation) {
            className += isCurrent ? ' mini-slot-current' : ' mini-slot-reserved';
          }

          return (
            <div
              key={slot}
              className={className}
              title={reservation ? `${reservation.title} (${reservation.startTime}~${reservation.endTime})` : slot}
            />
          );
        })}
      </div>
      <div className="mini-timeline-labels">
        <span>09:00</span>
        <span>12:00</span>
        <span>15:00</span>
        <span>18:00</span>
      </div>
    </div>
  );
}
