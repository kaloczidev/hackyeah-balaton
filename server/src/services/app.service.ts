import { Injectable } from '@nestjs/common';

import { measurements } from '../data/init-data';
import { MeasurementService } from './measurement.service';

@Injectable()
export class AppService {
  constructor(private measurementService: MeasurementService) {
  }

  public initStore(): void {
    measurements.forEach(measurement => this.measurementService.add(measurement));
  }
}
