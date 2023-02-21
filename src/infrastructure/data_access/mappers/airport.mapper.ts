import { Injectable } from '@nestjs/common';
import { Airport } from 'src/domain/airpots/airpot/airport';
import { Floor } from 'src/domain/floors/floor/floor';
import { FloorMapper } from './floor.mapper';

@Injectable()
export class AirportMapper {
  constructor(private floorMapper: FloorMapper) {}
  toDomain(airportResponse) {
    const floors: Floor[] | undefined = airportResponse.floors
      ? this.floorMapper.toDomain(airportResponse.floors)
      : undefined;
    const airport = airportResponse._items.map((airport) => {
      return Airport.create({
        id: airport.id,
        name: airport.properties.name[0].value,
        address: airport.properties.address[0].value,
        floors,
      });
    });
    return airport;
  }
}
