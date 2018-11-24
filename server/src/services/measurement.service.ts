import { Injectable } from '@nestjs/common';
import * as shell from 'shelljs';

import { Measurement, MeasurementParams } from '../interfaces/measurement.interface';
import { Store } from '../classes/store';
import { measurements } from '../data/init-data';

@Injectable()
export class MeasurementService {
  private store = new Store<Measurement>(measurements);
  private defaultOptions: MeasurementParams = {limit: 100, skip: 0, type: null};

  get(params: MeasurementParams): Array<Measurement> {
    const options = Object.assign({}, this.defaultOptions, params);
    if (options.type) {
      return this.store
        .getAll()
        .filter((item) => item.type === options.type)
        .slice(options.skip, (options.skip + 1) * options.limit)
    }

    return this.store.getAll().slice(options.skip, (options.skip + 1) * options.limit);
  }

  add(measurements: Partial<Measurement>): Measurement {
    console.log(shell.exec('python3 --version', {silent: true}).stdout);
    return this.store.add(measurements);
  }

  modify(measurementsId: number | null, data: Partial<Measurement>): boolean {
    return this.store.modify(measurementsId, data);
  }

  remove(measurementsId: number | null): number {
    return this.store.remove(measurementsId);
  }
}
