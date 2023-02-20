import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { State } from 'src/domain/states/state/state';
import { StateRepository } from 'src/infrastructure/data_access/gremlin/repositories/state.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { CreateStateDto } from './dtos/create-state.dto';
import { AllStateDto } from './dtos/get-all-states.dto';
import { StateDto } from './dtos/state.dto';

@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private stateRepo: StateRepository) {}

  @Serialize(AllStateDto)
  @Get('/all')
  async getAllStates() {
    const countries = await this.stateRepo.getAllStates();
    return countries;
  }

  @Serialize(StateDto)
  @Post()
  async createSate(@Body() body: CreateStateDto) {
    const state = State.create(body);
    const result = await this.stateRepo.createState(state, body.countryId);
    return result;
  }

  @Serialize(StateDto)
  @Get('/:id')
  async getState(@Param('id') id: string) {
    return this.stateRepo.getState(id);
  }

  @Delete('/:id')
  async deleteBuilding(@Param('id') id: string) {
    return this.stateRepo.deleteState(id);
  }
}
