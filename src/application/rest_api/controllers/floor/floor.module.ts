import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { FloorRepository } from 'src/infrastructure/data_access/gremlin/repositories/floors.repository';
import { FloorController } from './floor.controller';

@Module({
  controllers: [FloorController],
  providers: [GremlinService, FloorRepository],
})
export class FloorModule {}
