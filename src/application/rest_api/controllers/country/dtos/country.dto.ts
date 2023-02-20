import { Expose, Type } from 'class-transformer';
import { StateDto } from '../../state/dtos/state.dto';
export class CountryDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => StateDto)
  states?: StateDto[];
}
