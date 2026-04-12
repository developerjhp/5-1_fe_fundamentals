import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReservation } from '@/pages/remotes';
import type { CreateReservationRequest } from '@/types';

export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationRequest) => createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
    },
  });
}
