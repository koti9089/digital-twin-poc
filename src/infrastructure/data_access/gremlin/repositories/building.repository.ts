import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Building } from 'src/domain/buildings/building/building';
import { BuildingMapper } from '../../mappers/building.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class BuildingRepository {
  constructor(
    private gremlinService: GremlinService,
    private buildingMapper: BuildingMapper,
  ) {}

  async createBuilding(building: Building, cityId: string) {
    const cityFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('City')",
      {
        id: cityId,
      },
    );
    if (!cityFound._items.length) {
      throw new ConflictException("City doesn't exists");
    }

    const found = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Building')",
      {
        id: building.name,
      },
    );
    if (found._items.length > 0) {
      throw new ConflictException('Building already exists');
    }
    const buildingCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('address', address).property('buildingId', buildingId).property('pk', 'pk')",
      {
        label: 'Building',
        id: `${building.name}`,
        name: building.name,
        address: building.address,
        buildingId: building.id,
      },
    );

    await this.gremlinService.execute(
      "g.V(cityId).hasLabel('City').addE(relationship).to(g.V(buildingId).hasLabel('Building'))",
      {
        cityId: cityId,
        buildingId: building.name,
        relationship: 'has',
      },
    );

    return this.buildingMapper.toDomain(buildingCreated)[0];
  }

  async getBuilding(id: string) {
    const building = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Building')",
      {
        id,
      },
    );
    if (!building._items.length) {
      throw new NotFoundException('id not found');
    }
    const floors = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Building').out()",
      {
        id,
      },
    );
    building.floors = floors;
    return this.buildingMapper.toDomain(building)[0];
  }

  async getAllBuildings() {
    const buildings = await this.gremlinService.execute(
      "g.V().hasLabel('Building')",
    );
    const result = { _items: this.buildingMapper.toDomain(buildings) };
    return result;
  }

  async deleteBuilding(id: string) {
    await this.getBuilding(id);
    await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Building').drop()",
      {
        id,
      },
    );
    return 'Deleted';
  }
}
