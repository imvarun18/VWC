import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Target, 
  Clock,
  TrendingUp,
  Play
} from 'lucide-react';
import { currentLiveScore, teams } from '../data/mockData';
import { getTodaysMatches, getLiveMatch, getUpcomingMatches } from '../utils/dynamicSchedule';
import { getTopTeams } from '../utils/pointsTableCalculator';
import TeamLogo from '../components/TeamLogo';
import TournamentLogo from '../components/TournamentLogo';
import GlossyCard from '../components/ui/GlossyCard';

const Home: React.FC = () => {
  const todaysMatches = getTodaysMatches();
  const liveMatch = getLiveMatch();
  const upcomingMatches = getUpcomingMatches().slice(0, 2); // Show next 2 upcoming matches
  const topTeams = getTopTeams(4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with enhanced gradients */}
      <div className="relative bg-gradient-hero dark:bg-gradient-hero-dark rounded-3xl p-8 mb-8 text-white overflow-hidden shadow-2xl">
        {/* Hero background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent dark:from-white/10 dark:via-white/2 dark:to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <TournamentLogo size="xlarge" className="mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 drop-shadow-lg tracking-tight">
            RC24 Virtual Willow Championship
          </h1>
          
          {/* Teams Section */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-6">
              {teams.map((team) => (
                <div key={team.id} className="group transition-all duration-300 transform hover:scale-110">
                  <div className="relative">
                    <TeamLogo team={team} size="large" className="drop-shadow-lg" />
                    {/* Team glow effect on hover */}
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xl md:text-2xl font-bold mb-8 opacity-95 drop-shadow-2xl text-shadow-lg font-body leading-relaxed tracking-wide">
            Season 2 awaits! Uniting the Best Teams in Virtual Willow!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/scorecard"
              className="group relative px-6 py-3 bg-white/20 border border-white/30 text-white hover:bg-white/30 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl"
            >
              <div className="relative z-10 flex items-center justify-center drop-shadow-lg">
                <Play className="w-4 h-4 mr-2" />
                Live Scorecard
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"></div>
              </div>
            </Link>
            <Link
              to="/schedule"
              className="group relative px-6 py-3 bg-white/20 border border-white/30 text-white hover:bg-white/30 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl"
            >
              <div className="relative z-10 flex items-center justify-center drop-shadow-lg">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"></div>
              </div>
            </Link>
            <a
              href="https://triseries.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-300/50 text-white hover:from-yellow-400/40 hover:to-orange-400/40 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl"
            >
              <div className="relative z-10 flex items-center justify-center drop-shadow-lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Season 1 ↗
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Live Match Section */}
      {liveMatch && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center tracking-tight">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
              Live Match
            </h2>
            <Link
              to="/scorecard"
              className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
            >
              View Full Scorecard →
            </Link>
          </div>
          
          <GlossyCard hover glow className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-2">
                    <TeamLogo team={liveMatch.team1} size="medium" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {liveMatch.team1.name}
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">vs</span>
                  <div className="flex items-center space-x-2">
                    <TeamLogo team={liveMatch.team2} size="medium" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {liveMatch.team2.name}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {liveMatch.venue} • {liveMatch.time}
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentLiveScore.currentInnings.score}/{currentLiveScore.currentInnings.wickets}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  ({currentLiveScore.currentInnings.overs}.{currentLiveScore.currentInnings.balls} overs)
                </div>
                <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  {currentLiveScore.target && currentLiveScore.target > 0 
                    ? `Need ${currentLiveScore.target - currentLiveScore.currentInnings.score} runs`
                    : 'Yet to be played'
                  }
                </div>
              </div>
            </div>
          </GlossyCard>
        </div>
      )}

      {/* Today's Matches */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            Today's Matches
          </h2>
          <Link
            to="/schedule"
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
          >
            View All Matches →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todaysMatches.map((match) => (
            <GlossyCard key={match.id} hover className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {match.time}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  match.status === 'live' 
                    ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    : match.status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                }`}>
                  {match.status === 'live' && <div className="w-2 h-2 bg-red-500 rounded-full inline-block mr-1 animate-pulse"></div>}
                  {match.status.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <TeamLogo team={match.team1} size="small" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {match.team1.name}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <TeamLogo team={match.team2} size="small" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {match.team2.name}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {match.venue}
                </p>
                {match.result && (
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">
                    {match.result}
                  </p>
                )}
              </div>
            </GlossyCard>
          ))}
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            Upcoming Matches
          </h2>
          <Link
            to="/schedule"
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
          >
            View Full Schedule →
          </Link>
        </div>
        
        {upcomingMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingMatches.map((match) => (
              <GlossyCard key={match.id} hover className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div>{new Date(match.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</div>
                      <div className="text-xs">{match.time}</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    UPCOMING
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <TeamLogo team={match.team1} size="small" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {match.team1.name}
                      </span>
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-500 dark:text-gray-500 py-1">
                    vs
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <TeamLogo team={match.team2} size="small" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {match.team2.name}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {match.venue}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Match {match.id}
                    </span>
                    <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                      {new Date(match.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </GlossyCard>
            ))}
          </div>
        ) : (
          <GlossyCard className="p-8 text-center">
            <Calendar className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Upcoming Matches
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All tournament matches have been completed or are currently in progress.
            </p>
          </GlossyCard>
        )}
      </div>

      {/* Points Table Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white tracking-tight">
            Points Table
          </h2>
          <Link
            to="/points-table"
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
          >
            View Full Table →
          </Link>
        </div>
        
        <GlossyCard hover className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Played
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Won
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    NRR
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {topTeams.map((entry, index) => (
                  <tr key={entry.team.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                            {index + 1}
                          </span>
                        </div>
                        <TeamLogo team={entry.team} size="small" className="mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {entry.team.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                      {entry.played}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                      {entry.won}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                        {entry.points}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900 dark:text-white">
                      <span className={entry.nrr >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                        {entry.nrr > 0 ? '+' : ''}{entry.nrr.toFixed(3)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlossyCard>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlossyCard hover className="p-6 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            7 Teams
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Competing for the championship title
          </p>
        </GlossyCard>
        
        <GlossyCard hover className="p-6 text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            42 Matches
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Action-packed tournament schedule
          </p>
        </GlossyCard>
        
        <GlossyCard hover className="p-6 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Live Updates
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Real-time scores and statistics
          </p>
        </GlossyCard>
      </div>
    </div>
  );
};

export default Home;
