import { Expose, Type } from 'class-transformer';
export class StateDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
