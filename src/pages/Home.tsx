import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Target, 
  Clock,
  TrendingUp,
  Play
} from 'lucide-react';
import { teams } from '../data/mockData';
import { useTournamentSchedule } from '../hooks/useTournamentSchedule';
import { calculatePointsTable } from '../utils/pointsTableCalculator';
import { parseISO, isToday } from 'date-fns';
import TeamLogo from '../components/TeamLogo';
import TournamentLogo from '../components/TournamentLogo';
import GlossyCard from '../components/ui/GlossyCard';
import type { Match } from '../types/cricket';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { matches } = useTournamentSchedule(teams);
  
  // Get today's matches, live match, and upcoming matches from CSV data
  const todaysMatches = matches.filter((match: Match) => isToday(parseISO(match.date)));
  const liveMatchByStatus = matches.find((match: Match) => match.status === 'live');
  
  // If no live match found by status, use the first today's match
  const liveMatch = liveMatchByStatus || todaysMatches[0];
  
  const upcomingMatches = matches
    .filter((match: Match) => match.status === 'upcoming')
    .slice(0, 2); // Show next 2 upcoming matches
  const pointsTable = calculatePointsTable(matches);
  const topTeams = pointsTable.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with enhanced gradients */}
      <div className="relative bg-gradient-hero dark:bg-gradient-hero-dark rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 text-white overflow-hidden shadow-2xl">
        {/* Hero background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent dark:from-white/10 dark:via-white/2 dark:to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <TournamentLogo size="xlarge" className="mx-auto" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6 drop-shadow-lg tracking-tight">
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
          
          <p className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 opacity-95 drop-shadow-2xl text-shadow-lg font-body leading-relaxed tracking-wide">
            Season 2 awaits! Uniting the Best Teams in Virtual Willow!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/scorecard"
              className="group relative px-4 py-2.5 sm:px-6 sm:py-3 bg-white/20 border border-white/30 text-white hover:bg-white/30 rounded-xl transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.96] hover:scale-[1.02] md:hover:scale-[1.01] backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl mobile-touch"
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
              className="group relative px-4 py-2.5 sm:px-6 sm:py-3 bg-white/20 border border-white/30 text-white hover:bg-white/30 rounded-xl transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.96] hover:scale-[1.02] md:hover:scale-[1.01] backdrop-blur-sm overflow-hidden shadow-xl hover:shadow-2xl mobile-touch"
            >
              <div className="relative z-10 flex items-center justify-center drop-shadow-lg">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"></div>
              </div>
            </Link>
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
          
          <div 
            onClick={() => navigate('/scorecard')}
            className="cursor-pointer transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.98] hover:scale-[1.01] mobile-touch"
          >
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
                  0/0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  (0.0 overs)
                </div>
                <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                  Yet to be played
                </div>
              </div>
            </div>
          </GlossyCard>
          </div>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {todaysMatches.map((match) => (
            <div 
              key={match.id} 
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white/95 to-gray-50/50 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.98] hover:scale-[1.01] mobile-touch"
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Status Indicator Bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${
                match.status === 'live' 
                  ? 'bg-gradient-to-r from-red-500 via-red-400 to-red-500' 
                  : match.status === 'completed'
                  ? 'bg-gradient-to-r from-green-500 via-green-400 to-green-500'
                  : 'bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500'
              }`}></div>

              <div className="relative p-4">
                {/* Match Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm">
                    <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {match.time}
                    </span>
                  </div>
                  
                  <div className={`relative px-2 py-0.5 rounded-full text-xs font-medium border-2 transition-all duration-300 ${
                    match.status === 'live' 
                      ? 'border-red-500 text-red-600 dark:text-red-400 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20'
                      : match.status === 'completed'
                      ? 'border-green-500 text-green-600 dark:text-green-400 bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20'
                      : 'border-blue-500 text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}>
                    {match.status === 'live' && (
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
                    )}
                    {match.status.toUpperCase()}
                  </div>
                </div>

                {/* Teams Section - Horizontal Layout */}
                <div className="flex items-center justify-between mb-4">
                  {/* Team 1 */}
                  <div className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 flex-1 ${
                    match.winner?.id === match.team1.id 
                      ? 'bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 ring-1 ring-green-200 dark:ring-green-700' 
                      : 'bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/50'
                  }`}>
                    <TeamLogo team={match.team1} size="medium" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center leading-tight mt-2">
                      {match.team1.name}
                    </h3>
                    {match.winner?.id === match.team1.id && (
                      <div className="absolute -top-1 -right-1">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                          W
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* VS Divider */}
                  <div className="flex items-center justify-center mx-3">
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md transform group-hover:scale-105 transition-transform duration-300">
                      VS
                    </div>
                  </div>
                  
                  {/* Team 2 */}
                  <div className={`relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 flex-1 ${
                    match.winner?.id === match.team2.id 
                      ? 'bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20 ring-1 ring-green-200 dark:ring-green-700' 
                      : 'bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/50'
                  }`}>
                    <TeamLogo team={match.team2} size="medium" />
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center leading-tight mt-2">
                      {match.team2.name}
                    </h3>
                    {match.winner?.id === match.team2.id && (
                      <div className="absolute -top-1 -right-1">
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                          W
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Venue Information */}
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-3 h-3 text-gray-500 dark:text-gray-400 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center truncate">
                    {match.venue}
                  </p>
                </div>

                {/* Result */}
                {match.result && (
                  <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
                      <p className="text-sm font-bold text-primary-700 dark:text-primary-300 text-center">
                        {match.result}
                      </p>
                    </div>
                  </div>
                )}

                {/* Interactive Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-accent-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:via-accent-500/5 group-hover:to-primary-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white/95 to-gray-50/50 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.98] hover:scale-[1.01] mobile-touch"
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Status Indicator Bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"></div>

                <div className="relative p-4">
                  {/* Match Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm">
                      <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        <div>{new Date(match.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}</div>
                        <div className="text-xs opacity-75">{match.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Match {match.id}
                      </span>
                      <div className="relative px-2 py-0.5 rounded-full text-xs font-medium border-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                        UPCOMING
                      </div>
                    </div>
                  </div>

                  {/* Teams Section - Horizontal Layout */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Team 1 */}
                    <div className="relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 flex-1 bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/50">
                      <TeamLogo team={match.team1} size="medium" />
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center leading-tight mt-2">
                        {match.team1.name}
                      </h3>
                    </div>
                    
                    {/* VS Divider */}
                    <div className="flex items-center justify-center mx-3">
                      <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md transform group-hover:scale-105 transition-transform duration-300">
                        VS
                      </div>
                    </div>
                    
                    {/* Team 2 */}
                    <div className="relative flex flex-col items-center p-3 rounded-xl transition-all duration-300 flex-1 bg-gray-50/50 dark:bg-gray-700/30 hover:bg-gray-100/60 dark:hover:bg-gray-700/50">
                      <TeamLogo team={match.team2} size="medium" />
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center leading-tight mt-2">
                        {match.team2.name}
                      </h3>
                    </div>
                  </div>

                  {/* Venue Information */}
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div className="w-3 h-3 text-gray-500 dark:text-gray-400 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center truncate">
                      {match.venue}
                    </p>
                  </div>

                  {/* Interactive Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-accent-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:via-accent-500/5 group-hover:to-primary-500/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>
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