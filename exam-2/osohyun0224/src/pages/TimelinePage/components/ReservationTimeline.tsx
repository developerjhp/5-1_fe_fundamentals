import { useMemo } from 'react';
import { TIME_SLOTS } from '@/shared/utils/time';
import type { Reservation, Room } from '@/types';
import { buildReservationMap } from '../utils/timeline';
import { TimelineRow } from './TimelineRow';

interface ReservationTimelineProps {
  rooms: Room[];
  reservations: Reservation[];
  onSlotClick: (room: Room, time: string) => void;
  onReservationClick: (reservation: Reservation) => void;
  onDragStart?: (roomId: string, slotIdx: number) => void;
  onDragEnter?: (roomId: string, slotIdx: number) => void;
  onDragEnd?: () => void;
  isSlotInDragRange?: (roomId: string, slotIdx: number) => boolean;
}

export function ReservationTimeline({
  rooms,
  reservations,
  onSlotClick,
  onReservationClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isSlotInDragRange,
}: ReservationTimelineProps) {
  const reservationMap = useMemo(
    () => buildReservationMap(reservations),
    [reservations],
  );

  if (rooms.length === 0) {
    return (
      <div className="empty-state">조건에 맞는 회의실이 없습니다.</div>
    );
  }

  return (
    <div className="timeline-wrapper" onMouseUp={onDragEnd}>
      <table className="timeline-table">
        <thead>
          <tr>
            <th className="timeline-room-header">회의실</th>
            {TIME_SLOTS.map((slot) => (
              <th key={slot} className="timeline-time-header">
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <TimelineRow
              key={room.id}
              room={room}
              reservations={reservationMap[room.id] ?? []}
              onSlotClick={(time) => onSlotClick(room, time)}
              onReservationClick={onReservationClick}
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              isSlotInDragRange={isSlotInDragRange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
