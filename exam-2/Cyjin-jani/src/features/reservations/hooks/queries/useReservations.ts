import { useSuspenseQuery } from '@tanstack/react-query';
import { getReservations } from '@/features/reservations/api/getReservations';
import { reservationsQueryKeys } from '@/features/reservations/hooks/queries/querykeys';
import type { Reservation, ReservationsResponse } from '@/features/reservations/types';

export function useReservations(date: string) {
  return useSuspenseQuery<ReservationsResponse, Error, Reservation[]>({
    queryKey: reservationsQueryKeys.allByDate(date),
    queryFn: () => getReservations(date),
    select: (response) => response.reservations,
  });
}
