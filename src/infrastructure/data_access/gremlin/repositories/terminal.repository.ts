import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Terminal } from 'src/domain/terminals/terminal/terminal';
import { TerminalMapper } from '../../mappers/terminal.mapper';
import { GremlinService } from '../gremlin.service';

@Injectable()
export class TerminalRepository {
  constructor(
    private gremlinService: GremlinService,
    private terminalMapper: TerminalMapper,
  ) {}

  async createTerminal(terminal: Terminal, airportId: string) {
    const airportFound = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Airport')",
      {
        id: airportId,
      },
    );
    if (!airportFound._items.length) {
      throw new ConflictException("Airport doesn't exists");
    }

    const terminalFound = await this.gremlinService.execute(
      // "g.V('id', id).hasLabel('Floor')",
      "g.V().has('Airport', 'id', id).out('hasTerminal').has('name', name)",

      {
        id: airportId,
        name: terminal.name,
      },
    );
    if (terminalFound._items.length > 0) {
      throw new ConflictException('Terminal already exists');
    }

    const terminalId = `${terminal.name}-${terminal.id}`;
    const floorCreated = await this.gremlinService.execute(
      "g.addV(label).property('id', id).property('name', name).property('terminalId', terminalId).property('pk', 'pk')",
      {
        label: 'Terminal',
        id: terminalId,
        name: terminal.name,
        terminalId: terminal.id,
      },
    );

    // make relations of floor with building

    await this.gremlinService.execute(
      "g.V(airportId).hasLabel('Airport').addE(relationship).to(g.V(terminalId).hasLabel('Terminal'))",
      {
        airportId: airportId,
        terminalId: terminalId,
        relationship: 'hasTerminal',
      },
    );
    return this.terminalMapper.toDomain(floorCreated)[0];
  }

  async getTerminal(id: string) {
    const terminal = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Terminal')",
      {
        id,
      },
    );
    if (!terminal._items.length) {
      throw new NotFoundException('id not found');
    }
    const rooms = await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Terminal').out()",
      {
        id,
      },
    );
    terminal.rooms = rooms;
    return this.terminalMapper.toDomain(terminal)[0];
  }

  async getAllTerminals() {
    const terminals = await this.gremlinService.execute(
      "g.V().hasLabel('Terminal')",
    );
    const result = { _items: this.terminalMapper.toDomain(terminals) };
    return result;
  }

  async deleteTerminal(id: string) {
    await this.getTerminal(id);
    await this.gremlinService.execute(
      "g.V('id', id).hasLabel('Terminal').drop()",
      {
        id,
      },
    );
    return 'Deleted';
  }
}
