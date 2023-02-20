import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({
    description: 'Country Name',
    default: 'India',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
