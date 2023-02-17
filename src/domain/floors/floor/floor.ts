import { Room } from 'src/domain/rooms/room/room';
import { Entity } from '../../entity';
import { IFloorProps } from './floor.props';

export class Floor extends Entity<IFloorProps> {
  private _name: string;
  private _rooms?: Room[];
  private constructor(props: IFloorProps) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: IFloorProps): Floor {
    const instance = new Floor(props);
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
