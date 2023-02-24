import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { DomainEntity } from 'src/domain/entities/domainEntity';
import { json } from 'stream/consumers';
  import { DomainEntityMapper } from '../../mappers/domainentity.mapper';
  import { GremlinService } from '../gremlin.service';

  @Injectable()
export class EntityRepository {
  constructor(
    private gremlinService: GremlinService,
    private domainEntityMapper: DomainEntityMapper,
  ) {}

  async createEntity(entity: DomainEntity) {
    
    const found = await this.gremlinService.execute(
      "g.V().has('name',"+`'${entity.name}')`,{}     
    );
    if (found._items.length > 0) {
      throw new ConflictException(`'${entity.type}'already exists`);
    }
    const entityCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('pk', 'pk')",
      {
        label: `${entity.type}`,
        id: `${entity.name}-${entity.id}`,
        name: entity.name        
      },
    );
    return this.domainEntityMapper.toDomain(entityCreated);
  }

  async getEntity(id: string ,type:string) {
    const entity = await this.gremlinService.execute(
      "g.V('id', id).hasLabel("+`'${type}')`,
      {
        id,
      }
    );
    if (!entity._items.length) {
      throw new NotFoundException('id not found');
    }
    return this.domainEntityMapper.toDomain(entity);
  }

  
  async createEntitiesWithRelationships(query: string) {
    try{
    await this.gremlinService.execute(query,{});
    return 'Graph Created Successfully';    
    }
    catch (error) {
      console.error(error);
      return error;     
    }    
  }

    

  async getEntityInWordRelationShips(id: string) {
    const vers = await this.gremlinService.execute(
      "g.V("+`'${id}').inE().project('edge_id', 'edge_label', 'from_id', 'to_id').by(id).by(label).by(inV().id()).by(outV().id())`,
      {        
      }
    );
    if (!vers._items.length) {
      throw new NotFoundException('id not found');
    }
    return JSON.stringify(vers);
  }

  async getEntityOutWordRelationShips(id: string) {
    const vers = await this.gremlinService.execute(
      "g.V("+`'${id}').outE().project('edge_id', 'edge_label', 'from_id', 'to_id').by(id).by(label).by(inV().id()).by(outV().id())`,
      {        
      }
    );
    if (!vers._items.length) {
      throw new NotFoundException('id not found');
    }
    return JSON.stringify(vers);
  }

  async deleteEntity(id: string) {    
    await this.gremlinService.execute(
      "g.V().has('id',"+`${id}).drop()`, { }
    );
    return 'Deleted';
  }



}