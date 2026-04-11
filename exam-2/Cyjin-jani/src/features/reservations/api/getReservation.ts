import { api } from '@/lib/ky';
import type { ReservationResponse } from '@/features/reservations/types';

export async function getReservation(id: string) {
  return api.get(`reservations/${id}`).json<ReservationResponse>();
}
