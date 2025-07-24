import React from 'react';
import { 
  Trophy, 
  Clock, 
  MapPin, 
  Star, 
  Award,
  Activity,
  Target,
  Coins,
  X
} from 'lucide-react';
import type { MatchSummary as MatchSummaryType, Match } from '../types/cricket';
import TeamLogo from './TeamLogo';
import GlossyCard from './ui/GlossyCard';

interface MatchSummaryProps {
  match: Match;
  summary: MatchSummaryType;
  onClose: () => void;
}

const MatchSummary: React.FC<MatchSummaryProps> = ({ match, summary, onClose }) => {

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 match-summary-modal">
      <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-6xl h-full sm:max-h-[95vh] sm:h-auto overflow-hidden flex flex-col modal-content">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white p-3 sm:p-6 flex-shrink-0 match-summary-header">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
              <Trophy className="w-5 h-5 sm:w-8 sm:h-8 flex-shrink-0" />
              <h1 className="text-lg sm:text-2xl font-bold leading-tight pr-8">{summary.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm mt-2 sm:mt-0">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{match.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="truncate max-w-[150px] sm:max-w-none">{match.venue}</span>
              </div>
            </div>
          </div>

          {/* Teams - Responsive Layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <TeamLogo team={match.team1} size="medium" className="border-2 border-white rounded-full flex-shrink-0" />
              <div className="text-center sm:text-left">
                <h2 className="font-bold text-sm sm:text-lg leading-tight">{match.team1.name}</h2>
                <p className="text-white/80 text-xs sm:text-sm hidden sm:block">{match.team1.captain} (C)</p>
              </div>
            </div>
            
            <div className="text-lg sm:text-2xl font-bold">VS</div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-center sm:text-right">
                <h2 className="font-bold text-sm sm:text-lg leading-tight">{match.team2.name}</h2>
                <p className="text-white/80 text-xs sm:text-sm hidden sm:block">{match.team2.captain} (C)</p>
              </div>
              <TeamLogo team={match.team2} size="medium" className="border-2 border-white rounded-full flex-shrink-0" />
            </div>
          </div>
          
          {match.result && (
            <div className="mt-3 sm:mt-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1 sm:px-4 sm:py-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-xs sm:text-base">{match.result}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Match Overview */}
          <GlossyCard className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-500 flex-shrink-0" />
              Match Overview
            </h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {summary.description}
            </p>
          </GlossyCard>

          {/* Man of the Match */}
          {summary.manOfTheMatch && (
            <GlossyCard className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500 flex-shrink-0" />
                Man of the Match
              </h3>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                    {summary.manOfTheMatch.player.name}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-tight">
                    {summary.manOfTheMatch.reason}
                  </p>
                </div>
              </div>
            </GlossyCard>
          )}

          {/* Scorecard Summary */}
          <GlossyCard className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-500 flex-shrink-0" />
              Scorecard Summary
            </h3>
            
            <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
              {/* Team 1 Innings */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3 mb-3 sm:mb-4">
                  <TeamLogo team={match.team1} size="small" className="flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{match.team1.name}</h4>
                      {summary.tossDetails.winner.id === match.team1.id && (
                        <div className="flex items-center" title="Won Toss">
                          <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {summary.scorecard.team1Innings.totalRuns}/{summary.scorecard.team1Innings.totalWickets}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight">
                      ({summary.scorecard.team1Innings.totalOvers}.{summary.scorecard.team1Innings.totalBalls} overs, 
                      RR: {summary.scorecard.team1Innings.runRate.toFixed(2)})
                    </p>
                  </div>
                </div>

                {/* Top Scorers */}
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Top Scorers</h5>
                  <div className="space-y-1 sm:space-y-2">
                    {summary.scorecard.team1Innings.topScorers.slice(0, 3).map((scorer, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs sm:text-sm performance-stat">
                        <span className="font-medium text-gray-900 dark:text-white truncate flex-1 mr-2">
                          {scorer.player.name}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 flex-shrink-0 stat-value">
                          {scorer.runs} ({scorer.balls}) SR: {scorer.strikeRate.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bowling Performers */}
                {summary.scorecard.team1Innings.topBowlers && summary.scorecard.team1Innings.topBowlers.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Bowling Performers</h5>
                    <div className="space-y-1 sm:space-y-2">
                      {summary.scorecard.team1Innings.topBowlers.slice(0, 3).map((bowler, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs sm:text-sm performance-stat">
                          <span className="font-medium text-gray-900 dark:text-white truncate flex-1 mr-2">
                            {bowler.player.name}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 flex-shrink-0 stat-value">
                            {bowler.wickets}/{bowler.runs} ({bowler.overs} ov) ER: {bowler.economy.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Team 2 Innings */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3 mb-3 sm:mb-4">
                  <TeamLogo team={match.team2} size="small" className="flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{match.team2.name}</h4>
                      {summary.tossDetails.winner.id === match.team2.id && (
                        <div className="flex items-center" title="Won Toss">
                          <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {summary.scorecard.team2Innings.totalRuns}/{summary.scorecard.team2Innings.totalWickets}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight">
                      ({summary.scorecard.team2Innings.totalOvers}.{summary.scorecard.team2Innings.totalBalls} overs, 
                      RR: {summary.scorecard.team2Innings.runRate.toFixed(2)})
                    </p>
                  </div>
                </div>

                {/* Top Scorers */}
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Top Scorers</h5>
                  <div className="space-y-1 sm:space-y-2">
                    {summary.scorecard.team2Innings.topScorers.slice(0, 3).map((scorer, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs sm:text-sm performance-stat">
                        <span className="font-medium text-gray-900 dark:text-white truncate flex-1 mr-2">
                          {scorer.player.name}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 flex-shrink-0 stat-value">
                          {scorer.runs} ({scorer.balls}) SR: {scorer.strikeRate.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bowling Performers */}
                {summary.scorecard.team2Innings.topBowlers && summary.scorecard.team2Innings.topBowlers.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Bowling Performers</h5>
                    <div className="space-y-1 sm:space-y-2">
                      {summary.scorecard.team2Innings.topBowlers.slice(0, 3).map((bowler, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs sm:text-sm performance-stat">
                          <span className="font-medium text-gray-900 dark:text-white truncate flex-1 mr-2">
                            {bowler.player.name}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 flex-shrink-0 stat-value">
                            {bowler.wickets}/{bowler.runs} ({bowler.overs} ov) ER: {bowler.economy.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GlossyCard>
        </div>
      </div>
    </div>
  );
};

export default MatchSummary;
