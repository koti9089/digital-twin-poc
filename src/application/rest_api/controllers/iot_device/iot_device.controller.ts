import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { iotDeviceRepository } from 'src/infrastructure/data_access/gremlin/repositories/iot_device.repository';

@ApiTags('IotDevice')
@Controller('iot-device')
export class IotDeviceController {
  constructor(private iotDeviceRepo: iotDeviceRepository) {}
}
