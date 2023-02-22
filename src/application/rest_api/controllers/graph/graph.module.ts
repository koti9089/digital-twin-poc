import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { GraphController } from './graph.controller';

@Module({
  controllers: [GraphController],
  providers: [GremlinService],
})
export class GraphModule {}
