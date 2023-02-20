import { State } from 'src/domain/states/state/state';
import { Entity } from '../../entity';
import { ICountryProps } from './country.props';

export class Country extends Entity<ICountryProps> {
  private _name: string;
  private _states?: State[];
  private constructor(props: ICountryProps) {
    const { id } = props;
    super(id);
    this._name = props.name;
    this._states = props.states;
  }

  public static create(props: ICountryProps): Country {
    const instance = new Country(props);
    return instance;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get states(): State[] | undefined {
    return this._states;
  }
  set floors(states: State[] | undefined) {
    this._states = states;
  }
}
