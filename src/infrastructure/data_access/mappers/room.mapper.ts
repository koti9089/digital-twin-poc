import { Injectable } from '@nestjs/common';
import { Room } from 'src/domain/rooms/room/room';

@Injectable()
export class RoomMapper {
  toDomain(roomResponse) {
    const room = roomResponse._items.map((room) => {
      return Room.create({
        id: room.id,
        name: room.name,
      });
    });
    return room;
  }
}
