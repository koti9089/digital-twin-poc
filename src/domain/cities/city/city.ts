import { Airport } from 'src/domain/airpots/airpot/airport';
import { Entity } from '../../entity';
import { ICityProps } from './city.props';

export class City extends Entity<ICityProps> {
  private _name: string;
  private _airports?: Airport[];
  private constructor(props: ICityProps) {
    const { id } = props;
    super(id);
    this._name = props.name;
    this._airports = props.airports;
  }

  public static create(props: ICityProps): City {
    const instance = new City(props);
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

  get airports(): Airport[] | undefined {
    return this._airports;
  }
  set airports(_airports: Airport[] | undefined) {
    this._airports = _airports;
  }
}
