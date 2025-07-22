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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8" />
              <h1 className="text-2xl font-bold">{summary.title}</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{match.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{match.venue}</span>
              </div>
            </div>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-3">
              <TeamLogo team={match.team1} size="large" className="border-2 border-white rounded-full" />
              <div className="text-center">
                <h2 className="font-bold text-lg">{match.team1.name}</h2>
                <p className="text-white/80 text-sm">{match.team1.captain} (C)</p>
              </div>
            </div>
            
            <div className="text-2xl font-bold">VS</div>
            
            <div className="flex items-center space-x-3">
              <div className="text-center">
                <h2 className="font-bold text-lg">{match.team2.name}</h2>
                <p className="text-white/80 text-sm">{match.team2.captain} (C)</p>
              </div>
              <TeamLogo team={match.team2} size="large" className="border-2 border-white rounded-full" />
            </div>
          </div>
          
          {match.result && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">{match.result}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
          {/* Match Overview */}
          <GlossyCard className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary-500" />
              Match Overview
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {summary.description}
            </p>
          </GlossyCard>

          {/* Man of the Match */}
          {summary.manOfTheMatch && (
            <GlossyCard className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Man of the Match
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {summary.manOfTheMatch.player.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {summary.manOfTheMatch.reason}
                  </p>
                </div>
              </div>
            </GlossyCard>
          )}

          {/* Scorecard Summary */}
          <GlossyCard className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary-500" />
              Scorecard Summary
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Team 1 Innings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <TeamLogo team={match.team1} size="medium" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">{match.team1.name}</h4>
                      {summary.tossDetails.winner.id === match.team1.id && (
                        <div className="flex items-center" title="Won Toss">
                          <Coins className="w-4 h-4 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {summary.scorecard.team1Innings.totalRuns}/{summary.scorecard.team1Innings.totalWickets}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ({summary.scorecard.team1Innings.totalOvers}.{summary.scorecard.team1Innings.totalBalls} overs, 
                      RR: {summary.scorecard.team1Innings.runRate.toFixed(2)})
                    </p>
                  </div>
                </div>

                {/* Top Scorers */}
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Top Scorers</h5>
                  <div className="space-y-2">
                    {summary.scorecard.team1Innings.topScorers.slice(0, 3).map((scorer, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {scorer.player.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {scorer.runs} ({scorer.balls}) SR: {scorer.strikeRate.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bowling Performers */}
                {summary.scorecard.team1Innings.topBowlers && summary.scorecard.team1Innings.topBowlers.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Bowling Performers</h5>
                    <div className="space-y-2">
                      {summary.scorecard.team1Innings.topBowlers.slice(0, 3).map((bowler, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {bowler.player.name}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {bowler.wickets}/{bowler.runs} ({bowler.overs} ov) ER: {bowler.economy.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Team 2 Innings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <TeamLogo team={match.team2} size="medium" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">{match.team2.name}</h4>
                      {summary.tossDetails.winner.id === match.team2.id && (
                        <div className="flex items-center" title="Won Toss">
                          <Coins className="w-4 h-4 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {summary.scorecard.team2Innings.totalRuns}/{summary.scorecard.team2Innings.totalWickets}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ({summary.scorecard.team2Innings.totalOvers}.{summary.scorecard.team2Innings.totalBalls} overs, 
                      RR: {summary.scorecard.team2Innings.runRate.toFixed(2)})
                    </p>
                  </div>
                </div>

                {/* Top Scorers */}
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Top Scorers</h5>
                  <div className="space-y-2">
                    {summary.scorecard.team2Innings.topScorers.slice(0, 3).map((scorer, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {scorer.player.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {scorer.runs} ({scorer.balls}) SR: {scorer.strikeRate.toFixed(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bowling Performers */}
                {summary.scorecard.team2Innings.topBowlers && summary.scorecard.team2Innings.topBowlers.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Bowling Performers</h5>
                    <div className="space-y-2">
                      {summary.scorecard.team2Innings.topBowlers.slice(0, 3).map((bowler, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {bowler.player.name}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
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
