import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Terminal } from 'src/domain/terminals/terminal/terminal';
import { TerminalRepository } from 'src/infrastructure/data_access/gremlin/repositories/terminal.repository';
import { Serialize } from 'src/infrastructure/interceptors/serialize.interceptor';
import { CreateTerminalDto } from './dtos/create-terminal.dto';
import { TerminalDto } from './dtos/terminal.dto';
import { AllTerminalDto } from './dtos/get-all-terminal.dto';

@ApiTags('Terminal')
@Controller('terminal')
export class TerminalController {
  constructor(private terminalRepo: TerminalRepository) {}

  @Serialize(AllTerminalDto)
  @Get('/all')
  async getAllTerminals() {
    const terminals = await this.terminalRepo.getAllTerminals();
    return terminals;
  }

  @Serialize(TerminalDto)
  @Post()
  async createTerminal(@Body() body: CreateTerminalDto) {
    const terminal = Terminal.create(body);
    const result = await this.terminalRepo.createTerminal(
      terminal,
      body.airportId,
    );
    return result;
  }

  @Serialize(TerminalDto)
  @Get('/:id')
  async getTerminal(@Param('id') id: string) {
    return this.terminalRepo.getTerminal(id);
  }

  @Delete('/:id')
  async deleteTerminal(@Param('id') id: string) {
    return this.terminalRepo.deleteTerminal(id);
  }
}
