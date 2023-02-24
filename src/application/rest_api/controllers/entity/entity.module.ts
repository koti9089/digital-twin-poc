import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { EntityController } from './entity.controller';
import { EntityRepository } from 'src/infrastructure/data_access/gremlin/repositories/entity.repository';
import { DomainEntityMapper } from 'src/infrastructure/data_access/mappers/domainentity.mapper';

@Module({
  controllers: [EntityController],
  providers: [GremlinService, EntityRepository, DomainEntityMapper],
})
export class EntityModule {}
