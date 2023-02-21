import { Floor } from 'src/domain/floors/floor/floor';

export interface IAirportProps {
  id?: string;
  name: string;
  address: string;
  floors?: Floor[];
}
