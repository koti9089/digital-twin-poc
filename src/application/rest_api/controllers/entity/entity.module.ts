import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { EntityController } from './entity.controller';
import { EntityRepository } from 'src/infrastructure/data_access/gremlin/repositories/entity.repository';
import { DomainEntityMapper } from 'src/infrastructure/data_access/mappers/domainentity.mapper';
import { SearchRepository } from 'src/infrastructure/data_access/gremlin/repositories/search.repository';
import { StateMapper } from 'src/infrastructure/data_access/mappers/state.mapper';
import { CityMapper } from 'src/infrastructure/data_access/mappers/city.mapper';
import { AirportMapper } from 'src/infrastructure/data_access/mappers/airport.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { TerminalMapper } from 'src/infrastructure/data_access/mappers/terminal.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { CountryMapper } from 'src/infrastructure/data_access/mappers/country.mapper';

@Module({
  controllers: [EntityController],
  providers: [
    GremlinService,
    EntityRepository,
    DomainEntityMapper,
    SearchRepository,
    CountryMapper,
    StateMapper,
    CityMapper,
    AirportMapper,
    TerminalMapper,
    RoomMapper,
    IotDeviceMapper,
  ],
})
export class EntityModule {}
