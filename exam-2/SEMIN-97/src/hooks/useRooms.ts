import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getRooms,
  getReservations,
  getReservation,
  getMyReservations,
  createReservation,
  deleteReservation,
} from '@/api/reservations'
import type { CreateReservationRequest } from '@/types/reservation'

export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  })
}

export function useReservations(date: string) {
  return useQuery({
    queryKey: ['reservations', date],
    queryFn: () => getReservations(date),
  })
}

export function useReservation(id: string) {
  return useQuery({
    queryKey: ['reservation', id],
    queryFn: () => getReservation(id),
  })
}

export function useMyReservations() {
  return useQuery({
    queryKey: ['my-reservations'],
    queryFn: getMyReservations,
  })
}

export function useCreateReservation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateReservationRequest) => createReservation(body),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['reservations', variables.date] }),
        queryClient.invalidateQueries({ queryKey: ['my-reservations'] }),
      ])
    },
  })
}

export function useDeleteReservation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: string; date: string }) => deleteReservation(id),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['reservations', variables.date] }),
        queryClient.invalidateQueries({ queryKey: ['my-reservations'] }),
      ])
    },
  })
}
