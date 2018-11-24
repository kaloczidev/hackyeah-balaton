import { Pagination } from '../interfaces/pagination.interface';
import { StoreId, StoreItemType } from '../interfaces/store.interface';

export class Store<T extends StoreItemType> {
  private items: Array<T>;
  private idCounter: number;

  constructor(defaultItems?: Array<T>) {
    this.items = defaultItems || [];
    this.idCounter = this.items.length;
  }

  add(item: Partial<T>): T {

    if (!item.id) item.id = this.idCounter++;

    this.items = [].concat(this.items, item);

    return this.items[this.items.length - 1];
  }

  remove(itemId: StoreId | null): number {
    const itemSizeBeforeDelete = this.items.length;

    this.items = this.items.filter(item => item.id !== itemId);

    return Math.abs(itemSizeBeforeDelete - this.items.length);
  }

  getAll(): Array<T> {
    return [...this.items];
  }

  modify(itemId: StoreId | null, data: Partial<T>): boolean {
    const itemIndex = this.items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      const modifiedItem = {...(this.items[itemIndex] as any), ...(data as any)};
      this.items = Object.assign([], this.items, {[itemIndex]: modifiedItem});
    }

    return itemIndex !== -1;
  }
}
