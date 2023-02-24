import { Expose, Type } from 'class-transformer';
export class EntityDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;
}
