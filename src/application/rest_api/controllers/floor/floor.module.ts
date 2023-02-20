import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { FloorRepository } from 'src/infrastructure/data_access/gremlin/repositories/floors.repository';
import { FloorMapper } from 'src/infrastructure/data_access/mappers/floor.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { FloorController } from './floor.controller';

@Module({
  controllers: [FloorController],
  providers: [
    GremlinService,
    FloorRepository,
    FloorMapper,
    RoomMapper,
    IotDeviceMapper,
  ],
})
export class FloorModule {}
