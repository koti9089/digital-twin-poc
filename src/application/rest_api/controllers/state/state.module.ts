import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { StateRepository } from 'src/infrastructure/data_access/gremlin/repositories/state.repository';
import { BuildingMapper } from 'src/infrastructure/data_access/mappers/building.mapper';
import { CityMapper } from 'src/infrastructure/data_access/mappers/city.mapper';
import { FloorMapper } from 'src/infrastructure/data_access/mappers/floor.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { StateMapper } from 'src/infrastructure/data_access/mappers/state.mapper';
import { StateController } from './state.controller';

@Module({
  controllers: [StateController],
  providers: [
    StateRepository,
    GremlinService,
    StateMapper,
    CityMapper,
    BuildingMapper,
    FloorMapper,
    RoomMapper,
    IotDeviceMapper,
  ],
})
export class StateModule {}
