import type { MatchSummary } from '../types/cricket';

/**
 * Load match summary from JSON file in the match-summaries folder
 */
export const loadMatchSummaryFromJson = async (matchId: string): Promise<MatchSummary | null> => {
  try {
    const response = await fetch(`/data/match-summaries/match_${matchId}_scorecard.json`);
    if (!response.ok) {
      console.warn(`Match summary file not found for match ${matchId}`);
      return null;
    }
    
    const jsonData = await response.json();
    
    // Convert JSON format to MatchSummary format
    const matchSummary: MatchSummary = {
      id: jsonData.id,
      matchId: jsonData.matchId,
      title: jsonData.title,
      description: jsonData.description,
      highlights: jsonData.highlights,
      manOfTheMatch: {
        player: {
          id: jsonData.manOfTheMatch.playerId,
          name: jsonData.manOfTheMatch.playerName,
          teamId: jsonData.manOfTheMatch.teamId,
          role: 'batsman', // Default role
          battingStyle: 'right-handed' // Default style
        },
        reason: jsonData.manOfTheMatch.reason
      },
      scorecard: {
        team1Innings: {
          teamId: jsonData.scorecard.team1Innings.teamId,
          totalRuns: jsonData.scorecard.team1Innings.totalRuns,
          totalWickets: jsonData.scorecard.team1Innings.totalWickets,
          totalOvers: jsonData.scorecard.team1Innings.totalOvers,
          totalBalls: jsonData.scorecard.team1Innings.totalBalls,
          extras: jsonData.scorecard.team1Innings.extras,
          runRate: jsonData.scorecard.team1Innings.runRate,
          topScorers: jsonData.scorecard.team1Innings.battingOrder?.slice(0, 3).map((batsman: any) => ({
            player: {
              id: batsman.playerId,
              name: batsman.playerName,
              teamId: jsonData.scorecard.team1Innings.teamId,
              role: 'batsman',
              battingStyle: 'right-handed'
            },
            runs: batsman.runs,
            balls: batsman.balls,
            fours: batsman.fours,
            sixes: batsman.sixes,
            strikeRate: batsman.strikeRate,
            howOut: batsman.howOut
          })) || [],
          topBowlers: jsonData.scorecard.team1Innings.bowlingFigures?.slice(0, 3).map((bowler: any) => ({
            player: {
              id: bowler.playerId,
              name: bowler.playerName,
              teamId: jsonData.scorecard.team2Innings.teamId,
              role: 'bowler',
              battingStyle: 'right-handed'
            },
            overs: bowler.overs,
            maidens: bowler.maidens,
            runs: bowler.runs,
            wickets: bowler.wickets,
            economy: bowler.economy
          })) || [],
          partnerships: []
        },
        team2Innings: {
          teamId: jsonData.scorecard.team2Innings.teamId,
          totalRuns: jsonData.scorecard.team2Innings.totalRuns,
          totalWickets: jsonData.scorecard.team2Innings.totalWickets,
          totalOvers: jsonData.scorecard.team2Innings.totalOvers,
          totalBalls: jsonData.scorecard.team2Innings.totalBalls,
          extras: jsonData.scorecard.team2Innings.extras,
          runRate: jsonData.scorecard.team2Innings.runRate,
          topScorers: jsonData.scorecard.team2Innings.battingOrder?.slice(0, 3).map((batsman: any) => ({
            player: {
              id: batsman.playerId,
              name: batsman.playerName,
              teamId: jsonData.scorecard.team2Innings.teamId,
              role: 'batsman',
              battingStyle: 'right-handed'
            },
            runs: batsman.runs,
            balls: batsman.balls,
            fours: batsman.fours,
            sixes: batsman.sixes,
            strikeRate: batsman.strikeRate,
            howOut: batsman.howOut
          })) || [],
          topBowlers: jsonData.scorecard.team2Innings.bowlingFigures?.slice(0, 3).map((bowler: any) => ({
            player: {
              id: bowler.playerId,
              name: bowler.playerName,
              teamId: jsonData.scorecard.team1Innings.teamId,
              role: 'bowler',
              battingStyle: 'right-handed'
            },
            overs: bowler.overs,
            maidens: bowler.maidens,
            runs: bowler.runs,
            wickets: bowler.wickets,
            economy: bowler.economy
          })) || [],
          partnerships: []
        }
      },
      tossDetails: {
        winner: {
          id: jsonData.tossDetails?.winnerId || '',
          name: jsonData.tossDetails?.winnerName || '',
          shortName: jsonData.teams?.team1?.shortName || '',
          captain: ''
        },
        decision: jsonData.tossDetails?.decision || 'bat'
      },
      umpires: jsonData.officials?.umpires || ['TBA', 'TBA']
    };

    return matchSummary;
  } catch (error) {
    console.error(`Error loading match summary for match ${matchId}:`, error);
    return null;
  }
};

/**
 * Load all available match summaries from JSON files
 */
export const loadAllMatchSummariesFromJson = async (): Promise<MatchSummary[]> => {
  const summaries: MatchSummary[] = [];
  
  // Try to load match summaries for matches 1-42 (or whatever max matches you have)
  for (let matchId = 1; matchId <= 42; matchId++) {
    const summary = await loadMatchSummaryFromJson(matchId.toString());
    if (summary) {
      summaries.push(summary);
    }
  }
  
  return summaries;
};
