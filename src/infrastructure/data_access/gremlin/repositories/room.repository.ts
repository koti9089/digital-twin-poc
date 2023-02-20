import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Room } from 'src/domain/rooms/room/room';
import { RoomMapper } from '../../mappers/room.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class RoomRepository {
  constructor(
    private gremlinService: GremlinService,
    private roomMapper: RoomMapper,
  ) {}

  async createRoom(room: Room, floorId: string) {
    const floorFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Floor')",
      {
        id: floorId,
      },
    );
    if (!floorFound._items.length) {
      throw new ConflictException("Floor doesn't exists");
    }

    const roomFound = await this.gremlinService.execute(
      // "g.V('id', id).hasLabel('Room')",
      "g.V().has('Floor', 'id', id).out('has').has('name', name)",
      {
        id: floorId,
        name: room.name,
      },
    );
    if (roomFound._items.length > 0) {
      throw new ConflictException('Room already exists');
    }

    const roomId = `${room.name}-${room.id}`;
    const roomCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('roomId', roomId).property('pk', 'pk')",
      {
        label: 'Room',
        id: roomId,
        name: room.name,
        roomId: room.id,
      },
    );

    // make relations of floor with building

    await this.gremlinService.execute(
      "g.V(floorId).hasLabel('Floor').addE(relationship).to(g.V(roomId).hasLabel('Room'))",
      {
        floorId: floorId,
        roomId: roomId,
        relationship: 'has',
      },
    );
    return this.roomMapper.toDomain(roomCreated)[0];
  }

  async getRoom(id: string) {
    const room = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Room')",
      {
        id,
      },
    );
    if (!room._items.length) {
      throw new NotFoundException('id not found');
    }
    const iot_devices = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Room').out()",
      {
        id,
      },
    );
    room.iot_devices = iot_devices;
    return this.roomMapper.toDomain(room)[0];
  }

  async getAllRooms() {
    const rooms = await this.gremlinService.execute("g.V().hasLabel('Room')");
    const result = { _items: this.roomMapper.toDomain(rooms) };
    return result;
  }

  async deleteRoom(id: string) {
    await this.getRoom(id);
    await this.gremlinService.execute("g.V('id', id).hasLabel('Room').drop()", {
      id,
    });
    return 'Deleted';
  }
}
