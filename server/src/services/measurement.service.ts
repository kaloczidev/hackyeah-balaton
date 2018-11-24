import { Injectable } from '@nestjs/common';

import { Measurement, MeasurementParams } from '../interfaces/measurement.interface';
import { Store } from '../classes/store';
import { measurements } from '../data/init-data';



@Injectable()
export class MeasurementService {
  private store = new Store<Measurement>(measurements);
  public static limit: number = 20;
  private defaultOptions = {limit: 20, skip: 0, type: null};

  get(params: MeasurementParams): Array<Measurement> {
    const options = Object.assign({}, this.defaultOptions, params);
    if (options.type) {
      return this.store.get(options).filter((item) => item.type === options.type)
    }

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
