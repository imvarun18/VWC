import React from 'react';
import { TrendingUp } from 'lucide-react';
import { teams } from '../data/mockData';
import TeamLogo from '../components/TeamLogo';

const Stats: React.FC = () => {

  // Calculate Orange Cap (Top Run Scoring Teams) stats
  const getOrangeCapStats = () => {
    // Team performance based on actual match scores
    const teamScores = [
      // Match 1: DC vs SRH
      { team: 'Deccan Chargers', runs: 30, overs: 5.0, matches: 1 },
      { team: 'Sunrisers Hyderabad', runs: 34, overs: 3.4, matches: 1 },
      
      // Match 2: RS vs RCB  
      { team: 'Rising Stars', runs: 71, overs: 5.0, matches: 1 },
      { team: 'Royal Challengers Bengaluru', runs: 20, overs: 5.0, matches: 1 },
      
      // Match 3: MI vs CSK
      { team: 'Mumbai Indians', runs: 21, overs: 5.0, matches: 1 },
      { team: 'Chennai Super Kings', runs: 55, overs: 5.0, matches: 1 },
      
      // Match 4: DC vs SMC (DC's second match)
      { team: 'SM Champions', runs: 32, overs: 5.0, matches: 1 },
      { team: 'Deccan Chargers', runs: 33, overs: 3.4, matches: 1 }, // DC's second innings
      
      // Match 5: SRH vs RS
      { team: 'Sunrisers Hyderabad', runs: 14, overs: 5.0, matches: 1 }, // SRH's second match
      { team: 'Rising Stars', runs: 18, overs: 1.2, matches: 1 }, // RS's second match
      
      // Match 6: RCB vs CSK
      { team: 'Chennai Super Kings', runs: 50, overs: 5.0, matches: 1 }, // CSK's second match
      { team: 'Royal Challengers Bengaluru', runs: 52, overs: 4.3, matches: 1 }, // RCB's second match
    ];

    // Aggregate runs by team
    const teamStats = teamScores.reduce((acc, score) => {
      if (!acc[score.team]) {
        acc[score.team] = {
          team: score.team,
          totalRuns: 0,
          totalOvers: 0,
          totalBalls: 0,
          matches: 0
        };
      }
      acc[score.team].totalRuns += score.runs;
      acc[score.team].totalOvers += score.overs;
      // Convert overs to balls for strike rate calculation
      const completeOvers = Math.floor(score.overs);
      const extraBalls = Math.round((score.overs - completeOvers) * 10);
      acc[score.team].totalBalls += completeOvers * 6 + extraBalls;
      acc[score.team].matches += score.matches;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(teamStats)
      .map((team: any) => ({
        ...team,
        avgRuns: team.totalRuns / team.matches,
        runRate: team.totalOvers > 0 ? team.totalRuns / team.totalOvers : 0,
        strikeRate: team.totalBalls > 0 ? (team.totalRuns / team.totalBalls) * 100 : 0,
        teamObj: teams.find(t => t.name === team.team)
      }))
      .sort((a, b) => b.totalRuns - a.totalRuns);
  };

  // Calculate Purple Cap (Top Wicket Taking Teams) stats
  const getPurpleCapStats = () => {
    // Team bowling performance based on wickets taken in each match
    const teamWickets = [
      // Match 1: DC vs SRH
      { team: 'Sunrisers Hyderabad', wickets: 6, runs: 30, overs: 5.0, matches: 1 }, // SRH took 6 DC wickets
      { team: 'Deccan Chargers', wickets: 4, runs: 34, overs: 3.4, matches: 1 }, // DC took 4 SRH wickets
      
      // Match 2: RS vs RCB
      { team: 'Rising Stars', wickets: 9, runs: 20, overs: 5.0, matches: 1 }, // RS took 9 RCB wickets
      { team: 'Royal Challengers Bengaluru', wickets: 8, runs: 71, overs: 5.0, matches: 1 }, // RCB took 8 RS wickets
      
      // Match 3: MI vs CSK
      { team: 'Chennai Super Kings', wickets: 6, runs: 21, overs: 5.0, matches: 1 }, // CSK took 6 MI wickets
      { team: 'Mumbai Indians', wickets: 1, runs: 55, overs: 5.0, matches: 1 }, // MI took 1 CSK wicket
      
      // Match 4: DC vs SMC
      { team: 'Deccan Chargers', wickets: 6, runs: 32, overs: 5.0, matches: 1 }, // DC took 6 SMC wickets (DC's second match)
      { team: 'SM Champions', wickets: 2, runs: 33, overs: 3.4, matches: 1 }, // SMC took 2 DC wickets
      
      // Match 5: SRH vs RS
      { team: 'Rising Stars', wickets: 5, runs: 14, overs: 5.0, matches: 1 }, // RS took 5 SRH wickets (RS's second match)
      { team: 'Sunrisers Hyderabad', wickets: 3, runs: 18, overs: 1.2, matches: 1 }, // SRH took 3 RS wickets (SRH's second match)
      
      // Match 6: RCB vs CSK
      { team: 'Royal Challengers Bengaluru', wickets: 9, runs: 50, overs: 5.0, matches: 1 }, // RCB took 9 CSK wickets (RCB's second match)
      { team: 'Chennai Super Kings', wickets: 1, runs: 52, overs: 4.3, matches: 1 }, // CSK took 1 RCB wicket (CSK's second match)
    ];

    // Aggregate wickets by team
    const teamStats = teamWickets.reduce((acc, bowling) => {
      if (!acc[bowling.team]) {
        acc[bowling.team] = {
          team: bowling.team,
          totalWickets: 0,
          totalRuns: 0,
          totalOvers: 0,
          totalBalls: 0,
          matches: 0
        };
      }
      acc[bowling.team].totalWickets += bowling.wickets;
      acc[bowling.team].totalRuns += bowling.runs;
      acc[bowling.team].totalOvers += bowling.overs;
      // Convert overs to balls for strike rate calculation
      const completeOvers = Math.floor(bowling.overs);
      const extraBalls = Math.round((bowling.overs - completeOvers) * 10);
      acc[bowling.team].totalBalls += completeOvers * 6 + extraBalls;
      acc[bowling.team].matches += bowling.matches;
      return acc;
    }, {} as Record<string, any>);

    return Object.values(teamStats)
      .map((team: any) => ({
        ...team,
        avgWickets: team.totalWickets / team.matches,
        economy: team.totalOvers > 0 ? team.totalRuns / team.totalOvers : 0,
        strikeRate: team.totalWickets > 0 ? team.totalBalls / team.totalWickets : 0, // Balls per wicket
        teamObj: teams.find(t => t.name === team.team)
      }))
      .sort((a, b) => b.totalWickets - a.totalWickets);
  };

  // Calculate Orange Cap and Purple Cap stats
  const orangeCapStats = getOrangeCapStats();
  const purpleCapStats = getPurpleCapStats();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
          Tournament Stats
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Orange Cap and Purple Cap standings in the RC24 Virtual Willow Championship
        </p>
      </div>

      {/* Orange Cap and Purple Cap Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Orange Cap Section */}
        <div className="card overflow-hidden relative">
          {/* Enhanced gradient background with better orange tones */}
          <div className="bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 text-white p-4 sm:p-6 relative overflow-hidden">
            {/* Glossy overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>
            
            {/* Animated gradient orbs for visual interest */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-300/30 to-orange-400/30 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-600/30 to-amber-400/30 rounded-full blur-lg opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg">
                    <img 
                      src="/orange_cap.png" 
                      alt="Orange Cap" 
                      width={40} 
                      height={40} 
                      className="object-contain drop-shadow-lg" 
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold drop-shadow-lg">Orange Cap</h2>
                    <p className="text-orange-100 drop-shadow-sm text-sm sm:text-base">Highest Team Scores</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-4xl font-bold drop-shadow-lg">{orangeCapStats[0]?.totalRuns || 0}</div>
                  <div className="text-orange-100 drop-shadow-sm text-sm sm:text-base">Runs</div>
                </div>
              </div>
              
              {/* Leader */}
              {orangeCapStats[0] && (
                <div className="flex items-center space-x-3 sm:space-x-4 bg-gradient-to-r from-white/20 to-white/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  {orangeCapStats[0].teamObj && (
                    <TeamLogo team={orangeCapStats[0].teamObj} size="medium" className="flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-lg truncate drop-shadow-sm">
                      <span className="hidden 2xl:inline">{orangeCapStats[0].teamObj?.name || orangeCapStats[0].team}</span>
                      <span className="2xl:hidden">{orangeCapStats[0].teamObj?.shortName || orangeCapStats[0].team}</span>
                    </div>
                    <div className="text-orange-100 drop-shadow-sm">{orangeCapStats[0].matches} match{orangeCapStats[0].matches > 1 ? 'es' : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg sm:text-xl drop-shadow-sm">{orangeCapStats[0].totalRuns}</div>
                    <div className="text-orange-100 text-xs sm:text-sm drop-shadow-sm">SR: {orangeCapStats[0].strikeRate.toFixed(1)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Full Leaderboard */}
          <div className="p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-base sm:text-lg">Complete Rankings</h3>
            <div className="space-y-2 sm:space-y-3">
              {orangeCapStats.map((team, index) => (
                <div key={team.team} className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                      : index === 1 
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                        : index === 2
                          ? 'bg-orange-300 dark:bg-orange-700 text-orange-800 dark:text-orange-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  {team.teamObj && (
                    <TeamLogo team={team.teamObj} size="medium" className="flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white truncate">
                      <span className="hidden 2xl:inline">{team.teamObj?.name || team.team}</span>
                      <span className="2xl:hidden">{team.teamObj?.shortName || team.team}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="hidden xs:inline">{team.matches} match{team.matches > 1 ? 'es' : ''} • Avg: {team.avgRuns.toFixed(1)}</span>
                      <span className="xs:hidden">{team.matches}M • Avg: {team.avgRuns.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{team.totalRuns} runs</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span className="hidden xs:inline">SR: {team.strikeRate.toFixed(1)} • RR: {team.runRate.toFixed(1)}</span>
                      <span className="xs:hidden">SR: {team.strikeRate.toFixed(1)}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Purple Cap Section */}
        <div className="card overflow-hidden relative">
          {/* Enhanced gradient background with better purple tones */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-500 text-white p-4 sm:p-6 relative overflow-hidden">
            {/* Glossy overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10"></div>
            
            {/* Animated gradient orbs for visual interest */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-300/30 to-indigo-400/30 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-700/30 to-indigo-600/30 rounded-full blur-lg opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg">
                    <img 
                      src="/purple_cap.png" 
                      alt="Purple Cap" 
                      width={40} 
                      height={40} 
                      className="object-contain drop-shadow-lg" 
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold drop-shadow-lg">Purple Cap</h2>
                    <p className="text-purple-100 drop-shadow-sm text-sm sm:text-base">Most Wickets Taken</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-4xl font-bold drop-shadow-lg">{purpleCapStats[0]?.totalWickets || 0}</div>
                  <div className="text-purple-100 drop-shadow-sm text-sm sm:text-base">Wickets</div>
                </div>
              </div>
              
              {/* Leader */}
              {purpleCapStats[0] && (
                <div className="flex items-center space-x-3 sm:space-x-4 bg-gradient-to-r from-white/20 to-white/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 backdrop-blur-sm border border-white/20 shadow-lg">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                    1
                  </div>
                  {purpleCapStats[0].teamObj && (
                    <TeamLogo team={purpleCapStats[0].teamObj} size="medium" className="flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-lg truncate drop-shadow-sm">
                      <span className="hidden 2xl:inline">{purpleCapStats[0].teamObj?.name || purpleCapStats[0].team}</span>
                      <span className="2xl:hidden">{purpleCapStats[0].teamObj?.shortName || purpleCapStats[0].team}</span>
                    </div>
                    <div className="text-purple-100 drop-shadow-sm">{purpleCapStats[0].matches} match{purpleCapStats[0].matches > 1 ? 'es' : ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-lg sm:text-xl drop-shadow-sm">{purpleCapStats[0].totalWickets}</div>
                    <div className="text-purple-100 text-xs sm:text-sm drop-shadow-sm">SR: {purpleCapStats[0].strikeRate.toFixed(1)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Full Leaderboard */}
          <div className="p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-base sm:text-lg">Complete Rankings</h3>
            <div className="space-y-2 sm:space-y-3">
              {purpleCapStats.map((team, index) => (
                <div key={team.team} className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 
                      ? 'bg-gradient-to-br from-indigo-400 to-purple-600 text-white' 
                      : index === 1 
                        ? 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                        : index === 2
                          ? 'bg-orange-300 dark:bg-orange-700 text-orange-800 dark:text-orange-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  {team.teamObj && (
                    <TeamLogo team={team.teamObj} size="medium" className="flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white truncate">
                      <span className="hidden 2xl:inline">{team.teamObj?.name || team.team}</span>
                      <span className="2xl:hidden">{team.teamObj?.shortName || team.team}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="hidden xs:inline">{team.matches} match{team.matches > 1 ? 'es' : ''} • Avg: {team.avgWickets.toFixed(1)}</span>
                      <span className="xs:hidden">{team.matches}M • Avg: {team.avgWickets.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{team.totalWickets} wickets</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span className="hidden xs:inline">SR: {team.strikeRate.toFixed(1)} • ER: {team.economy.toFixed(2)}</span>
                      <span className="xs:hidden">SR: {team.strikeRate.toFixed(1)}</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 sm:mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <div className="card p-3 sm:p-4 lg:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base lg:text-lg">Orange Cap Legend</h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div><strong>Total Runs:</strong> Combined runs scored by the team across all matches</div>
            <div><strong>Strike Rate:</strong> (Total Runs / Total Balls) × 100</div>
            <div><strong>Run Rate:</strong> Runs scored per over</div>
            <div><strong>Average:</strong> Average runs per match</div>
          </div>
        </div>
        
        <div className="card p-3 sm:p-4 lg:p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base lg:text-lg">Purple Cap Legend</h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div><strong>Total Wickets:</strong> Combined wickets taken by the team across all matches</div>
            <div><strong>Strike Rate:</strong> Balls bowled per wicket taken</div>
            <div><strong>Economy Rate:</strong> Runs conceded per over</div>
            <div><strong>Average:</strong> Average wickets per match</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
