import { Injectable } from '@nestjs/common';
import { Terminal } from 'src/domain/terminals/terminal/terminal';
import { Room } from 'src/domain/rooms/room/room';
import { RoomMapper } from './room.mapper';

@Injectable()
export class TerminalMapper {
  constructor(private roomMapper: RoomMapper) {}
  toDomain(terminalResponse) {
    const rooms: Room[] | undefined = terminalResponse.rooms
      ? this.roomMapper.toDomain(terminalResponse.rooms)
      : undefined;
    const floor = terminalResponse._items.map((floor) => {
      return Terminal.create({
        id: floor.id,
        name: floor.properties.name[0].value,
        rooms,
      });
    });
    return floor;
  }
}
