import { IsIn, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntityRelationshipDto {
  @ApiProperty({
    description: 'from node',
    default: 'nodeId-1782w6817',
  })
  @IsString()
  @MinLength(1)
  from_node_id: string;

  @ApiProperty({
    description: 'to node',
    default: 'nodeId-743827e4892',
  })
  @IsString()
  @MinLength(1)
  to_node_id: string;

  @ApiProperty({
    description: 'Label',
    default: 'hasState',
  })
  @IsIn([
    'hasState',
    'hasCity',
    'hasAirport',
    'hasTerminal',
    'hasRoom',
    'hasIotDevice',
  ])
  @IsString()
  @MinLength(1)
  label: string;
}
