import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';

import { isNumeric } from '../utils';
import { TeamService } from '../services/team.service';
import { Team } from '../interfaces/team.interface';

@Controller('/api/teams')
export class TeamController {
  private logger = new Logger('/api/teams -> TeamController');

  constructor(private teamService: TeamService) {
  }

  @Get()
  getTeams(
    @Query('skip') pSkip,
    @Query('limit') pLimit,
  ): Array<Team> {
    this.logger.log(`.getTeams() - Query params: ${JSON.stringify({skip: pSkip, limit: pLimit})}`);

    const skip = isNumeric(pSkip) ? parseInt(pSkip, 10) : 0;
    const limit = isNumeric(pLimit) ? parseInt(pLimit, 10) : TeamService.limit;

    return this.teamService.getTeams({skip, limit});
  }

  @Post()
  addTeam(
    @Body() newTeam: Partial<Team>,
  ): {id: number} {
    this.logger.log(`.addTeam() - Body: ${JSON.stringify(newTeam)}`);

    const teamId = this.teamService.addTeam(newTeam);

    return {
      id: teamId,
    };
  }

  @Put(':id')
  modifyTeam(
    @Param('id') pId,
    @Body() data: Partial<Team>,
  ): {updated: boolean} {
    this.logger.log(`.modifyTeam() - Query param: ${JSON.stringify({id: pId})} - Body: ${JSON.stringify(data)}`);

    const teamId = isNumeric(pId) ? parseInt(pId, 10) : null;
    const teamUpdated = this.teamService.modifyTeam(teamId, data);

    return {
      updated: teamUpdated,
    };
  }

  @Delete(':id')
  removeTeam(
    @Param('id') pId,
  ): {affectedItems: number} {
    this.logger.log(`.removeTeam() - Query param: ${JSON.stringify({id: pId})}`);

    const teamId = isNumeric(pId) ? parseInt(pId, 10) : null;
    const numberOfDeletedTeams = this.teamService.removeTeam(teamId);

    return {
      affectedItems: numberOfDeletedTeams,
    };
  }
}
