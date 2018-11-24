import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CORSMiddleware } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CORSMiddleware);
  await app.listen(3000);
}
bootstrap();
