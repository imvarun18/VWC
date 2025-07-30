import React, { useState, useEffect } from 'react';
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
  List,
  ChevronUp
} from 'lucide-react';
import { useTournamentSchedule } from '../hooks/useTournamentSchedule';
import { teams } from '../data/mockData';
import { getSummary } from '../utils/matchSummaryStorage';
import { parseISO, isToday } from 'date-fns';
import TeamLogo from '../components/TeamLogo';
import GlossyCard from '../components/ui/GlossyCard';
import MatchSummary from '../components/MatchSummary';
import MatchSummaryUpload from '../components/MatchSummaryUpload';
import type { Match, MatchSummary as MatchSummaryType } from '../types/cricket';

// Helper component to handle async summary check and result display
const MatchSummaryIndicator: React.FC<{ matchId: string }> = ({ matchId }) => {
  const [hasMatchSummary, setHasMatchSummary] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSummary = async () => {
      try {
        // Check if we can actually get the summary, not just if file exists
        const summary = await getSummary(matchId);
        setHasMatchSummary(summary !== null);
      } catch (error) {
        console.warn(`Error checking summary for match ${matchId}:`, error);
        setHasMatchSummary(false);
      }
      setIsLoading(false);
    };
    checkSummary();
  }, [matchId]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-1 border-2 border-gray-300 text-gray-500 bg-transparent rounded-lg px-3 py-1.5 text-xs font-semibold shadow-md">
        <span>Loading...</span>
      </div>
    );
  }

  return hasMatchSummary ? (
    <div className="flex items-center space-x-1 border-2 border-green-500 text-green-600 dark:text-green-400 bg-transparent rounded-lg px-3 py-1.5 text-xs font-semibold shadow-md">
      <Eye className="w-3 h-3" />
      <span>View Summary</span>
    </div>
  ) : (
    <div className="flex items-center space-x-1 border-2 border-orange-500 text-orange-600 dark:text-orange-400 bg-transparent rounded-lg px-3 py-1.5 text-xs font-semibold shadow-md">
      <Upload className="w-3 h-3" />
      <span>Upload Summary</span>
    </div>
  );
};

// Helper component to display trophy for winning team using CSV data
const WinnerTrophy: React.FC<{ match: Match; teamId: string }> = ({ match, teamId }) => {
  // Use winner data directly from the CSV (via match object)
  const isWinner = match.winner?.id === teamId;

  if (!isWinner) {
    return null;
  }

  return (
    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
      <Trophy className="w-2.5 h-2.5 text-yellow-900" />
    </div>
  );
};

// Helper component to handle match result display using CSV data
const MatchResultDisplay: React.FC<{ match: Match }> = ({ match }) => {
  // Use the result directly from the CSV data (via match object)
  const result = match.result;
  
  if (!result) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="bg-gradient-to-r from-green-500 via-green-400 to-emerald-400 dark:from-green-600 dark:via-green-500 dark:to-emerald-500 rounded-xl p-3 shadow-lg border border-green-200 dark:border-green-700">
        <div className="text-center">
          <div className="text-sm font-bold text-white drop-shadow-md">
            {result}
          </div>
        </div>
      </div>
    </div>
  );
};

const Scorecard: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<MatchSummaryType | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<Match | null>(null);
  const [showAllSummaries, setShowAllSummaries] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const { matches } = useTournamentSchedule(teams);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Clean up any invalid match 8 data on component mount
  useEffect(() => {
    const cleanupMatch8 = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('matchSummaries') || '{}');
        if (stored['8']) {
          delete stored['8'];
          localStorage.setItem('matchSummaries', JSON.stringify(stored));
          console.log('Cleaned up match 8 from localStorage');
        }
      } catch (error) {
        console.warn('Could not clean localStorage:', error);
      }
    };
    cleanupMatch8();
  }, []);
  
  // Get matches from CSV data - using same logic as Home page
  const liveMatch = matches.find((match: Match) => match.status === 'live');
  const todaysMatches = matches.filter((match: Match) => isToday(parseISO(match.date)));
  
  // If no live match found by status, use the first today's match
  const currentLiveMatch = liveMatch || todaysMatches[0];
  
  const completedMatches = matches
    .filter((match: Match) => match.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending (most recent first)
    .slice(0, showAllSummaries ? undefined : 3); // Show all if showAllSummaries is true, otherwise only 3

  const handleMatchClick = async (match: Match) => {
    const summary = await getSummary(match.id);
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
      {currentLiveMatch && (
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
                  <span className="text-sm">{currentLiveMatch.time}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {currentLiveMatch.venue}
                </span>
              </div>
            </div>

            {/* Teams and Current Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Batting Team */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TeamLogo team={currentLiveMatch.team1} size="medium" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {currentLiveMatch.team1.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Batting</p>
                  </div>
                </div>
                
                {/* Current Score */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      0/0
                    </span>
                    <span className="text-lg text-gray-600 dark:text-gray-400">
                      (0.0 overs)
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
                  <TeamLogo team={currentLiveMatch.team2} size="medium" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {currentLiveMatch.team2.name}
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
      {!currentLiveMatch && (
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
                          <WinnerTrophy match={match} teamId={match.team1.id} />
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
                          <WinnerTrophy match={match} teamId={match.team2.id} />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center leading-tight">
                          {match.team2.shortName}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Match Result - Only show if summary exists */}
                    <MatchResultDisplay match={match} />
                    
                    {/* Venue */}
                    <div className="text-center mb-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {match.venue}
                      </p>
                    </div>

                    {/* Summary Status Indicator */}
                    <div className="flex justify-center">
                      <MatchSummaryIndicator matchId={match.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No Matches Message */}
      {!currentLiveMatch && todaysMatches.length === 0 && completedMatches.length === 0 && (
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 ease-out hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/20 to-accent-400/20 animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

export default Scorecard;