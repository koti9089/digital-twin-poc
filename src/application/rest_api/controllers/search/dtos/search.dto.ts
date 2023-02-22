import { Expose, Type } from 'class-transformer';
import { CountryDto } from '../../country/dtos/country.dto';
import { IotDeviceDto } from '../../iot_device/dtos/iot-device.dto';
import { StateDto } from '../../state/dtos/state.dto';
import { TerminalDto } from '../../terminal/dtos/terminal.dto';
export class SearchDto {
  @Expose()
  @Type(() => IotDeviceDto)
  iotDevices: IotDeviceDto[];

  @Expose()
  inEdge?: {
    _id: 'string';
    _name: 'string';
  };
}
