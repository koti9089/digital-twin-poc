import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { RoomRepository } from 'src/infrastructure/data_access/gremlin/repositories/room.repository';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomController],
  providers: [GremlinService, RoomRepository],
})
export class RoomModule {}
