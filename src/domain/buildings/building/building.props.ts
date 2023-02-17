import { Floor } from 'src/domain/floors/floor/floor';

export interface IBuildingProps {
  id?: string;
  name: string;
  address: string;
  floors?: Floor[];
}
