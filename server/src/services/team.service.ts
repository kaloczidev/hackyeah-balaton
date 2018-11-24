import { Injectable } from '@nestjs/common';

import { Pagination } from '../interfaces/pagination.interface';
import { StoreId } from '../interfaces/store.interface';
import { Store } from '../classes/store';
import { Team } from '../interfaces/team.interface';

@Injectable()
export class TeamService {
  private store = new Store<Team>();
  public static limit: number = 10;

  getTeams(options: Pagination): Array<Team> {
    return this.store.get(options);
  }

  addTeam(team: Partial<Team>): StoreId {
    return this.store.add(team);
  }

  modifyTeam(teamId: number | null, data: Partial<Team>): boolean {
    return this.store.modify(teamId, data);
  }

  removeTeam(teamId: number | null): number {
    return this.store.remove(teamId);
  }
}
