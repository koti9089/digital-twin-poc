import { Expose, Type } from 'class-transformer';
import { CityDto } from './city.dto';
export class AllStateDto {
  @Expose()
  @Type(() => CityDto)
  _items: CityDto[];
}
