import { Pagination } from '../interfaces/pagination.interface';
import { StoreId, StoreItemType } from '../interfaces/store.interface';

export class Store<T extends StoreItemType> {
  private items: Array<T> = [];
  private idCounter: number = 1;

  add(item: Partial<T>): StoreId {
    if (!item.id) item.id = this.idCounter++;

    this.items = [].concat(this.items, item);

    return item.id;
  }

  remove(itemId: StoreId | null): number {
    const itemSizeBeforeDelete = this.items.length;

    this.items = this.items.filter(item => item.id !== itemId);

    return Math.abs(itemSizeBeforeDelete - this.items.length);
  }

  get(options: Pagination): Array<T> {
    return this.items.slice(options.skip, (options.skip + 1) * options.limit);
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
