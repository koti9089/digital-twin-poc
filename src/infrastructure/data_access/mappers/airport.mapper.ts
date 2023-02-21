import { Injectable } from '@nestjs/common';
import { Airport } from 'src/domain/airpots/airpot/airport';
import { Terminal } from 'src/domain/terminals/terminal/terminal';
import { TerminalMapper } from './terminal.mapper';

@Injectable()
export class AirportMapper {
  constructor(private terminalMapper: TerminalMapper) {}
  toDomain(airportResponse) {
    const terminals: Terminal[] | undefined = airportResponse.terminals
      ? this.terminalMapper.toDomain(airportResponse.terminals)
      : undefined;
    const airport = airportResponse._items.map((airport) => {
      return Airport.create({
        id: airport.id,
        name: airport.properties.name[0].value,
        address: airport.properties.address[0].value,
        terminals,
      });
    });
    return airport;
  }
}
