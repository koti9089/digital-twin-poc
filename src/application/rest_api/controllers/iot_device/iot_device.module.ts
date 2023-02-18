import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { iotDeviceRepository } from 'src/infrastructure/data_access/gremlin/repositories/iot_device.repository';
import { IotDeviceController } from './iot_device.controller';

@Module({
  controllers: [IotDeviceController],
  providers: [GremlinService, iotDeviceRepository],
})
export class IotDeviceModule {}
