import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { BuildingRepository } from 'src/infrastructure/data_access/gremlin/repositories/building.repository';
import { BuildingMapper } from 'src/infrastructure/data_access/mappers/building.mapper';
import { FloorMapper } from 'src/infrastructure/data_access/mappers/floor.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { BuildingController } from './building.controller';

@Module({
  controllers: [BuildingController],
  providers: [
    GremlinService,
    BuildingRepository,
    BuildingMapper,
    FloorMapper,
    RoomMapper,
    IotDeviceMapper,
  ],
})
export class BuildingModule {}
