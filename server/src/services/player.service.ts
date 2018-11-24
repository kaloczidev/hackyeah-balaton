import { Injectable } from '@nestjs/common';

import { Pagination } from '../interfaces/pagination.interface';
import { Player } from '../interfaces/player.interface';
import { StoreId } from '../interfaces/store.interface';
import { Store } from '../classes/store';

@Injectable()
export class PlayerService {
  private store = new Store<Player>();
  public static limit: number = 20;

  getPlayers(options: Pagination): Array<Player> {
    return this.store.get(options);
  }

  addPlayer(player: Partial<Player>): StoreId {
    return this.store.add(player);
  }

  modifyPlayer(playerId: number | null, data: Partial<Player>): boolean {
    return this.store.modify(playerId, data);
  }

  removePlayer(playerId: number | null): number {
    return this.store.remove(playerId);
  }
}
