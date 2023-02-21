import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { City } from 'src/domain/cities/city/city';
import { CityMapper } from '../../mappers/city.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class CityRepository {
  constructor(
    private gremlinService: GremlinService,
    private cityMapper: CityMapper,
  ) {}

  async createCity(city: City, stateId: string) {
    const stateFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('State')",
      {
        id: stateId,
      },
    );
    if (!stateFound._items.length) {
      throw new ConflictException("State doesn't exists");
    }

    const cityFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('City')",
      {
        id: city.name,
      },
    );
    if (cityFound._items.length > 0) {
      throw new ConflictException('City already exists');
    }

    const cityId = `${city.name}-${city.id}`;
    const cityCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('cityId', cityId).property('pk', 'pk')",
      {
        label: 'City',
        id: cityId,
        name: city.name,
        cityId: city.id,
      },
    );

    // make relations of floor with building

    await this.gremlinService.execute(
      "g.V(stateId).hasLabel('State').addE(relationship).to(g.V(cityId).hasLabel('City'))",
      {
        stateId: stateId,
        cityId: cityId,
        relationship: 'hasCity',
      },
    );
    return this.cityMapper.toDomain(cityCreated)[0];
  }

  async getCity(id: string) {
    const city = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('City')",
      {
        id,
      },
    );
    if (!city._items.length) {
      throw new NotFoundException('id not found');
    }
    const airports = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('City').out()",
      {
        id,
      },
    );
    city.airports = airports;
    return this.cityMapper.toDomain(city)[0];
  }

  async getAllCities() {
    const cities = await this.gremlinService.execute("g.V().hasLabel('City')");
    const result = { _items: this.cityMapper.toDomain(cities) };
    return result;
  }

  async deleteCity(id: string) {
    await this.getCity(id);
    await this.gremlinService.execute("g.V('id', id).hasLabel('City').drop()", {
      id,
    });
    return 'Deleted';
  }
}
