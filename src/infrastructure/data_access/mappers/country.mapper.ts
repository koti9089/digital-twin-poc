import { Injectable } from '@nestjs/common';
import { Country } from 'src/domain/countries/country/country';
import { State } from 'src/domain/states/state/state';
import { StateMapper } from './state.mapper';

@Injectable()
export class CountryMapper {
  constructor(private stateMapper: StateMapper) {}
  toDomain(countryResponse) {
    const states: State[] | undefined = countryResponse.states
      ? this.stateMapper.toDomain(countryResponse.states)
      : undefined;
    const country = countryResponse._items.map((country) => {
      return Country.create({
        id: country.id,
        name: country.properties.name[0].value,
        states,
      });
    });
    return country;
  }
}
