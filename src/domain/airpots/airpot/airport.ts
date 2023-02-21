import { Floor } from 'src/domain/floors/floor/floor';
import { Entity } from '../../entity';
import { IAirportProps } from './airport.props';

export class Airport extends Entity<IAirportProps> {
  private _name: string;
  private _address: string;
  private _floors?: Floor[];
  private constructor(props: IAirportProps) {
    const { id } = props;
    super(id);
    this._name = props.name;
    this._address = props.address;
    this._floors = props.floors;
  }

  public static create(props: IAirportProps): Airport {
    const instance = new Airport(props);
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

  get address(): string {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  get floors(): Floor[] | undefined {
    return this._floors;
  }
  set floors(floors: Floor[] | undefined) {
    this._floors = floors;
  }
}
