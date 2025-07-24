import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { calculatePointsTable } from '../utils/pointsTableCalculator';
import { useTournamentSchedule } from '../hooks/useTournamentSchedule';
import { teams } from '../data/mockData';
import TeamLogo from '../components/TeamLogo';

const PointsTable: React.FC = () => {
  const { matches } = useTournamentSchedule(teams);
  const [selectedTeamNRR, setSelectedTeamNRR] = useState<string | null>(null);
  
  // Close NRR card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedTeamNRR && !(event.target as Element)?.closest('.nrr-card-container')) {
        setSelectedTeamNRR(null);
      }
    };
    
    if (selectedTeamNRR) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedTeamNRR]);
  
  // Calculate points table based on CSV tournament data
  const pointsTable = calculatePointsTable(matches);
  
  // Function to get detailed NRR calculation for a team
  const getNRRDetails = (teamId: string) => {
    const completedMatches = matches.filter(match => match.status === 'completed');
    let runsScored = 0, ballsFaced = 0, runsConceded = 0, ballsBowled = 0;
    
    // Helper function to convert overs.balls to total balls
    const oversToTotalBalls = (overs: number) => {
      const completeOvers = Math.floor(overs);
      const extraBalls = Math.round((overs - completeOvers) * 10);
      return completeOvers * 6 + extraBalls;
    };
    
    // Match data based on actual results from CSV
    const matchResults = [
      { // Match 1: DC vs SRH (SRH won)
        teams: ['Deccan Chargers', 'Sunrisers Hyderabad'],
        scores: [
          { team: 'Deccan Chargers', runs: 30, wickets: 6, overs: 5.0 },
          { team: 'Sunrisers Hyderabad', runs: 34, wickets: 4, overs: 3.4 }
        ]
      },
      { // Match 2: RS vs RCB (RS won)
        teams: ['Rising Stars', 'Royal Challengers Bengaluru'],
        scores: [
          { team: 'Rising Stars', runs: 71, wickets: 8, overs: 5.0 },
          { team: 'Royal Challengers Bengaluru', runs: 20, wickets: 9, overs: 5.0 }
        ]
      },
      { // Match 3: MI vs CSK (CSK won)
        teams: ['Mumbai Indians', 'Chennai Super Kings'],
        scores: [
          { team: 'Mumbai Indians', runs: 21, wickets: 6, overs: 5.0 },
          { team: 'Chennai Super Kings', runs: 55, wickets: 1, overs: 5.0 }
        ]
      },
      { // Match 4: DC vs SMC (DC won)
        teams: ['Deccan Chargers', 'SM Champions'],
        scores: [
          { team: 'SM Champions', runs: 32, wickets: 6, overs: 5.0 },
          { team: 'Deccan Chargers', runs: 33, wickets: 2, overs: 3.4 }
        ]
      },
      { // Match 5: SRH vs RS (RS won)
        teams: ['Sunrisers Hyderabad', 'Rising Stars'],
        scores: [
          { team: 'Sunrisers Hyderabad', runs: 14, wickets: 5, overs: 5.0 },
          { team: 'Rising Stars', runs: 18, wickets: 3, overs: 1.2 }
        ]
      }
    ];
    
    // Find the team name from teamId
    const currentTeam = teams.find(team => team.id === teamId);
    if (!currentTeam) return { runsScored: 0, ballsFaced: 0, oversFaced: 0, runRate: 0, runsConceded: 0, ballsBowled: 0, oversBowled: 0, concededRate: 0, nrr: 0 };
    
    // Process each completed match
    completedMatches.forEach((match, matchIndex) => {
      if (matchIndex < matchResults.length) {
        const matchData = matchResults[matchIndex];
        
        // Check if current team played in this match
        const teamPlayedInMatch = match.team1?.name === currentTeam.name || match.team2?.name === currentTeam.name;
        
        if (teamPlayedInMatch) {
          // Find team's batting and bowling performance
          matchData.scores.forEach(score => {
            if (score.team === currentTeam.name) {
              // This team's batting performance
              runsScored += score.runs;
              ballsFaced += oversToTotalBalls(score.overs);
            } else {
              // Opposition's batting (this team's bowling)
              runsConceded += score.runs;
              ballsBowled += oversToTotalBalls(score.overs);
            }
          });
        }
      }
    });
    
    // Convert balls back to overs for rate calculation
    const oversFaced = ballsFaced / 6;
    const oversBowled = ballsBowled / 6;
    
    const runRate = oversFaced > 0 ? runsScored / oversFaced : 0;
    const concededRate = oversBowled > 0 ? runsConceded / oversBowled : 0;
    
    return {
      runsScored,
      ballsFaced,
      oversFaced,
      runRate,
      runsConceded,
      ballsBowled,
      oversBowled,
      concededRate,
      nrr: runRate - concededRate
    };
  };
  
  const getQualificationStatus = (position: number) => {
    // Since the tournament is still ongoing, all teams are in contention
    // Top 4 teams have better chances but are not yet qualified
    if (position <= 4) {
      return {
        color: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'In Contention (Strong Position)',
        trendIcon: 'up'
      };
    } else {
      return {
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        text: 'In Contention',
        trendIcon: 'neutral'
      };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Points Table
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Current standings in the RC24 Virtual Willow Championship
        </p>
      </div>

      {/* Qualification Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Strong Position (Top 4)
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Better chance for playoffs
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                In Contention (5-8)
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Fighting for playoff spots
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Points Table */}
      <div className="card">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-1 md:px-2 py-2 md:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  P
                </th>
                <th className="px-1 md:px-2 py-2 md:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  W
                </th>
                <th className="px-1 md:px-2 py-2 md:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  L
                </th>
                <th className="px-1 md:px-2 py-2 md:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  T
                </th>
                <th className="px-1 md:px-2 py-2 md:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pts
                </th>
                <th className="px-1 md:px-2 py-2 md:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  NRR
                </th>
                <th className="px-1 md:px-2 py-2 md:py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pointsTable.map((entry) => {
                const status = getQualificationStatus(entry.position);
                return (
                  <tr 
                    key={entry.team.id} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${status.bg}`}
                  >
                    <td className="px-2 md:px-4 py-2 md:py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-1 md:mr-2">
                          <span className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                            {entry.position}.
                          </span>
                        </div>
                        <div className="flex-shrink-0 mr-2 md:mr-3">
                          <TeamLogo team={entry.team} size="large" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate">
                            <span className="hidden sm:inline">{entry.team.name}</span>
                            <span className="sm:hidden">{entry.team.shortName}</span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
                            <span className="hidden sm:inline">{entry.team.captain} (C)</span>
                            <span className="sm:hidden">{entry.team.captain.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 md:px-2 py-2 md:py-3 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                      {entry.played}
                    </td>
                    <td className="px-1 md:px-2 py-2 md:py-3 text-center text-xs md:text-sm font-medium text-green-600 dark:text-green-400">
                      {entry.won}
                    </td>
                    <td className="px-1 md:px-2 py-2 md:py-3 text-center text-xs md:text-sm font-medium text-red-600 dark:text-red-400">
                      {entry.lost}
                    </td>
                    <td className="px-1 md:px-2 py-2 md:py-3 text-center text-xs md:text-sm font-medium text-gray-900 dark:text-white hidden md:table-cell">
                      {entry.tied}
                    </td>
                    <td className="px-1 md:px-2 py-2 md:py-3 text-center">
                      <span className="inline-flex items-center px-1 md:px-2 py-1 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                        {entry.points}
                      </span>
                    </td>
                    <td className="px-1 md:px-2 py-2 md:py-3 text-center">
                      <div className="relative nrr-card-container">
                        <div className="flex items-center justify-center space-x-1">
                          <span className={`text-xs font-medium ${
                            status.trendIcon === 'up' 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {entry.nrr > 0 ? '+' : ''}{entry.nrr.toFixed(3)}
                          </span>
                          <span className="hidden md:inline">
                            {status.trendIcon === 'up' ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-yellow-500" />
                            )}
                          </span>
                          <button
                            onClick={() => setSelectedTeamNRR(selectedTeamNRR === entry.team.id ? null : entry.team.id)}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors nrr-info-button"
                            title="View NRR calculation"
                          >
                            <Info className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                        
                        {/* NRR Calculation Card */}
                        {selectedTeamNRR === entry.team.id && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 nrr-popup-backdrop sm:absolute sm:bottom-full sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:mb-2 sm:bg-transparent sm:backdrop-blur-none sm:inset-auto sm:flex-none sm:items-start sm:justify-start sm:p-0">
                            <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs rounded-lg p-4 shadow-xl border border-gray-300 dark:border-gray-600 w-full max-w-sm sm:min-w-72 sm:max-w-none sm:w-auto max-h-[80vh] overflow-y-auto nrr-popup-mobile sm:nrr-popup-desktop">
                              <div className="text-center font-semibold mb-3 text-primary-600 dark:text-primary-400 text-sm sm:text-xs">
                                {entry.team.name} - NRR Calculation
                              </div>
                              {(() => {
                                const details = getNRRDetails(entry.team.id);
                                return (
                                  <div className="space-y-2">
                                    <div className="border-b border-gray-200 dark:border-gray-600 pb-2 mb-2">
                                      <div className="text-green-600 dark:text-green-400 font-medium mb-1 text-sm sm:text-xs">Batting:</div>
                                      <div className="text-xs space-y-1">
                                        <div>Runs Scored: {details.runsScored} in {details.oversFaced.toFixed(1)} overs</div>
                                        <div>Batting Rate: {details.runRate.toFixed(3)} runs/over</div>
                                      </div>
                                    </div>
                                    <div className="border-b border-gray-200 dark:border-gray-600 pb-2 mb-2">
                                      <div className="text-red-600 dark:text-red-400 font-medium mb-1 text-sm sm:text-xs">Bowling:</div>
                                      <div className="text-xs space-y-1">
                                        <div>Runs Conceded: {details.runsConceded} in {details.oversBowled.toFixed(1)} overs</div>
                                        <div>Conceding Rate: {details.concededRate.toFixed(3)} runs/over</div>
                                      </div>
                                    </div>
                                    <div className="text-center pt-1">
                                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        NRR = Batting Rate - Conceding Rate
                                      </div>
                                      <div className="text-yellow-600 dark:text-yellow-400 font-medium text-xs">
                                        NRR = {details.runRate.toFixed(3)} - {details.concededRate.toFixed(3)}
                                      </div>
                                      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                        = {details.nrr.toFixed(3)}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()}
                              {/* Close button */}
                              <button
                                onClick={() => setSelectedTeamNRR(null)}
                                className="absolute top-2 right-2 w-6 h-6 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                ✕
                              </button>
                              {/* Arrow - only visible on larger screens */}
                              <div className="hidden sm:block absolute top-full left-1/2 transform -translate-x-1/2">
                                <div className="border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-1 md:px-2 py-2 md:py-3 text-center hidden lg:table-cell">
                      <span className={`text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>

      {/* Points System */}
      <div className="mt-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Points System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                2 Points
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                For a Win
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                1 Point
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                For a Tie/No Result
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                0 Points
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                For a Loss
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
              Tournament Format
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              42 league matches total - Top 4 teams qualify for playoffs. 
              Net Run Rate (NRR) acts as a tiebreaker when teams are level on points.
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              <strong>NRR Calculation:</strong> (Runs scored per over) - (Runs conceded per over)
              <br />
              <em>Note: Overs like 3.4 means 3 complete overs + 4 balls (22 balls total)</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;
