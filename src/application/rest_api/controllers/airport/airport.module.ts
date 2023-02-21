import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { AirportRepository } from 'src/infrastructure/data_access/gremlin/repositories/airport.repository';
import { AirportMapper } from 'src/infrastructure/data_access/mappers/airport.mapper';
import { FloorMapper } from 'src/infrastructure/data_access/mappers/floor.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { AirportController } from './airport.controller';

@Module({
  controllers: [AirportController],
  providers: [
    GremlinService,
    AirportRepository,
    AirportMapper,
    FloorMapper,
    RoomMapper,
    IotDeviceMapper,
  ],
})
export class AirportModule {}
