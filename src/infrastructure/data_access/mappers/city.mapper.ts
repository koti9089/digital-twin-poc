import { Injectable } from '@nestjs/common';
import { Building } from 'src/domain/buildings/building/building';
import { City } from 'src/domain/cities/city/city';
import { BuildingMapper } from './building.mapper';

@Injectable()
export class CityMapper {
  constructor(private buildingMapper: BuildingMapper) {}
  toDomain(cityResponse) {
    const buildings: Building[] | undefined = cityResponse.buildings
      ? this.buildingMapper.toDomain(cityResponse.buildings)
      : undefined;
    const city = cityResponse._items.map((state) => {
      return City.create({
        id: state.id,
        name: state.properties.name[0].value,
        buildings,
      });
    });
    return city;
  }
}
