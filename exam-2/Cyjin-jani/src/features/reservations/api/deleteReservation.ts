import { api } from '@/lib/ky';

export async function deleteReservation(id: string) {
  return api.delete(`reservations/${id}`).json<{ message: string }>();
}
