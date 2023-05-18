import HttpErrorGenerator from '../helpers/httpErrorGenerator';
import TeamModel from '../database/models/Team';
import Team from '../interfaces/Team';

export default class TeamService {
  static async getAll(): Promise<Team[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  static async getById(id: number): Promise<Team | null> {
    const team = await TeamModel.findByPk(id);
    if (!team) {
      throw new HttpErrorGenerator(404, 'Team not found');
    }
    return team;
  }
}
