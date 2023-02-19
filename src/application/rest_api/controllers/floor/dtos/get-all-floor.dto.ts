import { Expose, Type } from 'class-transformer';
import { FloorDto } from './floor.dto';
export class AllFloorDto {
  @Expose()
  @Type(() => FloorDto)
  _items: FloorDto[];
}
