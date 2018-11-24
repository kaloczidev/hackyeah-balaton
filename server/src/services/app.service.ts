import { Injectable } from '@nestjs/common';

import { players, teams } from '../data/init-store';
import { PlayerService } from './player.service';
import { TeamService } from './team.service';

@Injectable()
export class AppService {
  constructor(private playerService: PlayerService, private teamService: TeamService) {
  }

  public initStore(): void {
    // add each player to the Store
    players.forEach(player => this.playerService.addPlayer(player));
    // add each team to the Store
    teams.forEach(team => this.teamService.addTeam(team));
  }
}
