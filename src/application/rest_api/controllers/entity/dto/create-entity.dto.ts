import { IsIn, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntityDto {
  @ApiProperty({
    description: 'Lable Name',
    default: 'India or Koti etc..',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Lable type',
    default: 'Country or State etc..',
  })
  @IsIn([
    'Country',
    'State',
    'City',
    'Airport',
    'Terminal',
    'Room',
    'IotDevice',
  ])
  @IsString()
  @MinLength(1)
  type: string;
}
