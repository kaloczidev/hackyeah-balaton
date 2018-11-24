import { Injectable } from '@nestjs/common';

import { measures, types } from '../data/init-data';
import { MeasureService } from './measure.service';
import { TypeService } from './type.service';

@Injectable()
export class AppService {
  constructor(private measureService: MeasureService, private typeService: TypeService) {
  }

  public initStore(): void {
    measures.forEach(measure => this.measureService.add(measure));
    types.forEach(type => this.typeService.add(type));
  }
}
