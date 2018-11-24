import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';

import { isNumeric, parseNumber } from '../utils';
import { Measure } from '../interfaces/measure.interface';
import { MeasureService } from '../services/measure.service';

@Controller('/api/measures')
export class MeasureController {
  private logger = new Logger('/api/measure -> MeasureController');

  constructor(private measureService: MeasureService) {
  }

  @Get()
  getMeasure(
    @Query('skip') pSkip,
    @Query('limit') pLimit,
  ): Array<Measure> {
    this.logger.log(`.getMeasure() - Query params: ${JSON.stringify({skip: pSkip, limit: pLimit})}`);

    const skip = isNumeric(pSkip) ? parseInt(pSkip, 10) : 0;
    const limit = isNumeric(pLimit) ? parseInt(pLimit, 10) : MeasureService.limit;

    return this.measureService.get({skip, limit});
  }

  @Post()
  addMeasure(@Body() newMeasure: Partial<Measure>): Measure {
    this.logger.log(`.addMeasure() - Body: ${JSON.stringify(newMeasure)}`);

    if (typeof newMeasure.type === 'string') newMeasure.type = parseNumber(newMeasure.type);

    return this.measureService.add(newMeasure);
  }

  @Put(':id')
  modifyMeasure(
    @Param('id') pId,
    @Body() data: Partial<Measure>,
  ): {updated: boolean} {
    this.logger.log(`.modifyMeasure() - Query param: ${JSON.stringify({id: pId})} - Body: ${JSON.stringify(data)}`);

    if (typeof data.type === 'string') data.type = parseNumber(data.type);

    return {updated: this.measureService.modify(isNumeric(pId) ? parseInt(pId, 10) : null, data)};
  }

  @Delete(':id')
  removeMeasure(
    @Param('id') pId,
  ): {id: number} {
    this.logger.log(`.deleteMeasure() - Query param: ${JSON.stringify({id: pId})}`);

    return {
      id: this.measureService.remove(isNumeric(pId) ? parseInt(pId, 10) : null),
    };
  }
}
