import { Controller, Post, Logger, Body, Get } from '@nestjs/common';
import { Picture } from '../interfaces/picture.interface';

@Controller('/api/upload')
export class UploadController {
  private logger = new Logger('/api/upload -> UploadController');

  constructor() {
  }

  @Get()
  getPicture(): { status: string } {
    return {status: 'alma'};
  }

  @Post()
  addPicture(@Body() picture: Picture): { status: string } {
    this.logger.log(`.addPicture() - Body: ${JSON.stringify(picture)}`);

    return {status: 'alma'};
  }
}
