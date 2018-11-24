import { Injectable } from '@nestjs/common';

import { Pagination } from '../interfaces/pagination.interface';
import { Measurement } from '../interfaces/measurement.interface';
import { Store } from '../classes/store';
import { measurements } from '../data/init-data';

@Injectable()
export class MeasurementService {
  private store = new Store<Measurement>(measurements);
  public static limit: number = 20;

  get(options: Pagination): Array<Measurement> {
    return this.store.get(options);
  }

  add(measurements: Partial<Measurement>): Measurement {
    return this.store.add(measurements);
  }

  modify(measurementsId: number | null, data: Partial<Measurement>): boolean {
    return this.store.modify(measurementsId, data);
  }

  remove(measurementsId: number | null): number {
    return this.store.remove(measurementsId);
  }
}
