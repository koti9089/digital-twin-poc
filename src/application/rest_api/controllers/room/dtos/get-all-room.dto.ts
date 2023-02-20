import { Expose, Type } from 'class-transformer';
import { RoomDto } from './room.dto';
export class AllRoomDto {
  @Expose()
  @Type(() => RoomDto)
  _items: RoomDto[];
}
