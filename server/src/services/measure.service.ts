import { Injectable } from '@nestjs/common';

import { Pagination } from '../interfaces/pagination.interface';
import { Measure } from '../interfaces/measure.interface';
import { Store } from '../classes/store';
import { measures } from '../data/init-data';

@Injectable()
export class MeasureService {
  private store = new Store<Measure>(measures);
  public static limit: number = 20;

  get(options: Pagination): Array<Measure> {
    return this.store.get(options);
  }

  add(measure: Partial<Measure>): Measure {
    return this.store.add(measure);
  }

  modify(measureId: number | null, data: Partial<Measure>): boolean {
    return this.store.modify(measureId, data);
  }

  remove(measureId: number | null): number {
    return this.store.remove(measureId);
  }
}
