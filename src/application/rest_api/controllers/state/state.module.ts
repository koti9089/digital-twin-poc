import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { StateRepository } from 'src/infrastructure/data_access/gremlin/repositories/state.repository';
import { CityMapper } from 'src/infrastructure/data_access/mappers/city.mapper';
import { StateMapper } from 'src/infrastructure/data_access/mappers/state.mapper';
import { StateController } from './state.controller';

@Module({
  controllers: [StateController],
  providers: [StateRepository, GremlinService, StateMapper, CityMapper],
})
export class StateModule {}
