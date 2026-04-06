import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';
import type { HTTPError } from 'ky';

import { deleteReservation } from '@/features/reservations/api/deleteReservation';

export function useDeleteReservation(
  options?: UseMutationOptions<{ message: string }, HTTPError, string>,
): UseMutationResult<{ message: string }, HTTPError, string> {
  return useMutation<{ message: string }, HTTPError, string>({
    mutationFn: (id) => deleteReservation(id),
    ...options,
  });
}
