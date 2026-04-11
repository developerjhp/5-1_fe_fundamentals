import { api } from '@/lib/ky';
import type { ReservationsResponse } from '@/features/reservations/types';

export async function getMyReservations() {
  return api.get('my-reservations').json<ReservationsResponse>();
}
