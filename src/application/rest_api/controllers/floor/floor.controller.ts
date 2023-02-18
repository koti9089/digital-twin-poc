import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FloorRepository } from 'src/infrastructure/data_access/gremlin/repositories/floors.repository';

@ApiTags('Floor')
@Controller('floor')
export class FloorController {
  constructor(private floorRepo: FloorRepository) {}
}
