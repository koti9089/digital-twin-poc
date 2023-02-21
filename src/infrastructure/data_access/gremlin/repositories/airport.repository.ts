import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Airport } from 'src/domain/airpots/airpot/airport';
import { AirportMapper } from '../../mappers/airport.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class AirportRepository {
  constructor(
    private gremlinService: GremlinService,
    private airportMapper: AirportMapper,
  ) {}

  async createAirport(airport: Airport, cityId: string) {
    const cityFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('City')",
      {
        id: cityId,
      },
    );
    if (!cityFound._items.length) {
      throw new ConflictException("City doesn't exists");
    }

    const found = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Airport')",
      {
        id: airport.name,
      },
    );
    if (found._items.length > 0) {
      throw new ConflictException('Airport already exists');
    }
    const airportId = `${airport.name}-${airport.id}`;
    const buildingCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('address', address).property('airportId', airportId).property('pk', 'pk')",
      {
        label: 'Airport',
        id: airportId,
        name: airport.name,
        address: airport.address,
        airportId: airport.id,
      },
    );

    await this.gremlinService.execute(
      "g.V(cityId).hasLabel('City').addE(relationship).to(g.V(airportId).hasLabel('Airport'))",
      {
        cityId: cityId,
        airportId: airportId,
        relationship: 'hasAirport',
      },
    );

    return this.airportMapper.toDomain(buildingCreated)[0];
  }

  async getAirport(id: string) {
    const airport = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Airport')",
      {
        id,
      },
    );
    if (!airport._items.length) {
      throw new NotFoundException('id not found');
    }
    const floors = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Airport').out()",
      {
        id,
      },
    );
    airport.floors = floors;
    return this.airportMapper.toDomain(airport)[0];
  }

  async getAllAirports() {
    const airports = await this.gremlinService.execute(
      "g.V().hasLabel('Airport')",
    );
    const result = { _items: this.airportMapper.toDomain(airports) };
    return result;
  }

  async deleteAirport(id: string) {
    await this.getAirport(id);
    await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Airport').drop()",
      {
        id,
      },
    );
    return 'Deleted';
  }
}
