import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Floor } from 'src/domain/floors/floor/floor';
import { FloorMapper } from '../../mappers/floor.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class FloorRepository {
  constructor(
    private gremlinService: GremlinService,
    private floorMapper: FloorMapper,
  ) {}

  async createFloor(floor: Floor, buildingId: string) {
    const buildingFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Building')",
      {
        id: buildingId,
      },
    );
    if (!buildingFound._items.length) {
      throw new ConflictException("Building doesn't exists");
    }

    const floorFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Floor')",
      {
        id: floor.name,
      },
    );
    if (floorFound._items.length > 0) {
      throw new ConflictException('Floor already exists');
    }

    const floorCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('floorId', floorId).property('pk', 'pk')",
      {
        label: 'Floor',
        id: `${floor.name}`,
        name: floor.name,
        floorId: floor.id,
      },
    );

    // make relations of floor with building

    await this.gremlinService.execute(
      "g.V(buildingId).hasLabel('Building').addE(relationship).to(g.V(floorId))",
      {
        buildingId: buildingId,
        floorId: floor.name,
        relationship: 'has',
      },
    );
    return this.floorMapper.toDomain(floorCreated)[0];
  }

  async getFloor(id: string) {
    const floor = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Floor')",
      {
        id,
      },
    );
    if (!floor._items.length) {
      throw new NotFoundException('id not found');
    }
    const rooms = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Floor').out()",
      {
        id,
      },
    );
    floor.rooms = rooms;
    return this.floorMapper.toDomain(floor)[0];
  }

  async getAllFloors() {
    const floors = await this.gremlinService.execute("g.V().hasLabel('Floor')");
    const result = { _items: this.floorMapper.toDomain(floors) };
    return result;
  }

  async deleteFloor(id: string) {
    await this.getFloor(id);
    await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Floor').drop()",
      {
        id,
      },
    );
    return 'Deleted';
  }
}
