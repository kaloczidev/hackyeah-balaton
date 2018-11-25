import { Injectable } from '@nestjs/common';
import * as shell from 'shelljs';

import { Measurement, MeasurementParams } from '../interfaces/measurement.interface';
import { Store } from '../classes/store';
import { measurements } from '../data/init-data';
import * as fs from 'fs';
import * as path from 'path';

const OUTFILE = 'out.jpg';
const TESSDATA_PREFIX = path.resolve(__dirname, '..', '..', '..', 'letsgodigital/');
const TESSERACT_COMMAND = 'cat ' + OUTFILE + ' | tesseract stdin stdout -l letsgodigital --dpi 75';

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
      const value = this.getValue(measurement.image);

      if (!value) {
        return <Measurement>Object.assign(measurement, {value: null});
      }

      //save and clean
      measurement.value = value;
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
    fs.writeFileSync(OUTFILE, data, 'base64');
    const recogniser = shell.exec('python3 ../recognition/__main2__.py --path ' + OUTFILE, {silent: true});
    const exec = shell.exec('export TESSDATA_PREFIX=' + TESSDATA_PREFIX + '; ' + TESSERACT_COMMAND, {silent: true});

    console.log(recogniser);
    return exec.stdout.trim();
  }
}
