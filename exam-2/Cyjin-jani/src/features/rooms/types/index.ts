export type Equipment =
  | 'monitor'
  | 'whiteboard'
  | 'video_conference'
  | 'projector';

export interface Room {
  id: string;
  name: string;
  floor: number;
  capacity: number;
  equipment: Equipment[];
}

export interface RoomsResponse {
  rooms: Room[];
}
