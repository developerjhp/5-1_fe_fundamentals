import type { Reservation } from '@/features/reservations/types';
import type { Room } from '@/features/rooms/types';

export function sortRoomsByFloorAndName(rooms: Room[]): Room[] {
  return [...rooms].sort((a, b) => a.floor - b.floor || a.name.localeCompare(b.name));
}

export function groupReservationsByRoomId(reservations: Reservation[]): Map<string, Reservation[]> {
  const map = new Map<string, Reservation[]>();
  for (const r of reservations) {
    const list = map.get(r.roomId);
    if (list) list.push(r);
    else map.set(r.roomId, [r]);
  }
  return map;
}
