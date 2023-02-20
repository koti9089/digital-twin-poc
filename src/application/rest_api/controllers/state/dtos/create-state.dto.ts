import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty({
    description: 'State must belong to some Country',
    default: 'India',
  })
  @IsString()
  @MinLength(1)
  countryId: string;

  @ApiProperty({
    description: 'State Name',
    default: 'J&K',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
