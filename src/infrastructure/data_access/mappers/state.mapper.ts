import { Injectable } from '@nestjs/common';
import { City } from 'src/domain/cities/city/city';
import { State } from 'src/domain/states/state/state';
import { CityMapper } from './city.mapper';

@Injectable()
export class StateMapper {
  constructor(private cityMapper: CityMapper) {}
  toDomain(stateResponse) {
    const cities: City[] | undefined = stateResponse.cities
      ? this.cityMapper.toDomain(stateResponse.cities)
      : undefined;
    const state = stateResponse._items.map((state) => {
      return State.create({
        id: state.id,
        name: state.properties.name[0].value,
        cities,
      });
    });
    return state;
  }
}
