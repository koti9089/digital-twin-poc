import { Expose, Type } from 'class-transformer';
import { CityDto } from '../../city/dtos/city.dto';
export class StateDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => CityDto)
  cities?: CityDto[];
}
