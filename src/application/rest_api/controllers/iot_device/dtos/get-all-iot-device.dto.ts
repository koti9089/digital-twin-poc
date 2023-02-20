import { Expose, Type } from 'class-transformer';
import { IotDeviceDto } from './iot-device.dto';
export class AllIotDeviceDto {
  @Expose()
  @Type(() => IotDeviceDto)
  _items: IotDeviceDto[];
}
