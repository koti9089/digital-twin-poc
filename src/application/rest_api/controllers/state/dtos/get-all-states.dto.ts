import { Expose, Type } from 'class-transformer';
import { StateDto } from './state.dto';
export class AllStateDto {
  @Expose()
  @Type(() => StateDto)
  _items: StateDto[];
}
