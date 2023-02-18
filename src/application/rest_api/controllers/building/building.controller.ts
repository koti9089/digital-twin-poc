import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Building } from 'src/domain/buildings/building/building';
import { BuildingRepository } from 'src/infrastructure/data_access/gremlin/repositories/building.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { BuildingDto } from './dtos/building.dto';
import { CreateBuildingDto } from './dtos/create-building.dto';
import { AllBuildingDto } from './dtos/get-all-building.dto';

@ApiTags('Building')
@Controller('building')
export class BuildingController {
  constructor(private buidingRepo: BuildingRepository) {}

  @Serialize(AllBuildingDto)
  @Get('/all')
  async getAllBuildings() {
    console.log('Running');
    const buildings = await this.buidingRepo.getAllBuildings();
    return buildings;
  }

  @Serialize(BuildingDto)
  @Post()
  async createBuilding(@Body() body: CreateBuildingDto) {
    const building = Building.create(body);
    const result = await this.buidingRepo.createBuilding(building);
    return result;
  }

  @Serialize(BuildingDto)
  @Get('/:id')
  async getBuilding(@Param('id') id: string) {
    return this.buidingRepo.getBuilding(id);
  }

  @Delete('/:id')
  async deleteBuilding(@Param('id') id: string) {
    return this.buidingRepo.deleteBuilding(id);
  }
}
