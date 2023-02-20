import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'Building must belong to some City',
    default: 'Srinagar',
  })
  @IsString()
  @MinLength(1)
  cityId: string;

  @ApiProperty({
    description: 'Building Name',
    default: 'luxura dreams',
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    description: 'Address Name',
    default: 'Banglore Tech park',
  })
  @IsString()
  @MinLength(2)
  address: string;
}
