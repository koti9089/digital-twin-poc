import { IotDevice } from 'src/domain/iot_devices/iot_device/iot_device';

export interface IRoomProps {
  id?: string;
  name: string;
  iotDevices?: IotDevice[];
}
