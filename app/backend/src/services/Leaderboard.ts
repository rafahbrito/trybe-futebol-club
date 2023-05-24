import sequelize from '../database/models';

const QUERY_GET_HOME = `SELECT 
t.team_name as name,
SUM(
    CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        ELSE 0
        END
) + SUM(
    CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
        END
) as totalPoints,
SUM(m.home_team_id = t.id) as totalGames,
SUM(
    CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 1
        ELSE 0
        END
) as totalVictories,
    SUM(
    CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
        END
) as totalDraws,
    SUM(
    CASE
        WHEN m.home_team_goals < m.away_team_goals THEN 1
        ELSE 0
        END
) as totalLosses,
SUM(m.home_team_goals) as goalsFavor,
SUM(m.away_team_goals) as goalsOwn,
SUM(m.home_team_goals) - SUM(m.away_team_goals) as goalsBalance,
ROUND(((SUM(
    CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        ELSE 0
        END
) + SUM(
    CASE
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
        END
)) / (SUM(m.home_team_id = t.id) * 3)) * 100, 2) as efficiency

FROM TRYBE_FUTEBOL_CLUBE.teams as t
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches as m
on t.id = m.home_team_id
where m.in_progress = 0
group by t.team_name
order by totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn ASC`;

const QUERY_GET_AWAY = `SELECT 
t.team_name as name,
SUM(
    CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 3
        ELSE 0
        END
) + SUM(
    CASE
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
        END
) as totalPoints,
SUM(m.away_team_id = t.id) as totalGames,
SUM(
    CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 1
        ELSE 0
        END
) as totalVictories,
    SUM(
    CASE
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
        END
) as totalDraws,
    SUM(
    CASE
        WHEN m.away_team_goals < m.home_team_goals THEN 1
        ELSE 0
        END
) as totalLosses,
SUM(m.away_team_goals) as goalsFavor,
SUM(m.home_team_goals) as goalsOwn,
SUM(m.away_team_goals) - SUM(m.home_team_goals) as goalsBalance,
ROUND(((SUM(
    CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 3
        ELSE 0
        END
) + SUM(
    CASE
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
        END
)) / (SUM(m.away_team_id = t.id) * 3)) * 100, 2) as efficiency

FROM TRYBE_FUTEBOL_CLUBE.teams as t
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches as m
on t.id = m.away_team_id
where m.in_progress = 0
group by t.team_name
order by totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn ASC`;

const QUERY_GET_ALL = `SELECT
name,
SUM(totalPoints) AS totalPoints,
SUM(totalGames) AS totalGames,
SUM(totalVictories) AS totalVictories,
SUM(totalDraws) AS totalDraws,
SUM(totalLosses) AS totalLosses,
SUM(goalsFavor) AS goalsFavor,
SUM(goalsOwn) AS goalsOwn,
SUM(goalsBalance) AS goalsBalance,
ROUND((SUM(totalPoints) / (SUM(totalGames) * 3)) * 100, 2) AS efficiency
FROM (
SELECT
  t.team_name AS name,
  SUM(
    CASE
      WHEN m.home_team_goals > m.away_team_goals THEN 3
      ELSE 0
    END
  ) + SUM(
    CASE
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalPoints,
  SUM(m.home_team_id = t.id) AS totalGames,
  SUM(
    CASE
      WHEN m.home_team_goals > m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalVictories,
  SUM(
    CASE
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalDraws,
  SUM(
    CASE
      WHEN m.home_team_goals < m.away_team_goals THEN 1
      ELSE 0
    END
  ) AS totalLosses,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
  SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance
FROM
  TRYBE_FUTEBOL_CLUBE.teams AS t
  INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m ON t.id = m.home_team_id
WHERE
  m.in_progress = 0
GROUP BY
  t.team_name
UNION
SELECT
  t.team_name AS name,
  SUM(
    CASE
      WHEN m.away_team_goals > m.home_team_goals THEN 3
      ELSE 0
    END
  ) + SUM(
    CASE
      WHEN m.away_team_goals = m.home_team_goals THEN 1
      ELSE 0
    END
  ) AS totalPoints,
  SUM(m.away_team_id = t.id) AS totalGames,
  SUM(
    CASE
      WHEN m.away_team_goals > m.home_team_goals THEN 1
      ELSE 0
    END
  ) AS totalVictories,
  SUM(
    CASE
      WHEN m.away_team_goals = m.home_team_goals THEN 1
      ELSE 0
    END
  ) AS totalDraws,
  SUM(
    CASE
      WHEN m.away_team_goals < m.home_team_goals THEN 1
      ELSE 0
    END
  ) AS totalLosses,
  SUM(m.away_team_goals) AS goalsFavor,
  SUM(m.home_team_goals) AS goalsOwn,
  SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance
FROM
  TRYBE_FUTEBOL_CLUBE.teams AS t
  INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS m ON t.id = m.away_team_id
WHERE
  m.in_progress = 0
GROUP BY
  t.team_name
) AS combinedResults
GROUP BY
name
ORDER BY
totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC,
goalsOwn ASC;
`;

export default class LeaderboardService {
  static async getAllLeaderboard() {
    return sequelize.query(QUERY_GET_ALL);
  }

  static async getHomeLeaderboard() {
    return sequelize.query(QUERY_GET_HOME);
  }

  static async getAwayLeaderboard() {
    return sequelize.query(QUERY_GET_AWAY);
  }
}
