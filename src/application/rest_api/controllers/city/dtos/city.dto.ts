import { Expose, Type } from 'class-transformer';
import { BuildingDto } from '../../building/dtos/building.dto';
export class CityDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => BuildingDto)
  buildings?: BuildingDto[];
}
