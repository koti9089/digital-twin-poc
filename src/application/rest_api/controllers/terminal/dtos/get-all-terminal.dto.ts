import { Expose, Type } from 'class-transformer';
import { TerminalDto } from './terminal.dto';
export class AllTerminalDto {
  @Expose()
  @Type(() => TerminalDto)
  _items: TerminalDto[];
}
