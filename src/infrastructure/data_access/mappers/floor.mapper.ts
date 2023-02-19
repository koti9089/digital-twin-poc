import { Injectable } from '@nestjs/common';
import { Floor } from 'src/domain/floors/floor/floor';

@Injectable()
export class FloorMapper {
  toDomain(floorResponse) {
    const floor = floorResponse._items.map((floor) => {
      return Floor.create({
        id: floor.id,
        name: floor.properties.name[0].value,
      });
    });
    return floor;
  }
}
