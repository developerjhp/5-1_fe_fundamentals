import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query';
import type { HTTPError } from 'ky';

import { createReservation } from '@/features/reservations/api/createReservation';
import type { CreateReservationRequest, ReservationResponse } from '@/features/reservations/types';

export function useCreateReservation(
  options?: UseMutationOptions<ReservationResponse, HTTPError, CreateReservationRequest>,
): UseMutationResult<ReservationResponse, HTTPError, CreateReservationRequest> {
  return useMutation<ReservationResponse, HTTPError, CreateReservationRequest>({
    mutationFn: (body) => createReservation(body),
    ...options,
  });
}
