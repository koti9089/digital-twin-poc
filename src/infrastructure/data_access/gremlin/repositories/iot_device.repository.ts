import { Injectable } from '@nestjs/common';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class iotDeviceRepository {
  constructor(private gremlinService: GremlinService) {}
}
