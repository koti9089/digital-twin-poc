import { Room } from 'src/domain/rooms/room/room';
import { Entity } from '../../entity';
import { IIotDeviceProps } from './iot_device.props';

export class IotDevice extends Entity<IIotDeviceProps> {
  private _name: string;
  private constructor(props: IIotDeviceProps) {
    const { id, ...data } = props;
    super(data, id);
  }

  public static create(props: IIotDeviceProps): IotDevice {
    const instance = new IotDevice(props);
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
}
