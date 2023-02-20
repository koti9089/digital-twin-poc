import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IotDevice } from 'src/domain/iot_devices/iot_device/iot_device';
import { IotDeviceMapper } from '../../mappers/iot-device.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class iotDeviceRepository {
  constructor(
    private gremlinService: GremlinService,
    private iotDeviceMapper: IotDeviceMapper,
  ) {}

  async createIotDevice(iotDevice: IotDevice, roomId: string) {
    const roomFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Room')",
      {
        id: roomId,
      },
    );
    if (!roomFound._items.length) {
      throw new ConflictException("Building doesn't exists");
    }

    const iotDeviceFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('IotDevice')",
      {
        id: iotDevice.name,
      },
    );
    if (iotDeviceFound._items.length > 0) {
      throw new ConflictException('IotDevice already exists');
    }
    const iotDeviceId = `${iotDevice.name}-${iotDevice.id}`;
    const floorCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('iotDeviceId', iotDeviceId).property('pk', 'pk')",
      {
        label: 'IotDevice',
        id: iotDeviceId,
        name: iotDevice.name,
        iotDeviceId: iotDevice.id,
      },
    );

    // make relations of floor with building

    await this.gremlinService.execute(
      "g.V(roomId).hasLabel('Room').addE(relationship).to(g.V(iotDeviceId).hasLabel('IotDevice'))",
      {
        roomId: roomId,
        iotDeviceId: iotDeviceId,
        relationship: 'has',
      },
    );
    return this.iotDeviceMapper.toDomain(floorCreated)[0];
  }

  async getIotDevice(id: string) {
    const building = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('IotDevice')",
      {
        id,
      },
    );
    if (!building._items.length) {
      throw new NotFoundException('id not found');
    }
    return this.iotDeviceMapper.toDomain(building)[0];
  }

  async getAllIotDevices() {
    const iotDevices = await this.gremlinService.execute(
      "g.V().hasLabel('IotDevice')",
    );
    const result = { _items: this.iotDeviceMapper.toDomain(iotDevices) };
    return result;
  }

  async deleteIotDevice(id: string) {
    await this.getIotDevice(id);
    await this.gremlinService.execute(
      "g.V('id', id).hasLabel('IotDevice').drop()",
      {
        id,
      },
    );
    return 'Deleted';
  }
}
