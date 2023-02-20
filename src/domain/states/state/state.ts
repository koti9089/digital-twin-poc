import { City } from 'src/domain/cities/city/city';
import { Entity } from '../../entity';
import { IStateProps } from './state.props';

export class State extends Entity<IStateProps> {
  private _name: string;
  private _cities?: City[];
  private constructor(props: IStateProps) {
    const { id } = props;
    super(id);
    this._name = props.name;
    this._cities = props.cities;
  }

  public static create(props: IStateProps): State {
    const instance = new State(props);
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

  get cities(): City[] | undefined {
    return this._cities;
  }
  set cities(cities: City[] | undefined) {
    this._cities = cities;
  }
}
