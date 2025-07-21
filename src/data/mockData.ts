import type { Team, Match, Player, PointsTableEntry, TournamentUpdate, LiveScore } from '../types/cricket';

export const teams: Team[] = [
  {
    id: '1',
    name: 'Royal Challengers Bengaluru',
    shortName: 'RCB',
    captain: 'Varunsai',
    coach: 'Andy Flower',
    homeGround: 'M.Chinnaswamy Stadium'
  },
  {
    id: '2',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    captain: 'Lokesh',
    coach: 'Stephen Fleming',
    homeGround: 'M.A. Chidambaram Stadium'
  },
  {
    id: '3',
    name: 'Mumbai Indians',
    shortName: 'MI',
    captain: 'Anjaneyulu',
    coach: 'Mahela Jayawardene',
    homeGround: 'Wankhede Stadium'
  },
  {
    id: '4',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    captain: 'Sharan',
    coach: 'Daniel Vettori',
    homeGround: 'Rajiv Gandhi International Stadium'
  },
  {
    id: '5',
    name: 'Deccan Chargers',
    shortName: 'DC',
    captain: 'Hemanth',
    coach: 'VVS Laxman',
    homeGround: 'Rajiv Gandhi International Stadium'
  },
  {
    id: '6',
    name: 'Rising Stars',
    shortName: 'RS',
    captain: 'Saketh',
    coach: 'Rahul Dravid',
    homeGround: 'Eden Gardens'
  },
  {
    id: '7',
    name: 'SM Champions',
    shortName: 'SMC',
    captain: 'Shivamani',
    coach: 'Anil Kumble',
    homeGround: 'PCA Stadium'
  }
];

export const players: Player[] = [
  // Royal Challengers Bengaluru
  { id: '1', name: 'Varunsai', teamId: '1', role: 'batsman', battingStyle: 'right-handed' },
  { id: '2', name: 'Glenn Maxwell', teamId: '1', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'off-break' },
  { id: '3', name: 'Faf du Plessis', teamId: '1', role: 'batsman', battingStyle: 'right-handed' },
  
  // Chennai Super Kings
  { id: '4', name: 'Lokesh', teamId: '2', role: 'wicket-keeper', battingStyle: 'right-handed' },
  { id: '5', name: 'Ravindra Jadeja', teamId: '2', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: '6', name: 'Deepak Chahar', teamId: '2', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  
  // Mumbai Indians
  { id: '7', name: 'Anjaneyulu', teamId: '3', role: 'batsman', battingStyle: 'right-handed' },
  { id: '8', name: 'Jasprit Bumrah', teamId: '3', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '9', name: 'Hardik Pandya', teamId: '3', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  
  // Sunrisers Hyderabad
  { id: '10', name: 'Sharan', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: '11', name: 'Bhuvneshwar Kumar', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: '12', name: 'Abdul Samad', teamId: '4', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'off-break' },
  
  // Deccan Chargers
  { id: '13', name: 'Hemanth', teamId: '5', role: 'batsman', battingStyle: 'left-handed' },
  { id: '14', name: 'Rashid Khan', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: '15', name: 'Kane Williamson', teamId: '5', role: 'batsman', battingStyle: 'right-handed' },
  
  // Rising Stars
  { id: '16', name: 'Saketh', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  { id: '17', name: 'Axar Patel', teamId: '6', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: '18', name: 'Prithvi Shaw', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  
  // SM Champions
  { id: '19', name: 'Shivamani', teamId: '7', role: 'wicket-keeper', battingStyle: 'right-handed' },
  { id: '20', name: 'Mohammed Shami', teamId: '7', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '21', name: 'Shikhar Dhawan', teamId: '7', role: 'batsman', battingStyle: 'left-handed' }
];

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const matches: Match[] = [
  // Match 1 - July 20 (COMPLETED)
  {
    id: '1',
    date: '2025-07-20',
    time: '15:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[4], // Deccan Chargers
    team2: teams[3], // Sunrisers Hyderabad
    status: 'completed',
    result: 'Sunrisers Hyderabad won by 6 wickets',
    winner: teams[3],
    matchType: 'group',
    overs: 20
  },
  // Match 2 - July 21 (LIVE - Current Match)
  {
    id: '2',
    date: '2025-07-21',
    time: '19:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[0], // Royal Challengers Bengaluru
    status: 'live',
    matchType: 'group',
    overs: 20
  },
  // Match 3 - July 22 (UPCOMING)
  {
    id: '3',
    date: '2025-07-22',
    time: '19:30',
    venue: 'Wankhede Stadium, Mumbai',
    team1: teams[2], // Mumbai Indians
    team2: teams[1], // Chennai Super Kings
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 4 - July 23 (UPCOMING)
  {
    id: '4',
    date: '2025-07-23',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[4], // Deccan Chargers
    team2: teams[6], // SM Champions
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 5 - July 24 (UPCOMING)
  {
    id: '5',
    date: '2025-07-24',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[3], // Sunrisers Hyderabad
    team2: teams[5], // Rising Stars
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 6 - July 25 (UPCOMING)
  {
    id: '6',
    date: '2025-07-25',
    time: '19:30',
    venue: 'M.Chinnaswamy Stadium, Bangalore',
    team1: teams[0], // Royal Challengers Bengaluru
    team2: teams[1], // Chennai Super Kings
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 7 - July 26 (Morning)
  {
    id: '7',
    date: '2025-07-26',
    time: '15:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[4], // Deccan Chargers
    team2: teams[2], // Mumbai Indians
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 8 - July 26 (Evening)
  {
    id: '8',
    date: '2025-07-26',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[3], // Sunrisers Hyderabad
    team2: teams[6], // SM Champions
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 9 - July 27 (Morning)
  {
    id: '9',
    date: '2025-07-27',
    time: '15:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[1], // Chennai Super Kings
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 10 - July 27 (Evening)
  {
    id: '10',
    date: '2025-07-27',
    time: '19:30',
    venue: 'M.Chinnaswamy Stadium, Bangalore',
    team1: teams[0], // Royal Challengers Bengaluru
    team2: teams[6], // SM Champions
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 11 - July 28
  {
    id: '11',
    date: '2025-07-28',
    time: '19:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[2], // Mumbai Indians
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 12 - July 29
  {
    id: '12',
    date: '2025-07-29',
    time: '19:30',
    venue: 'M.A. Chidambaram Stadium, Chennai',
    team1: teams[1], // Chennai Super Kings
    team2: teams[4], // Deccan Chargers
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 13 - July 30
  {
    id: '13',
    date: '2025-07-30',
    time: '19:30',
    venue: 'PCA Stadium, Mohali',
    team1: teams[6], // SM Champions
    team2: teams[2], // Mumbai Indians
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 14 - July 31
  {
    id: '14',
    date: '2025-07-31',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[3], // Sunrisers Hyderabad
    team2: teams[1], // Chennai Super Kings
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 15 - August 1
  {
    id: '15',
    date: '2025-08-01',
    time: '19:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[4], // Deccan Chargers
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  }
];

export const pointsTable: PointsTableEntry[] = [
  {
    team: teams[0], // Royal Challengers Bengaluru
    played: 6,
    won: 5,
    lost: 1,
    tied: 0,
    nrr: 1.45,
    points: 10,
    position: 1
  },
  {
    team: teams[1], // Chennai Super Kings
    played: 6,
    won: 4,
    lost: 2,
    tied: 0,
    nrr: 0.89,
    points: 8,
    position: 2
  },
  {
    team: teams[2], // Mumbai Indians
    played: 6,
    won: 4,
    lost: 2,
    tied: 0,
    nrr: 0.72,
    points: 8,
    position: 3
  },
  {
    team: teams[3], // Sunrisers Hyderabad
    played: 6,
    won: 3,
    lost: 3,
    tied: 0,
    nrr: 0.23,
    points: 6,
    position: 4
  },
  {
    team: teams[4], // Deccan Chargers
    played: 6,
    won: 2,
    lost: 4,
    tied: 0,
    nrr: -0.45,
    points: 4,
    position: 5
  },
  {
    team: teams[5], // Rising Stars
    played: 6,
    won: 2,
    lost: 4,
    tied: 0,
    nrr: -0.67,
    points: 4,
    position: 6
  },
  {
    team: teams[6], // SM Champions
    played: 6,
    won: 1,
    lost: 5,
    tied: 0,
    nrr: -1.28,
    points: 2,
    position: 7
  }
];

export const tournamentUpdates: TournamentUpdate[] = [
  {
    id: '1',
    title: 'RC24 Virtual Willow Championship Kicks Off!',
    content: 'The much-awaited RC24 Virtual Willow Championship has begun with exciting matches and outstanding performances from all teams.',
    date: '2025-07-20',
    type: 'announcement',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Sunrisers Hyderabad Win Tournament Opener',
    content: 'Sunrisers Hyderabad defeated Deccan Chargers by 7 wickets in the opening match at Rajiv Gandhi International Stadium.',
    date: '2025-07-20',
    type: 'result',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Live Now: Rising Stars vs Royal Challengers Bengaluru',
    content: 'Catch the live action as Varunsai and team take on Rising Stars at Eden Gardens. Varunsai playing a magnificent innings!',
    date: '2025-07-21',
    type: 'announcement',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Tomorrow: Mumbai Indians vs Chennai Super Kings',
    content: 'Two powerhouse teams clash tomorrow at Wankhede Stadium. Anjaneyulu vs Lokesh - a battle of the titans!',
    date: '2025-07-21',
    type: 'news',
    priority: 'medium'
  },
  {
    id: '5',
    title: 'Weather Update: Perfect Conditions Ahead',
    content: 'Clear skies and perfect cricket conditions expected for all upcoming matches this week.',
    date: '2025-07-21',
    type: 'announcement',
    priority: 'low'
  }
];

// Mock live score data - Match 2: Rising Stars vs Royal Challengers Bengaluru
export const currentLiveScore: LiveScore = {
  matchId: '2',
  currentInnings: {
    id: 'inn1',
    matchId: '2',
    battingTeam: teams[0], // Royal Challengers Bengaluru
    bowlingTeam: teams[5], // Rising Stars
    innings: 1,
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    extras: {
      byes: 0,
      legByes: 0,
      wides: 0,
      noBalls: 0,
      penalties: 0
    },
    isCompleted: false
  },
  recentBalls: [],
  currentBatsmen: {
    striker: {
      player: players[0], // Varunsai
      stats: {
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strikeRate: 0,
        isOut: false
      }
    },
    nonStriker: {
      player: players[1], // Glenn Maxwell
      stats: {
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strikeRate: 0,
        isOut: false
      }
    }
  },
  currentBowler: {
    player: players[16], // Saketh (captain bowling)
    stats: {
      overs: 0,
      maidens: 0,
      runs: 0,
      wickets: 0,
      economy: 0,
      dotBalls: 0
    }
  },
  partnership: {
    runs: 0,
    balls: 0,
    strikeRate: 0
  },
  target: 0,
  requiredRunRate: 0
};
