import { StoreId, StoreItemType } from './store.interface';

export interface Team extends StoreItemType {
  id: StoreId;
  name: string;
}
