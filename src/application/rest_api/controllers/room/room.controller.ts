import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomRepository } from 'src/infrastructure/data_access/gremlin/repositories/room.repository';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private roomRepo: RoomRepository) {}
}
