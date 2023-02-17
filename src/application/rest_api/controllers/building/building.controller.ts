import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';

@ApiTags('Building')
@Controller('building')
export class BuildingController {
  constructor(private gremlinClient: GremlinService) {}
  @Get('/ping')
  async getHello(): Promise<string> {
    await this.gremlinClient.dropGraph();
    await this.gremlinClient.addVertex1();
    return 'Gets all buildings';
  }
}
