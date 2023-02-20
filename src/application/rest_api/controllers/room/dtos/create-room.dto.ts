import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Room must belong to some floor',
    default: '1st',
  })
  @IsString()
  @MinLength(1)
  floorId: string;

  @ApiProperty({
    description: 'Room Name',
    default: '1',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
