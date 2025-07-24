import type { MatchSummary } from '../types/cricket';
import { teams, players } from './mockData';

// Utility function to find player by name and team ID
const findPlayerByNameAndTeam = (playerName: string, teamId: string) => {
  // First try to find exact match with name and team
  const exactMatch = players.find(p => p.name === playerName && p.teamId === teamId);
  if (exactMatch) return exactMatch;
  
  // If not found, try case-insensitive match with team
  const caseInsensitiveMatch = players.find(p => 
    p.name.toLowerCase() === playerName.toLowerCase() && p.teamId === teamId
  );
  if (caseInsensitiveMatch) return caseInsensitiveMatch;
  
  // If still not found, find any player with that name (for backwards compatibility)
  const anyMatch = players.find(p => p.name === playerName || p.name.toLowerCase() === playerName.toLowerCase());
  if (anyMatch) return anyMatch;
  
  // Finally, fallback to any player from the team
  return players.find(p => p.teamId === teamId) || players[0];
};

// Sample match summary for the completed RS vs RCB match (Match 2)
export const sampleMatchSummary: MatchSummary = {
  id: 'summary-2',
  matchId: '2', // This corresponds to the completed RS vs RCB match
  title: 'Rising Stars vs Royal Challengers Bengaluru - Match 2',
  description: 'Rising Stars delivered a dominant performance at Eden Gardens, Kolkata. Rising Stars posted an impressive 71/8 in 5.0 overs with V.Kohli scoring an unbeaten 31. Royal Challengers Bengaluru were bowled out for just 20/9 in 5.0 overs, with Rising Stars securing a comprehensive 51-run victory.',
  highlights: [
    'V.Kohli\'s brilliant unbeaten 31 anchored Rising Stars\' innings',
    'N.Reddy contributed 14 runs to boost Rising Stars\' total',
    'Royal Challengers Bengaluru collapsed for just 20 runs in 5 overs',
    'Comprehensive 51-run victory for Rising Stars',
    'Dominant bowling performance restricted RCB to their lowest total'
  ],
  manOfTheMatch: {
    player: findPlayerByNameAndTeam('V.Kohli', '6'),
    reason: 'Outstanding unbeaten 31 runs that led Rising Stars to a commanding victory'
  },
  scorecard: {
    team1Innings: {
      teamId: '6', // Rising Stars
      totalRuns: 71,
      totalWickets: 8,
      totalOvers: 5,
      totalBalls: 0,
      extras: 2,
      runRate: 14.20,
      topScorers: [
        {
          player: findPlayerByNameAndTeam('V.Kohli', '6'),
          runs: 31,
          balls: 15,
          fours: 4,
          sixes: 1,
          strikeRate: 206.67,
          howOut: 'not out'
        },
        {
          player: findPlayerByNameAndTeam('N.Reddy', '6'),
          runs: 14,
          balls: 9,
          fours: 2,
          sixes: 0,
          strikeRate: 155.56,
          howOut: 'caught'
        },
        {
          player: findPlayerByNameAndTeam('R.Sharma', '6'),
          runs: 10,
          balls: 6,
          fours: 2,
          sixes: 0,
          strikeRate: 166.67,
          howOut: 'bowled'
        }
      ],
      topBowlers: [
        {
          player: players.find(p => p.name === 'A.SINGH') || players.find(p => p.teamId === '6') || players[0],
          overs: 1,
          maidens: 0,
          runs: 17,
          wickets: 3,
          economy: 17.00
        },
        {
          player: players.find(p => p.name === 'J.BUMRAH') || players.find(p => p.teamId === '6') || players[1],
          overs: 1,
          maidens: 0,
          runs: 6,
          wickets: 3,
          economy: 6.00
        },
        {
          player: players.find(p => p.name === 'K.Yadav') || players.find(p => p.teamId === '6') || players[2],
          overs: 1,
          maidens: 0,
          runs: 13,
          wickets: 1,
          economy: 13.00
        },
        {
          player: players.find(p => p.name === 'R.BISHNOI') || players.find(p => p.teamId === '6') || players[3],
          overs: 1,
          maidens: 0,
          runs: 6,
          wickets: 1,
          economy: 6.00
        }
      ],
      partnerships: []
    },
    team2Innings: {
      teamId: '1', // Royal Challengers Bengaluru
      totalRuns: 20,
      totalWickets: 9,
      totalOvers: 5,
      totalBalls: 0,
      extras: 1,
      runRate: 4.00,
      topScorers: [
        {
          player: players.find(p => p.name === 'A.Patel') || players.find(p => p.teamId === '1') || players[0],
          runs: 6,
          balls: 8,
          fours: 1,
          sixes: 0,
          strikeRate: 75.00,
          howOut: 'caught'
        },
        {
          player: players.find(p => p.name === 'S.Samson') || players.find(p => p.teamId === '1') || players[1],
          runs: 4,
          balls: 6,
          fours: 0,
          sixes: 0,
          strikeRate: 66.67,
          howOut: 'bowled'
        },
        {
          player: players.find(p => p.name === 'R.Sharma') || players.find(p => p.teamId === '1') || players[2],
          runs: 4,
          balls: 5,
          fours: 0,
          sixes: 0,
          strikeRate: 80.00,
          howOut: 'lbw'
        }
      ],
      topBowlers: [
        {
          player: players.find(p => p.name === 'H.PANDYA') || players.find(p => p.teamId === '1') || players[0],
          overs: 1,
          maidens: 0,
          runs: 4,
          wickets: 2,
          economy: 4.00
        },
        {
          player: players.find(p => p.name === 'K.Yadav') || players.find(p => p.teamId === '1') || players[1],
          overs: 1,
          maidens: 0,
          runs: 1,
          wickets: 2,
          economy: 1.00
        },
        {
          player: players.find(p => p.name === 'J.BUMRAH') || players.find(p => p.teamId === '1') || players[2],
          overs: 1,
          maidens: 0,
          runs: 4,
          wickets: 2,
          economy: 4.00
        },
        {
          player: players.find(p => p.name === 'Y.CHAHAL') || players.find(p => p.teamId === '1') || players[3],
          overs: 1,
          maidens: 0,
          runs: 4,
          wickets: 1,
          economy: 4.00
        }
      ],
      partnerships: []
    }
  },
  tossDetails: {
    winner: teams.find(t => t.id === '1') || teams[0], // Royal Challengers Bengaluru
    decision: 'bat'
  },
  umpires: ['Ravi Kumar', 'Suresh Patel']
};

// Sample match summary for the first completed match (DC vs SRH - Match 1)
export const firstMatchSummary: MatchSummary = {
  id: 'summary-1',
  matchId: '1', // This corresponds to the completed DC vs SRH match
  title: 'Deccan Chargers vs Sunrisers Hyderabad - Tournament Opener',
  description: 'The inaugural match of the RC24 Virtual Willow Championship delivered an exciting contest at Rajiv Gandhi International Stadium. Deccan Chargers posted 30/6 in 5.0 overs in their innings, with N.Reddy top-scoring with 14 runs. Sunrisers Hyderabad successfully chased down the target, reaching 34/4 in 3.4 overs to win by 6 wickets.',
  highlights: [
    'N.Reddy\'s crucial 14 runs gave DC a defendable total despite early struggles',
    'SRH chased down the target with 1.2 overs to spare',
    'A.Finch guided SRH to victory in the chase',
    'Classic T5 format match showcasing the intensity of short-format cricket',
    'Perfect start to the RC24 Virtual Willow Championship'
  ],
  manOfTheMatch: {
    player: players.find(p => p.name === 'A.Finch') || players.find(p => p.teamId === '4') || players[0],
    reason: 'Match-winning performance to guide SRH to victory in a low-scoring thriller'
  },
  scorecard: {
    team1Innings: {
      teamId: '5', // Deccan Chargers
      totalRuns: 30,
      totalWickets: 6,
      totalOvers: 5,
      totalBalls: 0,
      extras: 2,
      runRate: 6.00,
      topScorers: [
        {
          player: players.find(p => p.name === 'N.Reddy') || players.find(p => p.teamId === '5') || players[0],
          runs: 14,
          balls: 11,
          fours: 2,
          sixes: 0,
          strikeRate: 127.27,
          howOut: 'caught'
        },
        {
          player: players.find(p => p.name === 'T.Varma') || players.find(p => p.teamId === '5') || players[1],
          runs: 8,
          balls: 6,
          fours: 1,
          sixes: 0,
          strikeRate: 133.33,
          howOut: 'bowled'
        },
        {
          player: players.find(p => p.name === 'R.Pant') || players.find(p => p.teamId === '5') || players[2],
          runs: 6,
          balls: 8,
          fours: 0,
          sixes: 0,
          strikeRate: 75.00,
          howOut: 'lbw'
        }
      ],
      topBowlers: [
        {
          player: players.find(p => p.name === 'J.HAZLEWOOD') || players.find(p => p.teamId === '4') || players[0],
          overs: 1,
          maidens: 0,
          runs: 5,
          wickets: 2,
          economy: 5.00
        },
        {
          player: players.find(p => p.name === 'M.STARC') || players.find(p => p.teamId === '4') || players[1],
          overs: 1,
          maidens: 0,
          runs: 6,
          wickets: 2,
          economy: 6.00
        },
        {
          player: players.find(p => p.name === 'P.CUMMINS') || players.find(p => p.teamId === '4') || players[2],
          overs: 1,
          maidens: 0,
          runs: 2,
          wickets: 1,
          economy: 2.00
        }
      ],
      partnerships: []
    },
    team2Innings: {
      teamId: '4', // Sunrisers Hyderabad
      totalRuns: 34,
      totalWickets: 4,
      totalOvers: 3,
      totalBalls: 4,
      extras: 1,
      runRate: 10.00,
      topScorers: [
        {
          player: players.find(p => p.name === 'A.Finch') || players.find(p => p.teamId === '4') || players[0],
          runs: 12,
          balls: 8,
          fours: 2,
          sixes: 0,
          strikeRate: 150.00,
          howOut: 'not out'
        },
        {
          player: players.find(p => p.name === 'T.Head') || players.find(p => p.teamId === '4') || players[1],
          runs: 10,
          balls: 7,
          fours: 1,
          sixes: 0,
          strikeRate: 142.86,
          howOut: 'caught'
        },
        {
          player: players.find(p => p.name === 'S.Smith') || players.find(p => p.teamId === '4') || players[2],
          runs: 8,
          balls: 6,
          fours: 1,
          sixes: 0,
          strikeRate: 133.33,
          howOut: 'run out'
        }
      ],
      topBowlers: [
        {
          player: players.find(p => p.name === 'A.PATEL') || players.find(p => p.teamId === '5') || players[0],
          overs: 1,
          maidens: 0,
          runs: 10,
          wickets: 2,
          economy: 10.00
        },
        {
          player: players.find(p => p.name === 'A.SINGH') || players.find(p => p.teamId === '5') || players[1],
          overs: 1,
          maidens: 0,
          runs: 8,
          wickets: 1,
          economy: 8.00
        },
        {
          player: players.find(p => p.name === 'J.BUMRAH') || players.find(p => p.teamId === '5') || players[2],
          overs: 0.4,
          maidens: 0,
          runs: 6,
          wickets: 1,
          economy: 9.00
        }
      ],
      partnerships: []
    }
  },
  tossDetails: {
    winner: teams.find(t => t.id === '4') || teams[0], // Sunrisers Hyderabad
    decision: 'bat'
  },
  umpires: ['Ravi Kumar', 'Suresh Patel']
};

// Sample match summary for the third completed match (MI vs CSK - Match 3)
export const thirdMatchSummary: MatchSummary = {
  id: 'summary-3',
  matchId: '3', // This corresponds to the completed MI vs CSK match
  title: 'Mumbai Indians vs Chennai Super Kings - Match 3',
  description: 'Chennai Super Kings dominated the contest at Wankhede Stadium, Mumbai. CSK posted a strong 55/1 in 5.0 overs with R.Pant scoring an unbeaten 35 and T.Varma contributing 17. Mumbai Indians were restricted to just 21/6 in 5.0 overs, with CSK securing a commanding 34-run victory.',
  highlights: [
    'R.Pant\'s brilliant unbeaten 35 powered CSK to a strong total',
    'T.Varma\'s valuable 17 runs supported CSK\'s innings',
    'Mumbai Indians collapsed for just 21 runs in 5 overs',
    'Comprehensive 34-run victory for Chennai Super Kings',
    'CSK\'s disciplined bowling performance restricted MI effectively'
  ],
  manOfTheMatch: {
    player: findPlayerByNameAndTeam('R.Pant', '2'),
    reason: 'Outstanding unbeaten 35 runs that led CSK to a commanding victory'
  },
  scorecard: {
    team1Innings: {
      teamId: '2', // Chennai Super Kings
      totalRuns: 55,
      totalWickets: 1,
      totalOvers: 5,
      totalBalls: 0,
      extras: 3,
      runRate: 11.00,
      topScorers: [
        {
          player: findPlayerByNameAndTeam('R.Pant', '2'),
          runs: 35,
          balls: 15,
          fours: 4,
          sixes: 2,
          strikeRate: 233.33,
          howOut: 'not out'
        },
        {
          player: findPlayerByNameAndTeam('T.Varma', '2'),
          runs: 17,
          balls: 15,
          fours: 2,
          sixes: 0,
          strikeRate: 113.33,
          howOut: 'not out'
        },
        {
          player: findPlayerByNameAndTeam('V.Kohli', '2'),
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0,
          howOut: 'did not bat'
        },
        {
          player: findPlayerByNameAndTeam('S.Yadav', '2'),
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0,
          howOut: 'did not bat'
        }
      ],
      topBowlers: [
        {
          player: findPlayerByNameAndTeam('R.Jadeja', '3'),
          overs: 1,
          maidens: 0,
          runs: 0,
          wickets: 3,
          economy: 0.00
        },
        {
          player: findPlayerByNameAndTeam('M.Shami', '3'),
          overs: 1,
          maidens: 0,
          runs: 0,
          wickets: 1,
          economy: 0.00
        },
        {
          player: findPlayerByNameAndTeam('J.Bumrah', '3'),
          overs: 1,
          maidens: 0,
          runs: 5,
          wickets: 1,
          economy: 5.00
        },
        {
          player: findPlayerByNameAndTeam('H.Pandya', '3'),
          overs: 1,
          maidens: 0,
          runs: 9,
          wickets: 0,
          economy: 9.00
        }
      ],
      partnerships: []
    },
    team2Innings: {
      teamId: '3', // Mumbai Indians
      totalRuns: 21,
      totalWickets: 6,
      totalOvers: 5,
      totalBalls: 0,
      extras: 1,
      runRate: 4.20,
      topScorers: [
        {
          player: findPlayerByNameAndTeam('A.Patel', '3'),
          runs: 10,
          balls: 3,
          fours: 1,
          sixes: 1,
          strikeRate: 333.33,
          howOut: 'not out'
        },
        {
          player: findPlayerByNameAndTeam('T.Varma', '3'),
          runs: 4,
          balls: 6,
          fours: 0,
          sixes: 0,
          strikeRate: 66.67,
          howOut: 'not out'
        },
        {
          player: findPlayerByNameAndTeam('H.Pandya', '3'),
          runs: 4,
          balls: 12,
          fours: 0,
          sixes: 0,
          strikeRate: 33.33,
          howOut: 'caught'
        },
        {
          player: findPlayerByNameAndTeam('R.Bishnoi', '3'),
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          strikeRate: 0,
          howOut: 'did not bat'
        }
      ],
      topBowlers: [
        {
          player: findPlayerByNameAndTeam('H.Pandya', '2'),
          overs: 1,
          maidens: 0,
          runs: 1,
          wickets: 1,
          economy: 1.00
        },
        {
          player: findPlayerByNameAndTeam('T.Varma', '2'),
          overs: 1,
          maidens: 0,
          runs: 19,
          wickets: 0,
          economy: 19.00
        },
        {
          player: findPlayerByNameAndTeam('S.Yadav', '2'),
          overs: 1,
          maidens: 0,
          runs: 15,
          wickets: 0,
          economy: 15.00
        },
        {
          player: findPlayerByNameAndTeam('A.Singh', '2'),
          overs: 1,
          maidens: 0,
          runs: 10,
          wickets: 0,
          economy: 10.00
        }
      ],
      partnerships: []
    }
  },
  tossDetails: {
    winner: teams.find(t => t.id === '2') || teams[0], // Chennai Super Kings
    decision: 'bat'
  },
  umpires: ['Ravi Kumar', 'Suresh Patel']
};

// Sample match summary for the fourth completed match (DC vs SM Champions - Match 4)
export const fourthMatchSummary: MatchSummary = {
  id: 'summary-4',
  matchId: '4', // This corresponds to the completed DC vs SM Champions match
  title: 'Deccan Chargers vs SM Champions - Match 4',
  description: 'Deccan Chargers delivered a dominant bowling performance at Rajiv Gandhi International Stadium. After winning the toss and electing to bowl, DC restricted SM Champions to just 32/6 in 5.0 overs. DC then chased down the target comfortably, reaching 33/2 in just 3.4 overs to secure an emphatic 8-wicket victory.',
  highlights: [
    'DC won the toss and elected to bowl first',
    'Excellent bowling performance restricted SMC to 32/6 in 5 overs',
    'DC chased down the target with ease in just 3.4 overs',
    'Comprehensive 8-wicket victory for Deccan Chargers',
    'Dominant all-round performance from the home team'
  ],
  manOfTheMatch: {
    player: players.find(p => p.name === 'Hemanth') || players.find(p => p.teamId === '5') || players[0],
    reason: 'Outstanding captaincy and bowling performance that led DC to an 8-wicket victory'
  },
  scorecard: {
    team1Innings: {
      teamId: '5', // Deccan Chargers (chased second)
      totalRuns: 33,
      totalWickets: 2,
      totalOvers: 3,
      totalBalls: 4,
      extras: 1,
      runRate: 9.00,
      topScorers: [
        {
          player: players.find(p => p.name === 'Hemanth') || players.find(p => p.teamId === '5') || players[0],
          runs: 18,
          balls: 10,
          fours: 3,
          sixes: 0,
          strikeRate: 180.00,
          howOut: 'not out'
        },
        {
          player: players.find(p => p.name === 'T.Varma') || players.find(p => p.teamId === '5') || players[1],
          runs: 12,
          balls: 8,
          fours: 2,
          sixes: 0,
          strikeRate: 150.00,
          howOut: 'not out'
        },
        {
          player: players.find(p => p.name === 'R.Pant') || players.find(p => p.teamId === '5') || players[2],
          runs: 2,
          balls: 4,
          fours: 0,
          sixes: 0,
          strikeRate: 50.00,
          howOut: 'caught'
        }
      ],
      topBowlers: [
        {
          player: players.find(p => p.name === 'Mohammed Shami') || players.find(p => p.teamId === '7') || players[0],
          overs: 1,
          maidens: 0,
          runs: 12,
          wickets: 1,
          economy: 12.00
        },
        {
          player: players.find(p => p.name === 'Shikhar Dhawan') || players.find(p => p.teamId === '7') || players[1],
          overs: 1,
          maidens: 0,
          runs: 8,
          wickets: 1,
          economy: 8.00
        },
        {
          player: players.find(p => p.name === 'Shivamani') || players.find(p => p.teamId === '7') || players[2],
          overs: 0.4,
          maidens: 0,
          runs: 6,
          wickets: 0,
          economy: 9.00
        }
      ],
      partnerships: []
    },
    team2Innings: {
      teamId: '7', // SM Champions (batted first)
      totalRuns: 32,
      totalWickets: 6,
      totalOvers: 5,
      totalBalls: 0,
      extras: 2,
      runRate: 6.40,
      topScorers: [
        {
          player: players.find(p => p.name === 'Shikhar Dhawan') || players.find(p => p.teamId === '7') || players[0],
          runs: 15,
          balls: 12,
          fours: 2,
          sixes: 0,
          strikeRate: 125.00,
          howOut: 'caught'
        },
        {
          player: players.find(p => p.name === 'Shivamani') || players.find(p => p.teamId === '7') || players[1],
          runs: 8,
          balls: 8,
          fours: 1,
          sixes: 0,
          strikeRate: 100.00,
          howOut: 'lbw'
        },
        {
          player: players.find(p => p.name === 'Mohammed Shami') || players.find(p => p.teamId === '7') || players[2],
          runs: 5,
          balls: 6,
          fours: 0,
          sixes: 0,
          strikeRate: 83.33,
          howOut: 'bowled'
        }
      ],
      topBowlers: [
        {
          player: players.find(p => p.name === 'A.PATEL') || players.find(p => p.teamId === '5') || players[0],
          overs: 1,
          maidens: 0,
          runs: 6,
          wickets: 3,
          economy: 6.00
        },
        {
          player: players.find(p => p.name === 'A.SINGH') || players.find(p => p.teamId === '5') || players[1],
          overs: 1,
          maidens: 0,
          runs: 8,
          wickets: 2,
          economy: 8.00
        },
        {
          player: players.find(p => p.name === 'J.BUMRAH') || players.find(p => p.teamId === '5') || players[2],
          overs: 1,
          maidens: 0,
          runs: 5,
          wickets: 1,
          economy: 5.00
        },
        {
          player: players.find(p => p.name === 'T.Varma') || players.find(p => p.teamId === '5') || players[3],
          overs: 1,
          maidens: 0,
          runs: 7,
          wickets: 0,
          economy: 7.00
        }
      ],
      partnerships: []
    }
  },
  tossDetails: {
    winner: teams.find(t => t.id === '5') || teams[0], // Deccan Chargers
    decision: 'bowl'
  },
  umpires: ['Ravi Kumar', 'Suresh Patel']
};

// Store the sample summaries automatically when the module loads
import { storeSummary } from '../utils/matchSummaryStorage';
storeSummary(sampleMatchSummary);
storeSummary(firstMatchSummary);
storeSummary(thirdMatchSummary);
storeSummary(fourthMatchSummary);
