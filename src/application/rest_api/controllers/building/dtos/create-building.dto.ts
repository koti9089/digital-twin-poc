import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'Building Name',
    default: 'luxura dreams',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Address Name',
    default: 'Banglore Tech park',
  })
  @IsString()
  address: string;
}
