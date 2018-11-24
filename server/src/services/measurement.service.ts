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

  add(measurement: Partial<Measurement>): Measurement {

    if (measurement.image) {
      //const data =  measurements.image.replace(/^data:image\/png;base64,/, '');
      //require("fs").writeFile('out.png', data, 'base64', (err) => console.log(err))}
      const value = shell.exec('python3 ../recognition/__main__.py ' + measurement.image, {silent: true}).stdout;

      measurement.value = value;

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
}
