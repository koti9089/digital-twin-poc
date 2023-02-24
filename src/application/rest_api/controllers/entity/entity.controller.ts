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

  @Put('/create-relationship/:from_node_id/:to_node_id')
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

  // genericSearch() : inputJson(){ nodeid, relation , expected node name)
}
