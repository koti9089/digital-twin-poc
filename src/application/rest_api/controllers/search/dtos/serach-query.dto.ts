import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, MinLength } from 'class-validator';
export class SearchQueryDto {
  @ApiProperty({
    description: 'id',
    default: 'India-e30447eb-1545-436f-a565-582d8acf5f3c',
  })
  @IsString()
  @MinLength(1)
  id: string;

  @ApiProperty({
    description: 'search from some vertex',
    default: 'Country',
  })
  @IsString()
  @MinLength(1)
  @IsIn([
    'Country',
    'State',
    'City',
    'Airport',
    'Terminal',
    'Room',
    'IotDevice',
  ])
  searchWithin: string;
}
