import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({
    description: 'City must belong to some State',
    default: 'Srinagar',
  })
  @IsString()
  @MinLength(1)
  countryId: string;

  @ApiProperty({
    description: 'State Name',
    default: 'J&k',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
