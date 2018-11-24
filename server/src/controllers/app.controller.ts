import { Get, Controller } from '@nestjs/common';

import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {
  }

  @Get()
  root(): {[key: string]: any} {
    return {
      message: 'Welcome!',
    };
  }

  @Get('/api/init-store')
  initStore(): {[key: string]: any} {
    this.appService.initStore();

    return {
      message: 'Stores initialized',
    };
  }
}
