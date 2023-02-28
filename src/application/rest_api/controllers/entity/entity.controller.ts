import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityRepository } from 'src/infrastructure/data_access/gremlin/repositories/entity.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { EntityDto } from './dto/entity.dto';
import { DomainEntity } from 'src/domain/entities/domainEntity';
import { CreateEntityDto } from './dto/create-entity.dto';
import { DataDto } from './../graph/dtos/create-graph.dto';
import { CreateEntityRelationshipDto } from './dto/create-entity-relationship.dto';
import { SearchRepository } from 'src/infrastructure/data_access/gremlin/repositories/search.repository';
import { SearchQueryDto } from '../search/dtos/serach-query.dto';

@ApiTags('Entity')
@Controller()
export class EntityController {
  constructor(
    private entityRepo: EntityRepository,
    private readonly serachRepo: SearchRepository,
  ) {}

  @Serialize(EntityDto)
  @Post('createEntity')
  async createCountry(@Body() body: CreateEntityDto) {
    const entity = DomainEntity.create(body);
    const result = await this.entityRepo.createEntity(entity);
    return result;
  }

  @Serialize(EntityDto)
  @Get('getEntityByIdAndType/:id/:type')
  async getEntity(@Param('id') id: string, @Param('type') type: string) {
    return this.entityRepo.getEntity(id, type);
  }

  @Serialize(DataDto)
  @Post('CreateEntitiesWithRelationships')
  async createEntitiesWithRelationships(@Body() body: DataDto) {
    return this.entityRepo.createEntitiesWithRelationships(body);
  }

  // clashes with /:id/:type prefic relation is important
  @Get('getEntityRelation/:relationDirection/:id')
  async getEntityRelationShips(
    @Param('relationDirection') relationDirection: string,
    @Param('id') id: string,
  ) {
    switch (relationDirection) {
      case 'in':
        return this.entityRepo.getEntityInWardRelationShips(id);
      case 'out':
        return this.entityRepo.getEntityOutWardRelationShips(id);
      case 'both':
        return this.entityRepo.getEntityInOutWardRelationShips(id);
      default:
        throw new Error(`Invalid relation direction: ${relationDirection}`);
    }
  }

  @Put('updateById/:id')
  async updateEntity(@Param('id') id: string, @Body() body: CreateEntityDto) {
    return this.entityRepo.updateEntity(id, body);
  }

  @Delete('deleteById/:id')
  async deleteEntity(@Param('id') id: string) {
    return this.entityRepo.deleteEntity(id);
  }

  @Put('/createRelationship/:from_node_id/:to_node_id')
  async createRelationShip(@Body() body: CreateEntityRelationshipDto) {
    await this.entityRepo.createRelationship(
      body.from_node_id,
      body.to_node_id,
      body.label,
    );
    return 'relationship created';
  }
  // relation getEntityRelationShips() : id
  // deleteRelationShip() : id
  @Delete('relation/:of')
  async deleteRelationship(@Param('of') of: string) {
    return this.entityRepo.deleteRelationship(of);
  }

  @Post('search')
  async searchHierarchy(@Body() body: SearchQueryDto) {
    return this.serachRepo.searchHierarchy(body);
  }

  // genericSearch() : inputJson(){ nodeid, relation , expected node name)
}
