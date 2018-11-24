import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';

import { isNumeric } from '../utils';
import { TypeService } from '../services/type.service';
import { Type } from '../interfaces/type.interface';

@Controller('/api/types')
export class TypeController {
  private logger = new Logger('/api/types -> TypesController');

  constructor(private typeService: TypeService) {
  }

  @Get()
  getTypes(
    @Query('skip') pSkip,
    @Query('limit') pLimit,
  ): Array<Type> {
    this.logger.log(`.getType() - Query params: ${JSON.stringify({skip: pSkip, limit: pLimit})}`);

    const skip = isNumeric(pSkip) ? parseInt(pSkip, 10) : 0;
    const limit = isNumeric(pLimit) ? parseInt(pLimit, 10) : TypeService.limit;

    return this.typeService.get({skip, limit});
  }

  @Post()
  addType(
    @Body() newType: Partial<Type>,
  ): {type: Type} {
    this.logger.log(`.addType() - Body: ${JSON.stringify(newType)}`);

    return {type: this.typeService.add(newType)};
  }

  @Put(':id')
  modifyType(
    @Param('id') pId,
    @Body() data: Partial<Type>,
  ): {id: boolean} {
    this.logger.log(`.modifyType() - Query param: ${JSON.stringify({id: pId})} - Body: ${JSON.stringify(data)}`);

    const typeId = isNumeric(pId) ? parseInt(pId, 10) : null;

    return {id: this.typeService.modify(typeId, data)};
  }

  @Delete(':id')
  removeType(
    @Param('id') pId,
  ): {data: number} {
    this.logger.log(`.removeType() - Query param: ${JSON.stringify({id: pId})}`);

    return {data: this.typeService.remove(isNumeric(pId) ? parseInt(pId, 10) : null)};
  }
}
