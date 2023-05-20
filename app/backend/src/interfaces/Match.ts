export interface Match {
  id: number;
  inProgress: boolean;
}

export interface NewMatch {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}
