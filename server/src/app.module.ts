import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PlayerController } from './controllers/player.controller';
import { PlayerService } from './services/player.service';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';

@Module({
  controllers: [
    AppController,
    PlayerController,
    TeamController,
  ],
  providers: [
    AppService,
    PlayerService,
    TeamService,
  ],
})
export class AppModule {}
