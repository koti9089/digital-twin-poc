import { Module } from '@nestjs/common';
import { GremlinService } from 'src/infrastructure/data_access/gremlin/gremlin.service';
import { TerminalRepository } from 'src/infrastructure/data_access/gremlin/repositories/terminal.repository';
import { TerminalMapper } from 'src/infrastructure/data_access/mappers/terminal.mapper';
import { IotDeviceMapper } from 'src/infrastructure/data_access/mappers/iot-device.mapper';
import { RoomMapper } from 'src/infrastructure/data_access/mappers/room.mapper';
import { TerminalController } from './terminal.controller';

@Module({
  controllers: [TerminalController],
  providers: [
    GremlinService,
    TerminalRepository,
    TerminalMapper,
    RoomMapper,
    IotDeviceMapper,
  ],
})
export class TerminalModule {}
