import { Expose } from 'class-transformer';
export class BuildingDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: string;
}
