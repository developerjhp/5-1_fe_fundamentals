import { queryOptions } from '@tanstack/react-query';
import { getMyReservations } from '@/pages/remotes';

export function getMyReservationsQueryOptions() {
  return queryOptions({
    queryKey: ['my-reservations'] as const,
    queryFn: getMyReservations,
  });
}
