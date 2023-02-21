import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { CountryRepository } from 'src/infrastructure/data_access/gremlin/repositories/country.repository';
import { AirportMapper } from 'src/infrastructure/data_access/mappers/airport.mapper';
import { CityMapper } from 'src/infrastructure/data_access/mappers/city.mapper';
import { CountryMapper } from 'src/infrastructure/data_access/mappers/country.mapper';
import { TerminalMapper } from 'src/infrastructure/data_access/mappers/terminal.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { StateMapper } from 'src/infrastructure/data_access/mappers/state.mapper';
import { CountryController } from './country.controller';

@Module({
  controllers: [CountryController],
  providers: [
    GremlinService,
    CountryRepository,
    CountryMapper,
    TerminalMapper,
    RoomMapper,
    IotDeviceMapper,
    StateMapper,
    CityMapper,
    AirportMapper,
  ],
})
export class CountryModule {}
