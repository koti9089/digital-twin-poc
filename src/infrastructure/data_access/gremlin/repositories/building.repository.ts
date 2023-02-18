import { Injectable } from '@nestjs/common';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class BuildingRepository {
  constructor(private gremlinService: GremlinService) {}
}
