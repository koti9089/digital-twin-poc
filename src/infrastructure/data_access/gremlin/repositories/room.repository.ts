import { Injectable } from '@nestjs/common';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class RoomRepository {
  constructor(private gremlinService: GremlinService) {}
}
