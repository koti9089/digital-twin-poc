import { Building } from 'src/domain/buildings/building/building';

export interface ICityProps {
  id?: string;
  name: string;
  buildings?: Building[];
}
