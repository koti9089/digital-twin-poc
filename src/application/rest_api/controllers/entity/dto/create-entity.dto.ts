import { IsString, MinLength } from 'class-validator';
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
    default: 'country or persion etc..',
  })
  @IsString()
  @MinLength(1)
  type: string; 
}
