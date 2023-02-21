import { Expose, Type } from 'class-transformer';
import { TerminalDto } from '../../terminal/dtos/terminal.dto';
export class AirportDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  @Type(() => TerminalDto)
  terminals?: TerminalDto[];
}
