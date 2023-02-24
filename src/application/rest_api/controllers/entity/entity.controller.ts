import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityRepository  } from 'src/infrastructure/data_access/gremlin/repositories/entity.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { EntityDto  } from './dto/entity.dto';
import { DomainEntity } from 'src/domain/entities/domainEntity';
import { CreateEntityDto } from './dto/create-entity.dto';
import { DataDto } from './../graph/dtos/create-graph.dto';
import { json } from 'stream/consumers';

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
  async getEntity(@Param('id') id: string , @Param('type') type:string) {   
    return this.entityRepo.getEntity(id,type);
  }
  
  @Serialize(DataDto)
  @Post('CreateEntitiesWithRelationships')
  async createEntitiesWithRelationships(@Body() body: DataDto) {
    let query = 'g';              
    for (const vertex of body.vertices) {                
      query += '.addV(label,'+`'${vertex.type}',`;
      for (const [key, value] of Object.entries(vertex)) {
        if(key == 'id')
        query += `'${key}','${vertex.name}-${value}',`;
       else if (key != 'type') 
          query += `'${key}','${value}',`;
        }
        query=query.slice(0, -1)+`).as('${vertex.id}').property('pk','pk')`;  
      }   

    for (const edge of body.edges) {                                            
          query += `.addE('${edge.relation}').from('${edge.from}').to('${edge.to}').property('pk','pk')`; 
      }                
      console.log(query);

      await this.entityRepo.createEntitiesWithRelationships(query);  
      return 'Graph Created Successfully'; 
  }

  @Get('/:relationDirection:/:id')
  async getEntityRelationShips(@Param('relationDirection') relationDirection :string, @Param('id') id: string) {   
    if(relationDirection=="in"){
    return this.entityRepo.getEntityInWordRelationShips(id);
    }
    else if(relationDirection=="out"){
    return this.entityRepo.getEntityOutWordRelationShips(id);
    }
  }
  
  @Delete('/:id')
  async deleteEntity(@Param('id') id: string) {
    return this.entityRepo.deleteEntity(id);
  }

}

