import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { StateRepository } from 'src/infrastructure/data_access/gremlin/repositories/state.repository';
import { AirportMapper } from 'src/infrastructure/data_access/mappers/airport.mapper';
import { CityMapper } from 'src/infrastructure/data_access/mappers/city.mapper';
import { TerminalMapper } from 'src/infrastructure/data_access/mappers/terminal.mapper';
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
    AirportMapper,
    TerminalMapper,
    RoomMapper,
    IotDeviceMapper,
  ],
})
export class StateModule {}
