import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Filter, ChevronDown } from 'lucide-react';
import { useTournamentSchedule } from '../hooks/useTournamentSchedule';
import { teams } from '../data/mockData';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';
import TeamLogo from '../components/TeamLogo';
import type { Match } from '../types/cricket';

const Schedule: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('today');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Load tournament schedule from CSV
  const { matches: currentMatches, loading, error } = useTournamentSchedule(teams);

  // Get unique teams for filter
  const teamNames = useMemo(() => {
    const teamSet = new Set<string>();
    currentMatches.forEach((match: Match) => {
      if (match.team1) teamSet.add(match.team1.name);
      if (match.team2) teamSet.add(match.team2.name);
    });
    return Array.from(teamSet).sort();
  }, [currentMatches]);

  // Filter matches based on selected filters
  const filteredMatches = useMemo(() => {
    let filtered = currentMatches;

    // Filter by status/date
    if (selectedFilter === 'today') {
      filtered = filtered.filter((match: Match) => isToday(parseISO(match.date)));
    } else if (selectedFilter === 'upcoming') {
      filtered = filtered.filter((match: Match) => match.status === 'upcoming');
    } else if (selectedFilter === 'completed') {
      filtered = filtered.filter((match: Match) => match.status === 'completed');
    }
    // If selectedFilter === 'all', we don't filter anything

    // Filter by team
    if (selectedTeam !== 'all') {
      filtered = filtered.filter((match: Match) => 
        match.team1?.name === selectedTeam || match.team2?.name === selectedTeam
      );
    }

    return filtered.sort((a: Match, b: Match) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [currentMatches, selectedFilter, selectedTeam]);

  // Group matches by date
  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: Match[] } = {};
    
    filteredMatches.forEach((match: Match) => {
      const date = match.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(match);
    });

    return groups;
  }, [filteredMatches]);

  const getDateLabel = (dateString: string) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tournament schedule...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <p className="text-red-600 dark:text-red-400">Failed to load schedule: {error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Match Schedule
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with all RC24 Virtual Willow Championship matches
        </p>
      </div>

      {/* Filters */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white/95 to-gray-50/50 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg p-6 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5"></div>
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Status Filter */}
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'All Matches', icon: '📋' },
              { key: 'today', label: 'Today', icon: '🎯' },
              { key: 'upcoming', label: 'Upcoming', icon: '⏰' },
              { key: 'completed', label: 'Completed', icon: '✅' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.96] hover:scale-[1.02] md:hover:scale-[1.01] mobile-touch ${
                  selectedFilter === filter.key
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-600/80 backdrop-blur-sm'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
                {selectedFilter === filter.key && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/20 to-accent-400/20 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Team Filter */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="group flex items-center space-x-3 px-6 py-3 bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200/80 dark:hover:bg-gray-600/80 transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.96] hover:scale-[1.02] md:hover:scale-[1.01] backdrop-blur-sm mobile-touch"
            >
              <Filter className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold">
                {selectedTeam === 'all' ? '🏏 All Teams' : `🏏 ${selectedTeam}`}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-20 overflow-hidden">
                <div className="p-3">
                  <button
                    onClick={() => {
                      setSelectedTeam('all');
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      selectedTeam === 'all'
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                    }`}
                  >
                    🏏 All Teams
                  </button>
                  <div className="my-2 h-px bg-gray-200 dark:bg-gray-700"></div>
                  {teamNames.map(teamName => (
                    <button
                      key={teamName}
                      onClick={() => {
                        setSelectedTeam(teamName);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        selectedTeam === teamName
                          ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                      }`}
                    >
                      🏏 {teamName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Matches */}
      {Object.keys(groupedMatches).length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white/95 to-gray-50/50 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5"></div>
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No matches found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Try adjusting your filters to see more matches.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedMatches).map(([date, dayMatches]) => (
            <div key={date}>
              {/* Date Header */}
              <div className="relative flex items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {getDateLabel(date)}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {dayMatches.length} match{dayMatches.length !== 1 ? 'es' : ''} scheduled
                    </p>
                  </div>
                </div>
                <div className="ml-8 h-px flex-1 bg-gradient-to-r from-gray-300 via-gray-200 to-transparent dark:from-gray-600 dark:via-gray-700 dark:to-transparent"></div>
              </div>

              {/* Matches for this date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {dayMatches.map((match: Match) => (
                  <div 
                    key={match.id} 
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-white/95 to-gray-50/50 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-md hover:shadow-lg transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.98] hover:scale-[1.01] mobile-touch"
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
                        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                          Match {match.id}
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
                        <MapPin className="w-3 h-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center truncate">
                          {match.venue}
                        </p>
                      </div>

                      {/* Result */}
                      {match.result && (
                        <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
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
          ))}
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default Schedule;
