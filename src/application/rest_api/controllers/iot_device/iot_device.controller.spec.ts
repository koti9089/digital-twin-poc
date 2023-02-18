import { Test, TestingModule } from '@nestjs/testing';
import { IotDeviceController } from './iot_device.controller';

describe('IotDeviceController', () => {
  let controller: IotDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IotDeviceController],
    }).compile();

    controller = module.get<IotDeviceController>(IotDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
