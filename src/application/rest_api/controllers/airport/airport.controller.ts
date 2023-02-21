import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AirportRepository } from 'src/infrastructure/data_access/gremlin/repositories/airport.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { AirportDto } from './dtos/airport.dto';
import { CreateAirportDto } from './dtos/create-airport.dto';
import { AllAirportDto } from './dtos/get-all-airport.dto';
import { Airport } from 'src/domain/airpots/airpot/airport';

@ApiTags('Airport')
@Controller('airport')
export class AirportController {
  constructor(private airport: AirportRepository) {}

  @Serialize(AllAirportDto)
  @Get('/all')
  async getAllAirports() {
    const airports = await this.airport.getAllAirports();
    return airports;
  }

  @Serialize(AirportDto)
  @Post()
  async createAirport(@Body() body: CreateAirportDto) {
    const airport = Airport.create(body);
    const result = await this.airport.createAirport(airport, body.cityId);
    return result;
  }

  @Serialize(AirportDto)
  @Get('/:id')
  async getAirport(@Param('id') id: string) {
    return this.airport.getAirport(id);
  }

  @Delete('/:id')
  async deleteAirport(@Param('id') id: string) {
    return this.airport.deleteAirport(id);
  }
}
