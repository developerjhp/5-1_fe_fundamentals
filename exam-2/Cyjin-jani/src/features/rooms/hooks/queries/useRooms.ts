import { useSuspenseQuery } from '@tanstack/react-query';

import { getRooms } from '@/features/rooms/api/getRooms';
import { roomsQueryKeys } from '@/features/rooms/hooks/queries/querykeys';
import type { Room, RoomsResponse } from '@/features/rooms/types';

export function useRooms() {
  return useSuspenseQuery<RoomsResponse, Error, Room[]>({
    queryKey: roomsQueryKeys.all,
    queryFn: getRooms,
    select: (response) => response.rooms,
    staleTime: Infinity,
  });
}
