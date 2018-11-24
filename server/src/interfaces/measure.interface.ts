import { StoreId, StoreItemType } from './store.interface';

export interface Measure extends StoreItemType {
  id: StoreId;
  type?: StoreId | null;
  time: number;
  image: string;
  value: number;
}
