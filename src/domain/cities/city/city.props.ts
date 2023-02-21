import { Airport } from 'src/domain/airpots/airpot/airport';

export interface ICityProps {
  id?: string;
  name: string;
  airports?: Airport[];
}
