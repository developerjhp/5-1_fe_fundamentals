import type {
  CreateReservationRequest,
  ReservationResponse,
  ReservationsResponse,
  RoomsResponse,
} from '@/types';
import { http } from './http';

export function getRooms(): Promise<RoomsResponse> {
  return http.get<RoomsResponse>('/api/rooms');
}

export function getReservations(date: string): Promise<ReservationsResponse> {
  return http.get<ReservationsResponse>(`/api/reservations?date=${date}`);
}

export function getReservationById(id: string): Promise<ReservationResponse> {
  return http.get<ReservationResponse>(`/api/reservations/${id}`);
}

export function getMyReservations(): Promise<ReservationsResponse> {
  return http.get<ReservationsResponse>('/api/my-reservations');
}

export function createReservation(
  data: CreateReservationRequest,
): Promise<ReservationResponse> {
  return http.post<CreateReservationRequest, ReservationResponse>(
    '/api/reservations',
    data,
  );
}

export function cancelReservation(
  id: string,
): Promise<{ message: string }> {
  return http.delete<{ message: string }>(`/api/reservations/${id}`);
}
