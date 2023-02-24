import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { DataDto } from './dtos/create-graph.dto';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('graph')
@Controller('graph')
export class GraphController {
  constructor(private gremlinService: GremlinService) {}
  @Post()
  async createGraph(@Body() body: DataDto) {
    for (let i = 0; i < body.vertices.length; i++) {
      const verticesMap = new Map();

      for (let j = 0; j < body.vertices.length; j++) {
        const vertex = body.vertices[j];
        const id = uuidv4();
        const finalId = `${vertex.name}-${id}`;
        const query = `g.addV('${
          vertex.type
        }').property('id', '${finalId}').property('name', '${
          vertex.name
        }').property('${vertex.type.toLowerCase()}Id', '${id}').property('pk', 'pk')`;
        await this.gremlinService.execute(query);
        verticesMap.set(vertex.id, finalId);
      }

      for (let j = 0; j < body.edges.length; j++) {
        const edge = body.edges[j];
        const from = verticesMap.get(edge.from);
        const to = verticesMap.get(edge.to);
        const query = `g.V().has('id', '${from}').addE('${edge.relation}').to(g.V().has('id', '${to}'))`;
        await this.gremlinService.execute(query);
      }
    }

    return 'Graph Created Successfully';
  }
}
