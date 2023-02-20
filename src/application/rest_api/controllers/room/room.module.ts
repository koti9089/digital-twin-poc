import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { RoomRepository } from 'src/infrastructure/data_access/gremlin/repositories/room.repository';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { RoomController } from './room.controller';

@Module({
  controllers: [RoomController],
  providers: [GremlinService, RoomRepository, RoomMapper, IotDeviceMapper],
})
export class RoomModule {}
