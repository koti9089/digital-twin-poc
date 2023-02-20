import { Injectable } from '@nestjs/common';
import { IotDevice } from 'src/domain/iot_devices/iot_device/iot_device';

@Injectable()
export class IotDeviceMapper {
  toDomain(iotDeviceResponse) {
    const iotDevice = iotDeviceResponse._items.map((iotDevice) => {
      return IotDevice.create({
        id: iotDevice.id,
        name: iotDevice.properties.name[0].value,
      });
    });
    return iotDevice;
  }
}
