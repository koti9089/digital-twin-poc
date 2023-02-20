import { City } from 'src/domain/cities/city/city';

export interface IStateProps {
  id?: string;
  name: string;
  cities?: City[];
}
