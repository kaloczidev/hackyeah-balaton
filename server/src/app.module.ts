import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MeasurementController } from './controllers/measurement.controller';
import { MeasurementService } from './services/measurement.service';
import { TypeController } from './controllers/type.controller';
import { TypeService } from './services/type.service';
import { UploadController } from './controllers/upload.controller';

@Module({
  controllers: [
    AppController,
    MeasurementController,
    TypeController,
    UploadController
  ],
  providers: [
    AppService,
    MeasurementService,
    TypeService,
  ],
})
export class AppModule {}
