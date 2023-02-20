import { Expose } from 'class-transformer';
export class IotDeviceDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
