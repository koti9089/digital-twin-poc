import { Injectable } from '@nestjs/common';
import { IotDevice } from 'src/domain/iot_devices/iot_device/iot_device';
import { Room } from 'src/domain/rooms/room/room';
import { IotDeviceMapper } from './iot-device.mapper';

@Injectable()
export class RoomMapper {
  constructor(private iotDeviceMapper: IotDeviceMapper) {}
  toDomain(roomResponse) {
    const iotDevices: IotDevice[] | undefined = roomResponse.iot_devices
      ? this.iotDeviceMapper.toDomain(roomResponse.iot_devices)
      : undefined;
    const room = roomResponse._items.map((room) => {
      return Room.create({
        id: room.id,
        name: room.properties.name[0].value,
        iotDevices,
      });
    });
    return room;
  }
}
