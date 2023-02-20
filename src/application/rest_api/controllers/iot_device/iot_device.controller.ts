import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IotDevice } from 'src/domain/iot_devices/iot_device/iot_device';
import { iotDeviceRepository } from 'src/infrastructure/data_access/gremlin/repositories/iot_device.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { CreateIotDeviceDto } from './dtos/create-iot-device.dto';
import { AllIotDeviceDto } from './dtos/get-all-iot-device.dto';
import { IotDeviceDto } from './dtos/iot-device.dto';

@ApiTags('IotDevice')
@Controller('iot-device')
export class IotDeviceController {
  constructor(private iotDeviceRepo: iotDeviceRepository) {}

  @Serialize(AllIotDeviceDto)
  @Get('/all')
  async getAllFloors() {
    const floors = await this.iotDeviceRepo.getAllIotDevices();
    return floors;
  }

  @Serialize(IotDeviceDto)
  @Post()
  async createFloor(@Body() body: CreateIotDeviceDto) {
    const iotDevice = IotDevice.create(body);
    const result = await this.iotDeviceRepo.createIotDevice(
      iotDevice,
      body.roomId,
    );
    return result;
  }

  @Serialize(IotDeviceDto)
  @Get('/:id')
  async getBuilding(@Param('id') id: string) {
    return this.iotDeviceRepo.getIotDevice(id);
  }

  @Delete('/:id')
  async deleteBuilding(@Param('id') id: string) {
    return this.iotDeviceRepo.deleteIotDevice(id);
  }
}
