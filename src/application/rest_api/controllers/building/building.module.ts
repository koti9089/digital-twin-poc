import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { BuildingRepository } from 'src/infrastructure/data_access/gremlin/repositories/building.repository';
import { BuildingController } from './building.controller';

@Module({
  controllers: [BuildingController],
  providers: [GremlinService, BuildingRepository],
})
export class BuildingModule {}
