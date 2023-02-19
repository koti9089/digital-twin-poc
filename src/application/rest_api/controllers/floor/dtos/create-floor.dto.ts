import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFloorDto {
  @ApiProperty({
    description: 'Floor must belong to some building',
    default: 'luxura dreams',
  })
  @IsString()
  buildingId: string;

  @ApiProperty({
    description: 'Floor Name',
    default: '',
  })
  @IsString()
  name: string;
}
