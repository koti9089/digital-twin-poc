import { Room } from 'src/domain/rooms/room/room';

export interface ITerminalProps {
  id?: string;
  name: string;
  rooms?: Room[];
}
