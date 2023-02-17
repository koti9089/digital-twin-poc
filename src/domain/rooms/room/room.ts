import { IotDevice } from 'src/domain/iot_devices/iot_device/iot_device';
import { Entity } from '../../entity';
import { IRoomProps } from './room.props';

export class Room extends Entity<IRoomProps> {
  private _name: string;
  private _iotDevices?: IotDevice[];
  private constructor(props: IRoomProps) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: IRoomProps): Room {
    const instance = new Room(props);
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

  get iotDevices(): IotDevice[] | undefined {
    return this._iotDevices;
  }
  set rooms(iotDevices: IotDevice[] | undefined) {
    this._iotDevices = iotDevices;
  }
}
