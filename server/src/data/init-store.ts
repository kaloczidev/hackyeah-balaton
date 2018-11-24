import { Player } from '../interfaces/player.interface';
import { Team } from '../interfaces/team.interface';

export const teams: Array<Team> = [
  {
    id: 1,
    name: 'FC Barcelona',
  },
  {
    id: 2,
    name: 'Paris Saint-German',
  },
  {
    id: 3,
    name: 'Real Madrid',
  },
];

export const players: Array<Partial<Player>> = [
  {
    idTeam: teams[0].id,
    name: 'Ter Stegen',
    age: 26,
    shirtNumber: 1,
  },
  {
    idTeam: teams[0].id,
    name: 'Piqué',
    age: 31,
    shirtNumber: 3,
  },
  {
    idTeam: teams[0].id,
    name: 'Messi',
    age: 31,
    shirtNumber: 10,
  },
  {
    idTeam: teams[1].id,
    name: 'Buffon',
    age: 40,
    shirtNumber: 1,
  },
  {
    idTeam: teams[1].id,
    name: 'Neymar',
    age: 26,
    shirtNumber: 10,
  },
  {
    idTeam: teams[1].id,
    name: 'Mbappé',
    age: 20,
    shirtNumber: 7,
  },
  {
    idTeam: teams[2].id,
    name: 'Carvajal',
    age: 26,
    shirtNumber: 2,
  },
  {
    idTeam: teams[2].id,
    name: 'Sergio Ramos',
    age: 32,
    shirtNumber: 4,
  },
  {
    idTeam: teams[2].id,
    name: 'Modric',
    age: 33,
    shirtNumber: 10,
  },
];
