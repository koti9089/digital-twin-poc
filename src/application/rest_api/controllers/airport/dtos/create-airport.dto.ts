import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAirportDto {
  @ApiProperty({
    description: 'Airport must belong to some City',
    default: 'Srinagar',
  })
  @IsString()
  @MinLength(1)
  cityId: string;

  @ApiProperty({
    description: 'Airport Name',
    default: 'Dehli Airport',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Address Name',
    default: 'Dehli 190001',
  })
  @IsString()
  @MinLength(2)
  address: string;
}
