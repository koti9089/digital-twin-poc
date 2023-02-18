import { Injectable } from '@nestjs/common';
import { Building } from 'src/domain/buildings/building/building';

@Injectable()
export class BuildingMapper {
  toDomain(buildingResponse) {
    const building = buildingResponse._items.map((building) => {
      return Building.create({
        id: building.id,
        name: building.properties.name[0].value,
        address: building.properties.address[0].value,
      });
    });
    return building;
  }
}
