import { Room } from 'src/domain/rooms/room/room';
import { Entity } from '../../entity';
import { ITerminalProps } from './terminal.props';

export class Terminal extends Entity<ITerminalProps> {
  private _name: string;
  private _rooms?: Room[];
  private constructor(props: ITerminalProps) {
    const { id } = props;
    super(id);
    this._name = props.name;
    this._rooms = props.rooms;
  }

  public static create(props: ITerminalProps): Terminal {
    const instance = new Terminal(props);
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

  get rooms(): Room[] | undefined {
    return this._rooms;
  }
  set rooms(rooms: Room[] | undefined) {
    this._rooms = rooms;
  }
}
