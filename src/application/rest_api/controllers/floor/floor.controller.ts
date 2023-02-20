import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Floor } from 'src/domain/floors/floor/floor';
import { FloorRepository } from 'src/infrastructure/data_access/gremlin/repositories/floors.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { CreateFloorDto } from './dtos/create-floor.dto';
import { FloorDto } from './dtos/floor.dto';
import { AllFloorDto } from './dtos/get-all-floor.dto';

@ApiTags('Floor')
@Controller('floor')
export class FloorController {
  constructor(private floorRepo: FloorRepository) {}

  @Serialize(AllFloorDto)
  @Get('/all')
  async getAllFloors() {
    const floors = await this.floorRepo.getAllFloors();
    return floors;
  }

  @Serialize(FloorDto)
  @Post()
  async createFloor(@Body() body: CreateFloorDto) {
    const floor = Floor.create(body);
    const result = await this.floorRepo.createFloor(floor, body.buildingId);
    return result;
  }

  @Serialize(FloorDto)
  @Get('/:id')
  async getBuilding(@Param('id') id: string) {
    return this.floorRepo.getFloor(id);
  }

  @Delete('/:id')
  async deleteBuilding(@Param('id') id: string) {
    return this.floorRepo.deleteFloor(id);
  }
}
