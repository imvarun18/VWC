import React from 'react';
import { 
  Clock, 
  Activity,
  CheckCircle,
  Calendar,
  Trophy,
  Award,
  Play,
  TrendingUp
} from 'lucide-react';
import { getLiveMatch, getTodaysMatches, getCompletedMatches } from '../utils/dynamicSchedule';
import { currentLiveScore } from '../data/mockData';
import TeamLogo from '../components/TeamLogo';
import GlossyCard from '../components/ui/GlossyCard';

const Scorecard: React.FC = () => {
  const liveMatch = getLiveMatch();
  const todaysMatches = getTodaysMatches();
  const completedMatches = getCompletedMatches().slice(0, 3); // Show last 3 completed matches
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Live Scorecard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Follow live scores and match updates from the RC24 Virtual Willow Championship
        </p>
      </div>

      {/* Live Match Display */}
      {liveMatch && (
        <div className="mb-8">
          <GlossyCard className="p-6">
            {/* Live Match Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-500 font-bold text-lg">LIVE</span>
                </div>
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{liveMatch.time}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {liveMatch.venue}
                </span>
              </div>
            </div>

            {/* Teams and Current Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Batting Team */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TeamLogo team={currentLiveScore.currentInnings.battingTeam} size="medium" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {currentLiveScore.currentInnings.battingTeam.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Batting</p>
                  </div>
                </div>
                
                {/* Current Score */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {currentLiveScore.currentInnings.score}/{currentLiveScore.currentInnings.wickets}
                    </span>
                    <span className="text-lg text-gray-600 dark:text-gray-400">
                      ({currentLiveScore.currentInnings.overs}.{currentLiveScore.currentInnings.balls} overs)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Run Rate: 0.00 | Required: -
                  </p>
                </div>
              </div>

              {/* Bowling Team */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TeamLogo team={currentLiveScore.currentInnings.bowlingTeam} size="medium" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {currentLiveScore.currentInnings.bowlingTeam.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bowling</p>
                  </div>
                </div>

                {/* Match Status */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">Match Status</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    1st Innings - Match just started
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Target: Yet to be set
                  </p>
                </div>
              </div>
            </div>

            {/* Match Details */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Format</p>
                  <p className="font-semibold text-gray-900 dark:text-white">T5</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Overs</p>
                  <p className="font-semibold text-gray-900 dark:text-white">5 overs per side</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Toss</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Yet to happen</p>
                </div>
              </div>
            </div>
          </GlossyCard>
        </div>
      )}

      {/* No Live Match - Show Today's Matches */}
      {!liveMatch && (
        <div className="mb-8">
          <GlossyCard className="p-8 text-center">
            <Activity className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Live Match
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There are no live matches at the moment. Check out today's upcoming matches below.
            </p>
            
            {/* Today's Upcoming Matches */}
            {todaysMatches.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Matches
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todaysMatches.map((match) => (
                    <GlossyCard key={match.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {match.time}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full">
                          Yet to be played
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TeamLogo team={match.team1} size="small" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {match.team1.name}
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">vs</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {match.team2.name}
                          </span>
                          <TeamLogo team={match.team2} size="small" />
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 text-center">
                        {match.venue}
                      </div>
                    </GlossyCard>
                  ))}
                </div>
              </div>
            )}
          </GlossyCard>
        </div>
      )}

      {/* Recent Completed Matches */}
      {completedMatches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6 flex items-center tracking-tight">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            Recent Match Results
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {completedMatches.map((match) => (
              <div key={match.id} className="relative group">
                {/* Modern Match Result Card */}
                <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  
                  {/* Background Texture/Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-primary-100/20 dark:from-primary-900/10 dark:via-transparent dark:to-primary-800/10"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-100/20 to-transparent dark:from-primary-800/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary-200/20 to-transparent dark:from-primary-700/20 rounded-full blur-lg"></div>
                  
                  <div className="relative z-10">
                    {/* Header with Time and Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          {match.time}
                        </span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-500 text-white rounded-full font-semibold tracking-wide shadow-md">
                        COMPLETED
                      </span>
                    </div>
                    
                    {/* Teams Section */}
                    <div className="flex items-center justify-center mb-4">
                      {/* Team 1 */}
                      <div className="flex flex-col items-center space-y-1">
                        <div className="relative">
                          <TeamLogo team={match.team1} size="large" className="drop-shadow-lg" />
                          {match.winner?.id === match.team1.id && (
                            <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                              <Trophy className="w-2.5 h-2.5 text-yellow-800" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* VS Divider */}
                      <div className="mx-4 flex flex-col items-center">
                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                        <span className="text-gray-400 dark:text-gray-500 text-xs font-light tracking-wider py-1">
                          vs
                        </span>
                        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                      </div>
                      
                      {/* Team 2 */}
                      <div className="flex flex-col items-center space-y-1">
                        <div className="relative">
                          <TeamLogo team={match.team2} size="large" className="drop-shadow-lg" />
                          {match.winner?.id === match.team2.id && (
                            <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                              <Trophy className="w-2.5 h-2.5 text-yellow-800" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Match Result - The Key Feature */}
                    {match.result && (
                      <div className="mb-4">
                        <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 dark:from-orange-600 dark:via-orange-500 dark:to-yellow-500 rounded-lg p-3 shadow-lg">
                          <div className="flex items-center justify-center space-x-2">
                            <Award className="w-4 h-4 text-white drop-shadow-lg" />
                            <p className="text-sm font-bold text-white text-center drop-shadow-md tracking-wide">
                              {match.result}
                            </p>
                            <Award className="w-4 h-4 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mb-3"></div>
                    
                    {/* Stadium and Date */}
                    <div className="text-center space-y-0.5">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {match.venue}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(match.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Matches Message */}
      {!liveMatch && todaysMatches.length === 0 && completedMatches.length === 0 && (
        <GlossyCard className="p-8 text-center">
          <Activity className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Matches Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            There are no matches to display at the moment. Check back later for updates.
          </p>
        </GlossyCard>
      )}
    </div>
  );
};

export default Scorecard;
