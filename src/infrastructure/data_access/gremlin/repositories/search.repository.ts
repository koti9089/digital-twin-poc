import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SearchQueryDto } from 'src/application/rest_api/controllers/search/dtos/serach-query.dto';
import { AirportMapper } from '../../mappers/airport.mapper';
import { CityMapper } from '../../mappers/city.mapper';
import { CountryMapper } from '../../mappers/country.mapper';
import { IotDeviceMapper } from '../../mappers/iot-device.mapper';
import { RoomMapper } from '../../mappers/room.mapper';
import { StateMapper } from '../../mappers/state.mapper';
import { TerminalMapper } from '../../mappers/terminal.mapper';
import { GremlinService } from '../gremlin.service';

const mapper = {
  Country: 'countryMapper',
  State: 'countryMapper',
  City: 'cityMapper',
  Airport: 'airportMapper',
  Terminal: 'terminalMapper',
  Room: 'roomMapper',
  IotDevice: 'iotDeviceMapper',
};

@Injectable()
export class SearchRepository {
  constructor(
    private gremlinService: GremlinService,
    private countryMapper: CountryMapper,
    private StateMapper: StateMapper,
    private cityMapper: CityMapper,
    private airportMapper: AirportMapper,
    private terminalMapper: TerminalMapper,
    private roomMapper: RoomMapper,
    private iotDeviceMapper: IotDeviceMapper,
  ) {}

  async searchHierarchy(query: SearchQueryDto): Promise<any> {
    const { id, searchWithin } = query;
    const incomingEdge = await this.gremlinService.execute(
      `g.V('${id}').hasLabel('${searchWithin}').in()`,
    );

    const allOutGoingEdgesToIotDevices = await this.gremlinService.execute(
      `g.V('${id}').hasLabel('${searchWithin}').repeat(out()).emit().hasLabel('IotDevice')`,
    );

    const inEdge = await this[`${mapper[searchWithin]}`].toDomain(
      incomingEdge,
    )[0];

    const iotDevices = await this.iotDeviceMapper.toDomain(
      allOutGoingEdgesToIotDevices,
    );
    return { iotDevices, inEdge };
  }
}
