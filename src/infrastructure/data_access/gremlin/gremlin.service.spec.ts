import { Test, TestingModule } from '@nestjs/testing';
import { GremlinService } from './gremlin.service';

describe('GremlinService', () => {
  let service: GremlinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GremlinService],
    }).compile();

    service = module.get<GremlinService>(GremlinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
