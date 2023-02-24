import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityRepository } from 'src/infrastructure/data_access/gremlin/repositories/entity.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { EntityDto } from './dto/entity.dto';
import { DomainEntity } from 'src/domain/entities/domainEntity';
import { CreateEntityDto } from './dto/create-entity.dto';
import { DataDto } from './../graph/dtos/create-graph.dto';

@ApiTags('Entity')
@Controller('entity')
export class EntityController {
  constructor(private entityRepo: EntityRepository) {}

  @Serialize(EntityDto)
  @Post()
  async createCountry(@Body() body: CreateEntityDto) {
    const entity = DomainEntity.create(body);
    const result = await this.entityRepo.createEntity(entity);
    return result;
  }

  @Serialize(EntityDto)
  @Get('/:id/:type')
  async getEntity(@Param('id') id: string, @Param('type') type: string) {
    return this.entityRepo.getEntity(id, type);
  }

  @Serialize(DataDto)
  @Post('CreateEntitiesWithRelationships')
  async createEntitiesWithRelationships(@Body() body: DataDto) {
    return this.entityRepo.createEntitiesWithRelationships(body);
  }

  // clashes with /:id/:type prefic relation is important
  @Get('relation/:relationDirection/:id')
  async getEntityRelationShips(
    @Param('relationDirection') relationDirection: string,
    @Param('id') id: string,
  ) {
    if (relationDirection == 'in') {
      return this.entityRepo.getEntityInWordRelationShips(id);
    } else if (relationDirection == 'out') {
      return this.entityRepo.getEntityOutWordRelationShips(id);
    }
  }

  @Delete('/:id')
  async deleteEntity(@Param('id') id: string) {
    return this.entityRepo.deleteEntity(id);
  }
}
