import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { BuildingController } from './building.controller';

@Module({
  controllers: [BuildingController],
  providers: [GremlinService],
})
export class BuildingModule {}
