import { useSuspenseQuery } from '@tanstack/react-query';

import { getReservation } from '@/features/reservations/api/getReservation';
import { reservationsQueryKeys } from '@/features/reservations/hooks/queries/querykeys';
import type { Reservation, ReservationResponse } from '@/features/reservations/types';

export function useReservation(id: string) {
  return useSuspenseQuery<ReservationResponse, Error, Reservation>({
    queryKey: reservationsQueryKeys.detailById(id),
    queryFn: () => getReservation(id),
    select: (response) => response.reservation,
  });
}
