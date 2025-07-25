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
  { id: '1a', name: 'A.Patel', teamId: '1', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: '1b', name: 'S.Samson', teamId: '1', role: 'wicket-keeper', battingStyle: 'right-handed' },
  { id: '1c', name: 'R.Sharma', teamId: '1', role: 'batsman', battingStyle: 'right-handed' },
  { id: '1d', name: 'R.Bishnoi', teamId: '1', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: '1e', name: 'H.PANDYA', teamId: '1', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: '1f', name: 'Y.CHAHAL', teamId: '1', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  
  // Chennai Super Kings
  { id: '4', name: 'Lokesh', teamId: '2', role: 'wicket-keeper', battingStyle: 'right-handed' },
  { id: '5', name: 'Ravindra Jadeja', teamId: '2', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: '6', name: 'Deepak Chahar', teamId: '2', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: '2a', name: 'R.Pant', teamId: '2', role: 'wicket-keeper', battingStyle: 'left-handed' },
  { id: '2b', name: 'T.Varma', teamId: '2', role: 'batsman', battingStyle: 'left-handed' },
  { id: '2c', name: 'H.Pandya', teamId: '2', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: '2d', name: 'S.Yadav', teamId: '2', role: 'batsman', battingStyle: 'right-handed' },
  { id: '2e', name: 'A.Singh', teamId: '2', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '2f', name: 'V.Kohli', teamId: '2', role: 'batsman', battingStyle: 'right-handed' },
  
  // Mumbai Indians
  { id: '7', name: 'Anjaneyulu', teamId: '3', role: 'batsman', battingStyle: 'right-handed' },
  { id: '8', name: 'Jasprit Bumrah', teamId: '3', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '9', name: 'Hardik Pandya', teamId: '3', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: '3a', name: 'A.Patel', teamId: '3', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: '3b', name: 'T.Varma', teamId: '3', role: 'batsman', battingStyle: 'left-handed' },
  { id: '3c', name: 'R.Jadeja', teamId: '3', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: '3d', name: 'M.Shami', teamId: '3', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '3e', name: 'J.Bumrah', teamId: '3', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '3f', name: 'H.Pandya', teamId: '3', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: '3g', name: 'R.Bishnoi', teamId: '3', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  
  // Sunrisers Hyderabad
  { id: '10', name: 'Sharan', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: '11', name: 'Bhuvneshwar Kumar', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: '12', name: 'Abdul Samad', teamId: '4', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'off-break' },
  { id: '10a', name: 'A.Finch', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: '10b', name: 'T.Head', teamId: '4', role: 'batsman', battingStyle: 'left-handed' },
  { id: '10c', name: 'S.Smith', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: '10d', name: 'T.David', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: '10e', name: 'J.HAZLEWOOD', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '10f', name: 'M.STARC', teamId: '4', role: 'bowler', battingStyle: 'left-handed', bowlingStyle: 'left-arm-fast' },
  { id: '10g', name: 'P.CUMMINS', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '10h', name: 'N.LYON', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'off-break' },
  
  // Deccan Chargers
  { id: '13', name: 'Hemanth', teamId: '5', role: 'batsman', battingStyle: 'left-handed' },
  { id: '14', name: 'Rashid Khan', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: '15', name: 'Kane Williamson', teamId: '5', role: 'batsman', battingStyle: 'right-handed' },
  { id: '13a', name: 'N.Reddy', teamId: '5', role: 'batsman', battingStyle: 'right-handed' },
  { id: '13b', name: 'T.Varma', teamId: '5', role: 'batsman', battingStyle: 'left-handed' },
  { id: '13c', name: 'R.Pant', teamId: '5', role: 'wicket-keeper', battingStyle: 'left-handed' },
  { id: '13d', name: 'Y.Jaiswal', teamId: '5', role: 'batsman', battingStyle: 'left-handed' },
  { id: '13e', name: 'A.PATEL', teamId: '5', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: '13f', name: 'A.SINGH', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '13g', name: 'J.BUMRAH', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '13h', name: 'R.BISHNOI', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  
  // Rising Stars
  { id: '16', name: 'Saketh', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  { id: '17', name: 'Axar Patel', teamId: '6', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: '18', name: 'Prithvi Shaw', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  { id: '16a', name: 'V.Kohli', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  { id: '16b', name: 'N.Reddy', teamId: '6', role: 'all-rounder', battingStyle: 'right-handed' },
  { id: '16c', name: 'R.Sharma', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  { id: '16d', name: 'K.Yadav', teamId: '6', role: 'bowler', battingStyle: 'left-handed', bowlingStyle: 'leg-break' },
  { id: '16e', name: 'A.SINGH', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '16f', name: 'J.BUMRAH', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: '16g', name: 'R.BISHNOI', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  
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
    overs: 5
  },
  // Match 2 - July 21 (COMPLETED)
  {
    id: '2',
    date: '2025-07-21',
    time: '19:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[0], // Royal Challengers Bengaluru
    status: 'completed',
    result: 'Rising Stars won by 51 runs',
    winner: teams[5],
    matchType: 'group',
    overs: 5
  },
  // Match 3 - July 22 (COMPLETED)
  {
    id: '3',
    date: '2025-07-22',
    time: '19:30',
    venue: 'Wankhede Stadium, Mumbai',
    team1: teams[2], // Mumbai Indians
    team2: teams[1], // Chennai Super Kings
    status: 'completed',
    result: 'Chennai Super Kings won by 34 runs',
    winner: teams[1], // Chennai Super Kings
    matchType: 'group',
    overs: 5
  },
  // Match 4 - July 23 (COMPLETED)
  {
    id: '4',
    date: '2025-07-23',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[4], // Deccan Chargers
    team2: teams[6], // SM Champions
    status: 'completed',
    result: 'Deccan Chargers won by 8 wickets',
    winner: teams[4], // Deccan Chargers
    matchType: 'group',
    overs: 5
  },
  // Match 5 - July 24 (LIVE - Current Match)
  {
    id: '5',
    date: '2025-07-24',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[3], // Sunrisers Hyderabad
    team2: teams[5], // Rising Stars
    status: 'live',
    matchType: 'group',
    overs: 5
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
    content: 'Sunrisers Hyderabad defeated Deccan Chargers by 6 wickets in the thrilling T5 format opening match at Rajiv Gandhi International Stadium. SRH chased down DC\'s 30/6 with ease, reaching 34/4 in just 3.4 overs.',
    date: '2025-07-20',
    type: 'result',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Rising Stars Dominate Royal Challengers Bengaluru',
    content: 'Rising Stars delivered a commanding performance, defeating Royal Challengers Bengaluru by 51 runs in a T5 format match at Eden Gardens. V.Kohli\'s unbeaten 31 led Rising Stars to 71/8 in 5 overs, while RCB could only manage 20/9 in reply.',
    date: '2025-07-21',
    type: 'result',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Chennai Super Kings Crush Mumbai Indians',
    content: 'Chennai Super Kings delivered a dominant performance at Wankhede Stadium, defeating Mumbai Indians by 34 runs. R.Pant\'s brilliant unbeaten 35 powered CSK to 55/1 in 5 overs, while MI were restricted to just 21/6 in reply.',
    date: '2025-07-22',
    type: 'result',
    priority: 'high'
  },
  {
    id: '5',
    title: 'Deccan Chargers Dominate SM Champions',
    content: 'Deccan Chargers delivered a commanding bowling performance after winning the toss and electing to bowl. They restricted SM Champions to just 32/6 in 5 overs before chasing down the target comfortably in 3.4 overs, winning by 8 wickets.',
    date: '2025-07-23',
    type: 'result',
    priority: 'high'
  },
  {
    id: '6',
    title: 'Live Now: Sunrisers Hyderabad vs Rising Stars',
    content: 'The action continues today at Rajiv Gandhi International Stadium as Sunrisers Hyderabad take on Rising Stars. Both teams look to continue their winning momentum in this crucial T5 format encounter!',
    date: '2025-07-24',
    type: 'announcement',
    priority: 'high'
  },
  {
    id: '7',
    title: 'Weather Update: Perfect Conditions Ahead',
    content: 'Clear skies and perfect cricket conditions expected for all upcoming matches this week.',
    date: '2025-07-21',
    type: 'announcement',
    priority: 'low'
  }
];

// Mock live score data - Match 5: Sunrisers Hyderabad vs Rising Stars (Today's Live Match)
export const currentLiveScore: LiveScore = {
  matchId: '5',
  currentInnings: {
    id: 'inn1',
    matchId: '5',
    battingTeam: teams[3], // Sunrisers Hyderabad
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
      player: players.find(p => p.teamId === '4') || players[0], // SRH player
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
      player: players.find(p => p.teamId === '4' && p.name !== (players.find(p => p.teamId === '4') || players[0]).name) || players[1], // Another SRH player
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
    player: players.find(p => p.teamId === '6') || players[0], // Rising Stars bowler
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
