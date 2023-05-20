import MatchModel from '../database/models/Match';
import Team from '../database/models/Team';
import { Match, NewMatch } from '../interfaces/Match';
import HttpErrorGenerator from '../helpers/httpErrorGenerator';

export default class MatchService {
  static async getAll(): Promise<Match[]> {
    const matches = await MatchModel.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  static async getInProgress(query: string): Promise<Match[]> {
    const matches = await MatchModel.findAll({
      where: { inProgress: JSON.parse(query) },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  static async create(match: NewMatch): Promise<Match> {
    const { homeTeamId, awayTeamId } = match;
    const checkHomeTeam = await Team.findByPk(homeTeamId);
    const checkAwayTeam = await Team.findByPk(awayTeamId);
    if (!checkHomeTeam || !checkAwayTeam) {
      throw new HttpErrorGenerator(404, 'There is no team with such id!');
    }
    const newMatch = await MatchModel.create({ ...match, inProgress: true });
    return newMatch;
  }

  static async updateMatch(id: number, match: Match): Promise<Match> {
    const findMatch = await MatchModel.findByPk(id);
    if (!findMatch) throw new HttpErrorGenerator(404, 'Match not found!');
    const updatedMatch = await findMatch.update(match);
    return updatedMatch;
  }

  static async finishMatch(id: number): Promise<void> {
    const findMatch = await MatchModel.findByPk(id);
    if (!findMatch) throw new HttpErrorGenerator(404, 'Match not found!');
    await findMatch.update({ inProgress: false });
  }
}
