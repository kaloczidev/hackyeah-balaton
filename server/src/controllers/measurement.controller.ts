import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';

import { isNumeric, parseNumber } from '../utils';
import { Measurement } from '../interfaces/measurement.interface';
import { MeasurementService } from '../services/measurement.service';

@Controller('/api/measurements')
export class MeasurementController {
  private logger = new Logger('/api/measurements -> MeasureController');

  constructor(private measurementsService: MeasurementService) {
  }

  @Get()
  getMeasure(
    @Query('skip') pSkip,
    @Query('limit') pLimit,
  ): Array<Measurement> {
    this.logger.log(`.getMeasure() - Query params: ${JSON.stringify({skip: pSkip, limit: pLimit})}`);

    const skip = isNumeric(pSkip) ? parseInt(pSkip, 10) : 0;
    const limit = isNumeric(pLimit) ? parseInt(pLimit, 10) : MeasurementService.limit;

    return this.measurementsService.get({skip, limit});
  }

  @Post()
  addMeasure(@Body() newMeasure: Partial<Measurement>): Measurement {
    this.logger.log(`.addMeasure() - Body: ${JSON.stringify(newMeasure)}`);

    if (typeof newMeasure.type === 'string') newMeasure.type = parseNumber(newMeasure.type);

    return this.measurementsService.add(newMeasure);
  }

  @Put(':id')
  modifyMeasure(
    @Param('id') pId,
    @Body() data: Partial<Measurement>,
  ): {updated: boolean} {
    this.logger.log(`.modifyMeasure() - Query param: ${JSON.stringify({id: pId})} - Body: ${JSON.stringify(data)}`);

    if (typeof data.type === 'string') data.type = parseNumber(data.type);

    return {updated: this.measurementsService.modify(isNumeric(pId) ? parseInt(pId, 10) : null, data)};
  }

  @Delete(':id')
  removeMeasure(
    @Param('id') pId,
  ): {id: number} {
    this.logger.log(`.deleteMeasure() - Query param: ${JSON.stringify({id: pId})}`);

    return {
      id: this.measurementsService.remove(isNumeric(pId) ? parseInt(pId, 10) : null),
    };
  }
}
