import { Injectable } from '@nestjs/common';

import { Pagination } from '../interfaces/pagination.interface';
import { Store } from '../classes/store';
import { Type } from '../interfaces/type.interface';
import { types } from '../data/init-data';

@Injectable()
export class TypeService {
  private store = new Store<Type>(types);
  public static limit: number = 10;

  get(options: Pagination): Array<Type> {
    return this.store.get(options);
  }

  add(type: Partial<Type>): Type {
    return this.store.add(type);
  }

  modify(typeId: number | null, data: Partial<Type>): boolean {
    return this.store.modify(typeId, data);
  }

  remove(typeId: number | null): number {
    return this.store.remove(typeId);
  }
}
