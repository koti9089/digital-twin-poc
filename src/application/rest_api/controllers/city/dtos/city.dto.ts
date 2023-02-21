import { Expose, Type } from 'class-transformer';
import { AirportDto } from '../../airport/dtos/airport.dto';
export class CityDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => AirportDto)
  airports?: AirportDto[];
}
