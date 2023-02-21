import { Terminal } from 'src/domain/terminals/terminal/terminal';

export interface IAirportProps {
  id?: string;
  name: string;
  address: string;
  terminals?: Terminal[];
}
