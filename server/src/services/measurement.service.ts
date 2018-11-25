import { Injectable } from '@nestjs/common';
import * as shell from 'shelljs';

import { Measurement, MeasurementParams } from '../interfaces/measurement.interface';
import { Store } from '../classes/store';
import { measurements } from '../data/init-data';
import * as fs from 'fs';

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

  add(measurement: Partial<Measurement>): Measurement {

    if (measurement.image) {
      measurement.value = this.getValue(measurement.image);

      //clean image from the DB
      delete measurement.image;
    }

    return this.store.add(measurement);
  }

  modify(measurementsId: number | null, data: Partial<Measurement>): boolean {
    return this.store.modify(measurementsId, data);
  }

  remove(measurementsId: number | null): number {
    return this.store.remove(measurementsId);
  }

  private getValue(data): any {
    fs.writeFileSync('out.jpg', data, 'base64');
    const exec = shell.exec('python3 ../recognition/__main__.py --path ../server/out.jpg ', {silent: true});
    console.log(exec.stdout);
    return exec.stdout.trim();
  }
}
