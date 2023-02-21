import { Expose, Type } from 'class-transformer';
import { AirportDto } from './airport.dto';
export class AllAirportDto {
  @Expose()
  @Type(() => AirportDto)
  _items: AirportDto[];
}
