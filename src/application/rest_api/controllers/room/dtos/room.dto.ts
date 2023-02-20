import { Expose, Type } from 'class-transformer';
import { IotDeviceDto } from '../../iot_device/dtos/iot-device.dto';
export class RoomDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => IotDeviceDto)
  iotDevices?: IotDeviceDto[];
}
