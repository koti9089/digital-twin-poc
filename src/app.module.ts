import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingModule } from './application/rest_api/controllers/building/building.module';
import { GremlinService } from './infrastructure/data_access/gremlin/gremlin.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BuildingModule,
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
