import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirportModule } from './application/rest_api/controllers/airport/airport.module';
import { GremlinService } from './infrastructure/data_access/gremlin/gremlin.service';
import { TerminalModule } from './application/rest_api/controllers/terminal/terminal.module';
import { RoomModule } from './application/rest_api/controllers/room/room.module';
import { IotDeviceModule } from './application/rest_api/controllers/iot_device/iot_device.module';
import { CountryModule } from './application/rest_api/controllers/country/country.module';
import { StateModule } from './application/rest_api/controllers/state/state.module';
import { CityModule } from './application/rest_api/controllers/city/city.module';
import { SearchModule } from './application/rest_api/controllers/search/search.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AirportModule,
    TerminalModule,
    RoomModule,
    IotDeviceModule,
    CountryModule,
    StateModule,
    CityModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GremlinService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // strip extra props
      }),
    },
  ],
})
export class AppModule {}
