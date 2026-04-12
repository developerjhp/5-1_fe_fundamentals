import type { Reservation } from '@/types';

export function buildReservationMap(
  reservations: Reservation[],
): Record<string, Reservation[]> {
  const map: Record<string, Reservation[]> = {};
  for (const reservation of reservations) {
    if (!map[reservation.roomId]) map[reservation.roomId] = [];
    map[reservation.roomId].push(reservation);
  }
  return map;
}
