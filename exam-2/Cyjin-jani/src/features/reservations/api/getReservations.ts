import { api } from '@/lib/ky';
import type { ReservationsResponse } from '@/features/reservations/types';

// date format: YYYY-MM-DD
export async function getReservations(date: string) {
  return api
    .get('reservations', {
      searchParams: {
        date,
      },
    })
    .json<ReservationsResponse>();
}
