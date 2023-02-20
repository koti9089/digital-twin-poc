import { Expose, Type } from 'class-transformer';
import { CityDto } from './city.dto';
export class AllCityDto {
  @Expose()
  @Type(() => CityDto)
  _items: CityDto[];
}
