import { State } from 'src/domain/states/state/state';

export interface ICountryProps {
  id?: string;
  name: string;
  states?: State[];
}
