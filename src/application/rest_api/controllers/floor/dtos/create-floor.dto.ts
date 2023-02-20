import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFloorDto {
  @ApiProperty({
    description: 'Floor must belong to some building',
    default: 'luxura dreams',
  })
  @IsString()
  @MinLength(1)
  buildingId: string;

  @ApiProperty({
    description: 'Floor Name',
    default: '',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
