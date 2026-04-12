import { queryOptions } from '@tanstack/react-query';
import { getReservationById } from '@/pages/remotes';

export function getReservationByIdQueryOptions(id: string) {
  return queryOptions({
    queryKey: ['reservation', id] as const,
    queryFn: () => getReservationById(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      if ((error as { status?: number }).status === 404) return false;
      return failureCount < 2;
    },
  });
}
