import { Injectable } from '@nestjs/common';
import { State } from 'src/domain/states/state/state';

@Injectable()
export class StateMapper {
  toDomain(stateResponse) {
    const state = stateResponse._items.map((state) => {
      return State.create({
        id: state.id,
        name: state.properties.name[0].value,
      });
    });
    return state;
  }
}
