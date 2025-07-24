import React, { useState } from 'react';
import { 
  Clock, 
  Activity,
  CheckCircle,
  Calendar,
  Trophy,
  Play,
  TrendingUp,
  Upload,
  Eye,
  FileText,
  List
} from 'lucide-react';
import { useTournamentSchedule } from '../hooks/useTournamentSchedule';
import { teams } from '../data/mockData';
import { currentLiveScore } from '../data/mockData';
import { getSummary, hasSummary } from '../utils/matchSummaryStorage';
import { parseISO, isToday } from 'date-fns';
import '../data/sampleMatchSummary'; // Load sample data
import TeamLogo from '../components/TeamLogo';
import GlossyCard from '../components/ui/GlossyCard';
import MatchSummary from '../components/MatchSummary';
import MatchSummaryUpload from '../components/MatchSummaryUpload';
import type { Match, MatchSummary as MatchSummaryType } from '../types/cricket';

const Scorecard: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<MatchSummaryType | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<Match | null>(null);
  const [showAllSummaries, setShowAllSummaries] = useState(false);
  
  const { matches } = useTournamentSchedule(teams);
  
  // Get matches from CSV data
  const liveMatch = matches.find((match: Match) => match.status === 'live');
  const todaysMatches = matches.filter((match: Match) => isToday(parseISO(match.date)));
  const completedMatches = matches
    .filter((match: Match) => match.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending (most recent first)
    .slice(0, showAllSummaries ? undefined : 3); // Show all if showAllSummaries is true, otherwise only 3

  const handleMatchClick = (match: Match) => {
    const summary = getSummary(match.id);
    if (summary) {
      setSelectedMatch(match);
      setSelectedSummary(summary);
    } else {
      setShowUploadModal(match);
    }
  };

  const handleSummaryUploaded = (summary: MatchSummaryType) => {
    // The storage is handled in the upload component
    setShowUploadModal(null);
    // Optionally show the uploaded summary
    const match = completedMatches.find((m: Match) => m.id === summary.matchId);
    if (match) {
      setSelectedMatch(match);
      setSelectedSummary(summary);
    }
  };
  
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
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium border-2 border-red-500 text-red-600 dark:text-red-400 bg-transparent">LIVE</span>
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
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
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
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Format</p>
                  <p className="font-semibold text-gray-900 dark:text-white">T5</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">Overs</p>
                  <p className="font-semibold text-gray-900 dark:text-white">5 overs per side</p>
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
                  {todaysMatches.map((match: Match) => (
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center tracking-tight">
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
              Recent Match Results
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Click cards to view summaries or upload new ones</span>
              </div>
              
              {/* View All Match Summaries Button */}
              <button
                onClick={() => setShowAllSummaries(!showAllSummaries)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
              >
                <List className="w-4 h-4" />
                <span>{showAllSummaries ? 'Show Recent Only' : 'View All Match Summaries'}</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedMatches.map((match: Match) => {
              const hasMatchSummary = hasSummary(match.id);
              
              return (
                <div key={match.id} className="relative group">
                  {/* Modern Rectangular Match Result Card */}
                  <div 
                    className="relative bg-gradient-to-br from-white/90 via-white/95 to-white/90 dark:from-gray-800/90 dark:via-gray-800/95 dark:to-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/30 overflow-hidden transition-all duration-300 ease-out transform-gpu will-change-transform hover:shadow-2xl active:scale-[0.98] hover:scale-[1.01] cursor-pointer mobile-touch"
                    onClick={() => handleMatchClick(match)}
                  >
                    {/* Header with Match Number and Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                        Match {match.id}
                      </div>
                      <span className="text-xs px-2 py-1 border-2 border-green-500 text-green-600 dark:text-green-400 bg-transparent rounded-lg font-semibold tracking-wide">
                        COMPLETED
                      </span>
                    </div>

                    {/* Teams Section - Horizontal Layout */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Team 1 */}
                      <div className="flex flex-col items-center space-y-2 flex-1">
                        <div className="relative group">
                          <div className="w-16 h-16 flex items-center justify-center">
                            <TeamLogo team={match.team1} size="large" className="drop-shadow-lg transition-transform duration-300 ease-out group-hover:scale-110" />
                          </div>
                          {match.winner?.id === match.team1.id && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                              <Trophy className="w-2.5 h-2.5 text-yellow-900" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center leading-tight">
                          {match.team1.shortName}
                        </h3>
                      </div>
                      
                      {/* VS Divider */}
                      <div className="flex flex-col items-center mx-3">
                        <div className="text-lg font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                          vs
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {match.time}
                        </div>
                      </div>
                      
                      {/* Team 2 */}
                      <div className="flex flex-col items-center space-y-2 flex-1">
                        <div className="relative group">
                          <div className="w-16 h-16 flex items-center justify-center">
                            <TeamLogo team={match.team2} size="large" className="drop-shadow-lg transition-transform duration-300 ease-out group-hover:scale-110" />
                          </div>
                          {match.winner?.id === match.team2.id && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                              <Trophy className="w-2.5 h-2.5 text-yellow-900" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center leading-tight">
                          {match.team2.shortName}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Match Result - Single Line Winner Announcement */}
                    {match.result && match.winner && (
                      <div className="mb-4">
                        <div className="bg-gradient-to-r from-green-500 via-green-400 to-emerald-400 dark:from-green-600 dark:via-green-500 dark:to-emerald-500 rounded-xl p-3 shadow-lg border border-green-200 dark:border-green-700">
                          <div className="text-center">
                            <div className="text-sm font-bold text-white drop-shadow-md">
                              {match.result.replace(match.winner.name, match.winner.shortName)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Venue */}
                    <div className="text-center mb-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {match.venue}
                      </p>
                    </div>

                    {/* Summary Status Indicator */}
                    <div className="flex justify-center">
                      {hasMatchSummary ? (
                        <div className="flex items-center space-x-1 border-2 border-green-500 text-green-600 dark:text-green-400 bg-transparent rounded-lg px-3 py-1.5 text-xs font-semibold shadow-md">
                          <Eye className="w-3 h-3" />
                          <span>View Summary</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 border-2 border-orange-500 text-orange-600 dark:text-orange-400 bg-transparent rounded-lg px-3 py-1.5 text-xs font-semibold shadow-md">
                          <Upload className="w-3 h-3" />
                          <span>Upload Summary</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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

      {/* Match Summary Modal */}
      {selectedMatch && selectedSummary && (
        <MatchSummary
          match={selectedMatch}
          summary={selectedSummary}
          onClose={() => {
            setSelectedMatch(null);
            setSelectedSummary(null);
          }}
        />
      )}

      {/* Upload Summary Modal */}
      {showUploadModal && (
        <MatchSummaryUpload
          match={showUploadModal}
          onSummaryUploaded={handleSummaryUploaded}
          onClose={() => setShowUploadModal(null)}
        />
      )}
    </div>
  );
};

export default Scorecard;
