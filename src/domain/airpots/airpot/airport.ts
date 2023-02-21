import { Terminal } from 'src/domain/terminals/terminal/terminal';
import { Entity } from '../../entity';
import { IAirportProps } from './airport.props';

export class Airport extends Entity<IAirportProps> {
  private _name: string;
  private _address: string;
  private _terminals?: Terminal[];
  private constructor(props: IAirportProps) {
    const { id } = props;
    super(id);
    this._name = props.name;
    this._address = props.address;
    this._terminals = props.terminals;
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

  get terminals(): Terminal[] | undefined {
    return this._terminals;
  }
  set terminals(terminals: Terminal[] | undefined) {
    this._terminals = terminals;
  }
}
