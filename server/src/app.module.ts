import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MeasureController } from './controllers/measure.controller';
import { MeasureService } from './services/measure.service';
import { TypeController } from './controllers/type.controller';
import { TypeService } from './services/type.service';
import { UploadController } from './controllers/upload.controller';

@Module({
  controllers: [
    AppController,
    MeasureController,
    TypeController,
    UploadController
  ],
  providers: [
    AppService,
    MeasureService,
    TypeService,
  ],
})
export class AppModule {}
