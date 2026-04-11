import { api } from '@/lib/ky';
import type { CreateReservationRequest, ReservationResponse } from '@/features/reservations/types';

export async function createReservation(body: CreateReservationRequest) {
  return api.post('reservations', { json: body }).json<ReservationResponse>();
}
