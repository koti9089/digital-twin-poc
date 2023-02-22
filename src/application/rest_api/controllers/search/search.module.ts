import { Module } from '@nestjs/common';
import { Terminal } from 'src/domain/terminals/terminal/terminal';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { SearchRepository } from 'src/infrastructure/data_access/gremlin/repositories/search.repository';
import { AirportMapper } from 'src/infrastructure/data_access/mappers/airport.mapper';
import { CityMapper } from 'src/infrastructure/data_access/mappers/city.mapper';
import { CountryMapper } from 'src/infrastructure/data_access/mappers/country.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { StateMapper } from 'src/infrastructure/data_access/mappers/state.mapper';
import { TerminalMapper } from 'src/infrastructure/data_access/mappers/terminal.mapper';
import { SearchController } from './search.controller';

@Module({
  controllers: [SearchController],
  providers: [
    SearchRepository,
    GremlinService,
    IotDeviceMapper,
    CountryMapper,
    StateMapper,
    CityMapper,
    AirportMapper,
    TerminalMapper,
    RoomMapper,
  ],
})
export class SearchModule {}
