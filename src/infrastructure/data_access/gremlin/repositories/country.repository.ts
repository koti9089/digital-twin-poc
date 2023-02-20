import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Country } from 'src/domain/countries/country/country';
import { CountryMapper } from '../../mappers/country.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class CountryRepository {
  constructor(
    private gremlinService: GremlinService,
    private countryMapper: CountryMapper,
  ) {}

  async createCountry(country: Country) {
    const found = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Country')",
      {
        id: country.name,
      },
    );
    if (found._items.length > 0) {
      throw new ConflictException('Country already exists');
    }
    const countryCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('countryId', countryId).property('pk', 'pk')",
      {
        label: 'Country',
        id: `${country.name}`,
        name: country.name,
        countryId: country.id,
      },
    );
    return this.countryMapper.toDomain(countryCreated)[0];
  }

  async getCountry(id: string) {
    const country = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Country')",
      {
        id,
      },
    );
    if (!country._items.length) {
      throw new NotFoundException('id not found');
    }
    const states = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Country').out()",
      {
        id,
      },
    );
    country.states = states;
    return this.countryMapper.toDomain(country)[0];
  }

  async getAllCountries() {
    const countries = await this.gremlinService.execute(
      "g.V().hasLabel('Country')",
    );
    const result = { _items: this.countryMapper.toDomain(countries) };
    return result;
  }

  async deleteCountry(id: string) {
    await this.getCountry(id);
    await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Country').drop()",
      {
        id,
      },
    );
    return 'Deleted';
  }
}
