export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  captain: string;
  coach?: string;
  homeGround?: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  battingStyle: 'right-handed' | 'left-handed';
  bowlingStyle?: 'right-arm-fast' | 'left-arm-fast' | 'right-arm-medium' | 'left-arm-medium' | 'off-break' | 'leg-break' | 'left-arm-orthodox' | 'right-arm-leg-break';
}

export interface Match {
  id: string;
  date: string;
  time: string;
  venue: string;
  team1: Team;
  team2: Team;
  status: 'upcoming' | 'live' | 'completed' | 'abandoned';
  result?: string;
  winner?: Team;
  matchType: 'group' | 'quarter-final' | 'semi-final' | 'final';
  overs: number;
}

export interface Innings {
  id: string;
  matchId: string;
  battingTeam: Team;
  bowlingTeam: Team;
  innings: 1 | 2;
  score: number;
  wickets: number;
  overs: number;
  balls: number;
  extras: {
    byes: number;
    legByes: number;
    wides: number;
    noBalls: number;
    penalties: number;
  };
  isCompleted: boolean;
}

export interface Ball {
  id: string;
  inningsId: string;
  over: number;
  ball: number;
  batsman: Player;
  bowler: Player;
  runs: number;
  isWicket: boolean;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'run-out' | 'stumped' | 'hit-wicket';
  isExtra: boolean;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye';
  commentary?: string;
}

export interface PlayerStats {
  playerId: string;
  matchId: string;
  batting: {
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    isOut: boolean;
    howOut?: string;
  };
  bowling: {
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
    dotBalls: number;
  };
  fielding: {
    catches: number;
    runOuts: number;
    stumpings: number;
  };
}

export interface PointsTableEntry {
  team: Team;
  played: number;
  won: number;
  lost: number;
  tied: number;
  nrr: number;
  points: number;
  position: number;
}

export interface TournamentUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'news' | 'announcement' | 'result' | 'injury' | 'schedule-change';
  priority: 'high' | 'medium' | 'low';
  imageUrl?: string;
}

export interface LiveScore {
  matchId: string;
  currentInnings: Innings;
  recentBalls: Ball[];
  currentBatsmen: {
    striker: { player: Player; stats: PlayerStats['batting'] };
    nonStriker: { player: Player; stats: PlayerStats['batting'] };
  };
  currentBowler: { player: Player; stats: PlayerStats['bowling'] };
  partnership: {
    runs: number;
    balls: number;
    strikeRate: number;
  };
  requiredRunRate?: number;
  target?: number;
}
