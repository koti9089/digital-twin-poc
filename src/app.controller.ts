import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  getHello(): string {

  const data={"vertices":[{"id":"1","name":"United States","type":"Country","polulation":"10croes"},
                         {"id":"2","name":"California","type":"State"},
                         {"id":"3","name":"San Francisco","type":"City"},
                         {"id":"4","name":"San Francisco International Airport","type":"Airport"},
                         {"id":"5","name":"Terminal 1","type":"Terminal"},
                         {"id":"6","name":"Gate 1","type":"Room"},
                         {"id":"7","name":"Light sensor 1","type":"IotDevice"}],
               "edges":[{"from":"1","to":"2","relation":"hasState"},
                          {"from":"2","to":"3","relation":"hasCity"},
                          {"from":"3","to":"4","relation":"hasAirport"},
                          {"from":"4","to":"5","relation":"hasTerminal"},
                          {"from":"5","to":"6","relation":"hasRoom"},
                          {"from":"6","to":"7","relation":"hasIotDevice"}]}

              let query = 'g';              
              for (const vertex of data.vertices) {                
                query += '.addV(label,'+`'${vertex.type}',`;
                for (const [key, value] of Object.entries(vertex)) {
                  if(key == 'id')
                  query += `'${key}','${vertex.name}-${value}',`;
                 else if (key != 'type') 
                    query += `'${key}','${value}',`;
                  }
                  query=query.slice(0, -1)+`).as('${vertex.id}').property('pk','pk')`;  
                }   

              for (const edge of data.edges) {                                            
                    query += `.addE('${edge.relation}').from('${edge.from}').to('${edge.to}').property('pk','pk')`; 
                }                

              console.log(query);
              return this.appService.pong();
            
              };
  
}
