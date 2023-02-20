import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { City } from 'src/domain/cities/city/city';
import { CityRepository } from 'src/infrastructure/data_access/gremlin/repositories/city.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { CityDto } from './dtos/city.dto';
import { CreateCityDto } from './dtos/create-city.dto';
import { AllCityDto } from './dtos/get-all-city.dto';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private cityRepo: CityRepository) {}

  @Serialize(AllCityDto)
  @Get('/all')
  async getAllCities() {
    const cities = await this.cityRepo.getAllCities();
    return cities;
  }

  @Serialize(CityDto)
  @Post()
  async createCity(@Body() body: CreateCityDto) {
    const city = City.create(body);
    const result = await this.cityRepo.createCity(city, body.stateID);
    return result;
  }

  @Serialize(CityDto)
  @Get('/:id')
  async getCity(@Param('id') id: string) {
    return this.cityRepo.getCity(id);
  }

  @Delete('/:id')
  async deleteCity(@Param('id') id: string) {
    return this.cityRepo.deleteCity(id);
  }
}
