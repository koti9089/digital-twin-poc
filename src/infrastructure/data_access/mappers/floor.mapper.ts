import { Injectable } from '@nestjs/common';
import { Floor } from 'src/domain/floors/floor/floor';
import { Room } from 'src/domain/rooms/room/room';
import { RoomMapper } from './room.mapper';

@Injectable()
export class FloorMapper {
  constructor(private roomMapper: RoomMapper) {}
  toDomain(floorResponse) {
    const rooms: Room[] | undefined = floorResponse.rooms
      ? this.roomMapper.toDomain(floorResponse.rooms)
      : undefined;
    const floor = floorResponse._items.map((floor) => {
      return Floor.create({
        id: floor.id,
        name: floor.properties.name[0].value,
        rooms,
      });
    });
    return floor;
  }
}
