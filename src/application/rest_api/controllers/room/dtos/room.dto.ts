import { Expose, Type } from 'class-transformer';
export class RoomDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
