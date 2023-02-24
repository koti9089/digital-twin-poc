import { IsArray, IsIn, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

class VertexDto {
  @ApiProperty({
    description: 'name of the vertex',
    default: 'India',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'type of the vertex',
    default: 'Country',
    enum: [
      'Country',
      'State',
      'City',
      'Airport',
      'Terminal',
      'Room',
      'IotDevice',
    ],
  })
  @IsIn([
    'Country',
    'State',
    'City',
    'Airport',
    'Terminal',
    'Room',
    'IotDevice',
  ])
  @IsString()
  type: string;

  @ApiProperty({
    description: 'unique id of the vertex',
    default: '1524',
  })
  @IsString()
  id: string;
}

class EdgeDto {
  @ApiProperty({
    description: 'relation name',
    default: 'hasState',
    enum: [
      'hasCountry',
      'hasState',
      'hasCity',
      'hasAirport',
      'hasTerminal',
      'hasRoom',
      'hasIotDevice',
    ],
  })
  @IsString()
  @IsIn([
    'hasCountry',
    'hasState',
    'hasCity',
    'hasAirport',
    'hasTerminal',
    'hasRoom',
    'hasIotDevice',
  ])
  relation: string;

  @ApiProperty({
    description: 'relation from vertex id',
    default: '1524',
  })
  @IsString()
  from: string;

  @ApiProperty({
    description: 'relation to vertex id',
    default: '233',
  })
  @IsString()
  to: string;
}

@ApiExtraModels(VertexDto, EdgeDto)
export class DataDto {
  @ApiProperty({
    description: 'List of vertices in the graph',
    type: 'array',
    items: {
      oneOf: [
        {
          $ref: getSchemaPath(VertexDto),
        },
      ],
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VertexDto)
  vertices: VertexDto[];

  @ApiProperty({
    description: 'List of edges in the graph',
    type: 'array',
    items: {
      oneOf: [
        {
          $ref: getSchemaPath(EdgeDto),
        },
      ],
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EdgeDto)
  edges: EdgeDto[];
}

class CreateGraphDto {
  @ApiProperty({
    description: 'data',
    type: 'array',
    items: {
      oneOf: [
        {
          $ref: getSchemaPath(DataDto),
        },
      ],
    },
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataDto)
  data: DataDto[];
}
