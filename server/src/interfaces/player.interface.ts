import { StoreId, StoreItemType } from './store.interface';

export interface Player extends StoreItemType {
  id: StoreId;
  idTeam: StoreId | null;
  name: string;
  age: number;
  shirtNumber: number;
}
