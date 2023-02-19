import { Injectable } from '@nestjs/common';
import { Building } from 'src/domain/buildings/building/building';
import { Floor } from 'src/domain/floors/floor/floor';
import { FloorMapper } from './floor.mapper';

@Injectable()
export class BuildingMapper {
  constructor(private floorMapper: FloorMapper) {}
  toDomain(buildingResponse) {
    const floors: Floor[] | undefined = buildingResponse.floors
      ? this.floorMapper.toDomain(buildingResponse.floors)
      : undefined;
    const building = buildingResponse._items.map((building) => {
      return Building.create({
        id: building.id,
        name: building.properties.name[0].value,
        address: building.properties.address[0].value,
        floors,
      });
    });
    return building;
  }
}
