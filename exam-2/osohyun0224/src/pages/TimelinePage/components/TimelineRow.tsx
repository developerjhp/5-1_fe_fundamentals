import { type KeyboardEvent } from 'react';
import { TIME_SLOTS, slotIndex } from '@/shared/utils/time';
import type { Reservation, Room } from '@/types';

interface TimelineRowProps {
  room: Room;
  reservations: Reservation[];
  onSlotClick: (time: string) => void;
  onReservationClick: (reservation: Reservation) => void;
  onDragStart?: (roomId: string, slotIdx: number) => void;
  onDragEnter?: (roomId: string, slotIdx: number) => void;
  isSlotInDragRange?: (roomId: string, slotIdx: number) => boolean;
}

export function TimelineRow({
  room,
  reservations,
  onSlotClick,
  onReservationClick,
  onDragStart,
  onDragEnter,
  isSlotInDragRange,
}: TimelineRowProps) {
  const cells: React.ReactNode[] = [];
  let skipUntil = -1;

  function handleKeyDown(e: KeyboardEvent, action: () => void) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }

  for (let i = 0; i < TIME_SLOTS.length; i++) {
    if (i < skipUntil) continue;

    const time = TIME_SLOTS[i];
    const reservation = reservations.find((r) => {
      const startIdx = slotIndex(r.startTime);
      const endIdx = slotIndex(r.endTime);
      return i >= startIdx && i < endIdx;
    });

    if (reservation && slotIndex(reservation.startTime) === i) {
      const span = slotIndex(reservation.endTime) - i;
      skipUntil = i + span;
      cells.push(
        <td
          key={time}
          colSpan={span}
          className="timeline-slot-reserved"
          tabIndex={0}
          role="button"
          aria-label={`${reservation.title} (${reservation.startTime}~${reservation.endTime})`}
          onClick={() => onReservationClick(reservation)}
          onKeyDown={(e) =>
            handleKeyDown(e, () => onReservationClick(reservation))
          }
        >
          <div className="reservation-block">{reservation.title}</div>
        </td>,
      );
    } else if (!reservation) {
      const inDragRange = isSlotInDragRange?.(room.id, i) ?? false;
      cells.push(
        <td
          key={time}
          className={`timeline-slot-empty${inDragRange ? ' timeline-slot-dragging' : ''}`}
          tabIndex={0}
          role="button"
          aria-label={`${room.name} ${time} - 빈 시간대, 클릭하여 예약`}
          onClick={() => onSlotClick(time)}
          onKeyDown={(e) => handleKeyDown(e, () => onSlotClick(time))}
          onMouseDown={(e) => {
            e.preventDefault();
            onDragStart?.(room.id, i);
          }}
          onMouseEnter={() => onDragEnter?.(room.id, i)}
        >
          <div className={`empty-block${inDragRange ? ' empty-block-dragging' : ''}`} />
        </td>,
      );
    }
  }

  return (
    <tr>
      <td className="timeline-room-cell">
        <div className="timeline-room-name">{room.name}</div>
        <div className="timeline-room-info">
          {room.floor}F · {room.capacity}명
        </div>
      </td>
      {cells}
    </tr>
  );
}
