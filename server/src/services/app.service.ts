import { Injectable } from '@nestjs/common';

import { measurements, types } from '../data/init-data';
import { MeasurementService } from './measurement.service';
import { TypeService } from './type.service';

@Injectable()
export class AppService {
  constructor(private measurementService: MeasurementService, private typeService: TypeService) {
  }

  public initStore(): void {
    measurements.forEach(measurement => this.measurementService.add(measurement));
    types.forEach(type => this.typeService.add(type));
  }
}
