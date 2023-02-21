import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Room must belong to some terminal',
    default: 'TerminalId',
  })
  @IsString()
  @MinLength(1)
  terminalId: string;

  @ApiProperty({
    description: 'Room Name',
    default: 'Security Room',
  })
  @IsString()
  @MinLength(1)
  name: string;
}
