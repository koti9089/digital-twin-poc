import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIotDeviceDto {
  @ApiProperty({
    description: 'Iotdveice must belong to some room',
    default: '1',
  })
  @IsString()
  @MinLength(1)
  roomId: string;

  @ApiProperty({
    description: 'Iot Device name',
    default: 'Raspberry Pi',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
