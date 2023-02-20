import { Expose, Type } from 'class-transformer';
export class CityDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
