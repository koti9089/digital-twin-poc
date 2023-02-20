import { Injectable } from '@nestjs/common';
import { City } from 'src/domain/cities/city/city';

@Injectable()
export class CityMapper {
  toDomain(cityResponse) {
    const city = cityResponse._items.map((state) => {
      return City.create({
        id: state.id,
        name: state.properties.name[0].value,
      });
    });
    return city;
  }
}
