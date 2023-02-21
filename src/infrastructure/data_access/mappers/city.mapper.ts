import { Injectable } from '@nestjs/common';
import { Airport } from 'src/domain/airpots/airpot/airport';
import { City } from 'src/domain/cities/city/city';
import { AirportMapper } from './airport.mapper';

@Injectable()
export class CityMapper {
  constructor(private airportMapper: AirportMapper) {}
  toDomain(cityResponse) {
    const airports: Airport[] | undefined = cityResponse.airports
      ? this.airportMapper.toDomain(cityResponse.airports)
      : undefined;
    const city = cityResponse._items.map((state) => {
      return City.create({
        id: state.id,
        name: state.properties.name[0].value,
        airports,
      });
    });
    return city;
  }
}
