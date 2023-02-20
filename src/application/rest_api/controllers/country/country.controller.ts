import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Country } from 'src/domain/countries/country/country';
import { CountryRepository } from 'src/infrastructure/data_access/gremlin/repositories/country.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { CountryDto } from './dtos/country.dto';
import { CreateCountryDto } from './dtos/create-country.dto';
import { AllCountryDto } from './dtos/get-all-country.dto';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private countryRepo: CountryRepository) {}

  @Serialize(AllCountryDto)
  @Get('/all')
  async getAllBuildings() {
    const countries = await this.countryRepo.getAllCountries();
    return countries;
  }

  @Serialize(CountryDto)
  @Post()
  async createCountry(@Body() body: CreateCountryDto) {
    const country = Country.create(body);
    const result = await this.countryRepo.createCountry(country);
    return result;
  }

  @Serialize(CountryDto)
  @Get('/:id')
  async getBuilding(@Param('id') id: string) {
    return this.countryRepo.getCountry(id);
  }

  @Delete('/:id')
  async deleteBuilding(@Param('id') id: string) {
    return this.countryRepo.deleteCountry(id);
  }
}
