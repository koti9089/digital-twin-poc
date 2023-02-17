import { Room } from 'src/domain/rooms/room/room';

export interface IFloorProps {
  id?: string;
  name: string;
  rooms?: Room[];
}
