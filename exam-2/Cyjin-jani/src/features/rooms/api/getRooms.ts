import type { RoomsResponse } from '@/features/rooms/types';
import { api } from '@/lib/ky';

export async function getRooms() {
  return api.get('rooms').json<RoomsResponse>();
}
