import { Expose, Type } from 'class-transformer';
import { BuildingDto } from './building.dto';
export class AllBuildingDto {
  @Expose()
  @Type(() => BuildingDto)
  _items: BuildingDto[];
}
