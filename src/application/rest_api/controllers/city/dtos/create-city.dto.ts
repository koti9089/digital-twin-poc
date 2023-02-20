import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({
    description: 'City must belong to some State',
    default: 'J&K',
  })
  @IsString()
  @MinLength(1)
  stateID: string;

  @ApiProperty({
    description: 'State Name',
    default: 'Srinagar',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
