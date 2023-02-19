import { Expose } from 'class-transformer';
export class FloorDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
