import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Floor } from 'src/domain/floors/floor/floor';
import { FloorRepository } from 'src/infrastructure/data_access/gremlin/repositories/floors.repository';
import { CreateFloorDto } from './dtos/create-floor.dto';

@ApiTags('Floor')
@Controller('floor')
export class FloorController {
  constructor(private floorRepo: FloorRepository) {}

  @Get('/all')
  getHello(): string {
    return 'Pong';
  }

  @Post()
  async createFloor(@Body() body: CreateFloorDto) {
    const floor = Floor.create(body);
    const result = await this.floorRepo.createFloor(floor, body.buildingId);
    return result;
  }
}
