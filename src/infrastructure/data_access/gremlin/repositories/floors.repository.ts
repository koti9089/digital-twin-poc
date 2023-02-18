import { Injectable } from '@nestjs/common';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class FloorRepository {
  constructor(private gremlinService: GremlinService) {}
}
