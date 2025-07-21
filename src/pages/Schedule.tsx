import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Filter, ChevronDown } from 'lucide-react';
import { generateDynamicMatches } from '../utils/dynamicSchedule';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';
import TeamLogo from '../components/TeamLogo';
import type { Match } from '../types/cricket';

const Schedule: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use dynamic matches that update based on current date
  const currentMatches = useMemo(() => {
    return generateDynamicMatches();
  }, []);

  // Get unique teams for filter
  const teams = useMemo(() => {
    const teamSet = new Set<string>();
    currentMatches.forEach(match => {
      teamSet.add(match.team1.name);
      teamSet.add(match.team2.name);
    });
    return Array.from(teamSet).sort();
  }, [currentMatches]);

  // Filter matches based on selected filters
  const filteredMatches = useMemo(() => {
    let filtered = currentMatches;

    // Filter by status/date
    if (selectedFilter === 'today') {
      filtered = filtered.filter(match => isToday(parseISO(match.date)));
    } else if (selectedFilter === 'upcoming') {
      filtered = filtered.filter(match => match.status === 'upcoming');
    } else if (selectedFilter === 'completed') {
      filtered = filtered.filter(match => match.status === 'completed');
    }
    // If selectedFilter === 'all', we don't filter anything

    // Filter by team
    if (selectedTeam !== 'all') {
      filtered = filtered.filter(match => 
        match.team1.name === selectedTeam || match.team2.name === selectedTeam
      );
    }

    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'upcoming':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      <div className="card p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Matches' },
              { key: 'today', label: 'Today' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Team Filter */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">
                {selectedTeam === 'all' ? 'All Teams' : selectedTeam}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="p-2">
                  <button
                    onClick={() => {
                      setSelectedTeam('all');
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedTeam === 'all'
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    All Teams
                  </button>
                  {teams.map(team => (
                    <button
                      key={team}
                      onClick={() => {
                        setSelectedTeam(team);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedTeam === team
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {team}
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
        <div className="card p-8 text-center">
          <Calendar className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No matches found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters to see more matches.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedMatches).map(([date, dayMatches]) => (
            <div key={date}>
              {/* Date Header */}
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {getDateLabel(date)}
                </h2>
                <div className="ml-4 h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Matches for this date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {dayMatches.map((match: Match) => (
                  <div key={match.id} className="card p-6 hover:shadow-lg transition-shadow">
                    {/* Match Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {match.time}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-500">
                          {match.matchType.charAt(0).toUpperCase() + match.matchType.slice(1)}
                        </span>
                      </div>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                        {match.status === 'live' && (
                          <div className="w-2 h-2 bg-red-500 rounded-full inline-block mr-1 animate-pulse"></div>
                        )}
                        {match.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Teams */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <TeamLogo team={match.team1} size="medium" />
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {match.team1.name}
                          </span>
                        </div>
                        {match.winner?.id === match.team1.id && (
                          <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                            Winner
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-center">
                        <span className="text-gray-400 dark:text-gray-600 font-medium">vs</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <TeamLogo team={match.team2} size="medium" />
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {match.team2.name}
                          </span>
                        </div>
                        {match.winner?.id === match.team2.id && (
                          <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                            Winner
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <MapPin className="w-4 h-4 mr-2" />
                      {match.venue}
                    </div>

                    {/* Result */}
                    {match.result && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {match.result}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schedule;
