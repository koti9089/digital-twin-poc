import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { State } from 'src/domain/states/state/state';
import { StateMapper } from '../../mappers/state.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class StateRepository {
  constructor(
    private gremlinService: GremlinService,
    private stateMapper: StateMapper,
  ) {}

  async createState(state: State, countryId: string) {
    const countryFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Country')",
      {
        id: countryId,
      },
    );
    if (!countryFound._items.length) {
      throw new ConflictException("Country doesn't exists");
    }

    const stateFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('State')",
      {
        id: state.name,
      },
    );
    if (stateFound._items.length > 0) {
      throw new ConflictException('State already exists');
    }
    const stateId = `${state.name}-${state.id}`;
    const stateCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('stateId', stateId).property('pk', 'pk')",
      {
        label: 'State',
        id: stateId,
        name: state.name,
        stateId: state.id,
      },
    );

    // make relations of floor with building

    await this.gremlinService.execute(
      "g.V(countryId).hasLabel('Country').addE(relationship).to(g.V(stateId).hasLabel('State'))",
      {
        countryId: countryId,
        stateId: stateId,
        relationship: 'hasState',
      },
    );
    return this.stateMapper.toDomain(stateCreated)[0];
  }

  async getState(id: string) {
    const state = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('State')",
      {
        id,
      },
    );
    if (!state._items.length) {
      throw new NotFoundException('id not found');
    }
    const cities = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('State').out()",
      {
        id,
      },
    );
    state.cities = cities;
    return this.stateMapper.toDomain(state)[0];
  }

  async getAllStates() {
    const states = await this.gremlinService.execute("g.V().hasLabel('State')");
    const result = { _items: this.stateMapper.toDomain(states) };
    return result;
  }

  async deleteState(id: string) {
    await this.getState(id);
    await this.gremlinService.execute(
      "g.V('id', id).hasLabel('State').drop()",
      {
        id,
      },
    );
    return 'Deleted';
  }
}
