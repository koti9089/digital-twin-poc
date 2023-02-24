import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataDto } from 'src/application/rest_api/controllers/graph/dtos/create-graph.dto';
import { DomainEntity } from 'src/domain/entities/domainEntity';
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
      "g.V().has('name'," + `'${entity.name}')`,
      {},
    );
    if (found._items.length > 0) {
      throw new ConflictException(`'${entity.type}'already exists`);
    }
    const entityCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('pk', 'pk')",
      {
        label: `${entity.type}`,
        id: `${entity.name}-${entity.id}`,
        name: entity.name,
      },
    );
    return this.domainEntityMapper.toDomain(entityCreated);
  }

  async getEntity(id: string, type: string) {
    const entity = await this.gremlinService.execute(
      "g.V('id', id).hasLabel(" + `'${type}')`,
      {
        id,
      },
    );
    if (!entity._items.length) {
      throw new NotFoundException('id not found');
    }
    return this.domainEntityMapper.toDomain(entity);
  }

  async createEntitiesWithRelationships(body: DataDto) {
    try {
      let query = 'g';
      const verticesMap = new Map();
      let id: string;
      for (const vertex of body.vertices) {
        query += '.addV(label,' + `'${vertex.type}',`;
        for (const [key, value] of Object.entries(vertex)) {
          id = uuidv4();
          const finalId = `${vertex.name}-${id}`;
          if (key == 'id') {
            verticesMap.set(value, finalId);
            query += `'${key}','${finalId}',`;
          } else if (key != 'type') query += `'${key}','${value}',`;
        }
        query += `'${vertex.type.toLowerCase()}Id', '${id}',`;
        query = query.slice(0, -1) + `).property('pk','pk')`;
      }

      for (const edge of body.edges) {
        const from = verticesMap.get(edge.from);
        const to = verticesMap.get(edge.to);
        query += `.addE('${edge.relation}').from(g.V().has('id','${from}')).to(g.V().has('id', '${to}')).property('pk','pk')`;
      }
      console.log(query);
      await this.gremlinService.execute(query, {});
      return 'Graph Created Successfully';
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getEntityInWordRelationShips(id: string) {
    const vers = await this.gremlinService.execute(
      'g.V(' +
        `'${id}').inE().project('edge_id', 'edge_label', 'from_id', 'to_id').by(id).by(label).by(inV().id()).by(outV().id())`,
      {},
    );
    if (!vers._items.length) {
      throw new NotFoundException('id not found');
    }
    return JSON.stringify(vers);
  }

  async getEntityOutWordRelationShips(id: string) {
    const vers = await this.gremlinService.execute(
      'g.V(' +
        `'${id}').outE().project('edge_id', 'edge_label', 'from_id', 'to_id').by(id).by(label).by(inV().id()).by(outV().id())`,
      {},
    );
    if (!vers._items.length) {
      throw new NotFoundException('id not found');
    }
    return JSON.stringify(vers);
  }

  async deleteEntity(id: string) {
    await this.gremlinService.execute("g.V().has('id'," + `${id}).drop()`, {});
    return 'Deleted';
  }
}
