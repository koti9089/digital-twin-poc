import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BuildingRepository } from 'src/infrastructure/data_access/gremlin/repositories/building.repository';

@ApiTags('Building')
@Controller('building')
export class BuildingController {
  constructor(private buidingRepo: BuildingRepository) {}
  @Get('/all')
  async getAllBuildings(): Promise<string> {
    return 'Gets all buildings';
  }
}
