import { StoreId, StoreItemType } from './store.interface';

export interface Type extends StoreItemType {
  id: StoreId;
  name: string;
}
