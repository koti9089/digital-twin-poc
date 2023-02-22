import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchRepository } from 'src/infrastructure/data_access/gremlin/repositories/search.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { SearchDto } from './dtos/search.dto';
import { SearchQueryDto } from './dtos/serach-query.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly serachRepo: SearchRepository) {}

  // @Serialize(SearchDto)
  @Post()
  async searchHierarchy(@Body() body: SearchQueryDto) {
    return this.serachRepo.searchHierarchy(body);
  }
}
