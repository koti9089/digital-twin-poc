import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { CityRepository } from 'src/infrastructure/data_access/gremlin/repositories/city.repository';
import { BuildingMapper } from 'src/infrastructure/data_access/mappers/building.mapper';
import { CityMapper } from 'src/infrastructure/data_access/mappers/city.mapper';
import { FloorMapper } from 'src/infrastructure/data_access/mappers/floor.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { CityController } from './city.controller';

@Module({
  controllers: [CityController],
  providers: [
    GremlinService,
    BuildingMapper,
    CityMapper,
    FloorMapper,
    RoomMapper,
    IotDeviceMapper,
    CityRepository,
    CityMapper,
  ],
})
export class CityModule {}
