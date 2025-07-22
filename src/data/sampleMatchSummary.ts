import type { MatchSummary } from '../types/cricket';
import { teams, players } from './mockData';

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
    player: players.find(p => p.name === 'V.Kohli') || players.find(p => p.teamId === '6') || players[0],
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
          player: players.find(p => p.name === 'V.Kohli') || players.find(p => p.teamId === '6') || players[0],
          runs: 31,
          balls: 15,
          fours: 4,
          sixes: 1,
          strikeRate: 206.67,
          howOut: 'not out'
        },
        {
          player: players.find(p => p.name === 'N.Reddy') || players.find(p => p.teamId === '6') || players[1],
          runs: 14,
          balls: 9,
          fours: 2,
          sixes: 0,
          strikeRate: 155.56,
          howOut: 'caught'
        },
        {
          player: players.find(p => p.name === 'R.Sharma') || players.find(p => p.teamId === '6') || players[2],
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

// Store the sample summaries automatically when the module loads
import { storeSummary } from '../utils/matchSummaryStorage';
storeSummary(sampleMatchSummary);
storeSummary(firstMatchSummary);
