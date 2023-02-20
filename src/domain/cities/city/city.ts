import { Building } from 'src/domain/buildings/building/building';
import { Entity } from '../../entity';
import { ICityProps } from './city.props';

export class City extends Entity<ICityProps> {
  private _name: string;
  private _buildings?: Building[];
  private constructor(props: ICityProps) {
    const { id } = props;
    super(id);
    this._name = props.name;
    this._buildings = props.buildings;
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

  get buildings(): Building[] | undefined {
    return this._buildings;
  }
  set buildings(buildings: Building[] | undefined) {
    this._buildings = buildings;
  }
}
