import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Medal } from 'lucide-react';
import { calculateDynamicPointsTable } from '../utils/pointsTableCalculator';
import TeamLogo from '../components/TeamLogo';

const PointsTable: React.FC = () => {
  // Calculate dynamic points table based on completed matches
  const pointsTable = calculateDynamicPointsTable();
  
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {position}
            </span>
          </div>
        );
    }
  };

  const getQualificationStatus = (position: number) => {
    if (position <= 4) {
      return {
        color: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'Qualified for Playoffs',
        trendIcon: 'up'
      };
    } else {
      return {
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        text: 'In Contention',
        trendIcon: 'neutral'
      };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Points Table
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Current standings in the RC24 Virtual Willow Championship
        </p>
      </div>

      {/* Qualification Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Qualified (Top 4)
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Playoff spots secured
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                In Contention (5-8)
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Fighting for playoffs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Points Table */}
      <div className="card">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="px-3 md:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-2 md:px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  P
                </th>
                <th className="px-2 md:px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  W
                </th>
                <th className="px-2 md:px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  L
                </th>
                <th className="px-2 md:px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  T
                </th>
                <th className="px-2 md:px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pts
                </th>
                <th className="px-2 md:px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  NRR
                </th>
                <th className="px-2 md:px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pointsTable.map((entry) => {
                const status = getQualificationStatus(entry.position);
                return (
                  <tr 
                    key={entry.team.id} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${status.bg}`}
                  >
                    <td className="px-3 md:px-6 py-4">
                      <div className="flex items-center space-x-2 md:space-x-3">
                        {getPositionIcon(entry.position)}
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {entry.position}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-2 md:mr-4">
                          <TeamLogo team={entry.team} size="large" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {entry.team.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-500">
                            {entry.team.captain} (C)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 md:px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                      {entry.played}
                    </td>
                    <td className="px-2 md:px-6 py-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
                      {entry.won}
                    </td>
                    <td className="px-2 md:px-6 py-4 text-center text-sm font-medium text-red-600 dark:text-red-400 hidden sm:table-cell">
                      {entry.lost}
                    </td>
                    <td className="px-2 md:px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white hidden md:table-cell">
                      {entry.tied}
                    </td>
                    <td className="px-2 md:px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-sm font-bold bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                        {entry.points}
                      </span>
                    </td>
                    <td className="px-2 md:px-6 py-4 text-center hidden lg:table-cell">
                      <div className="flex items-center justify-center space-x-1">
                        <span className={`text-sm font-medium ${
                          status.trendIcon === 'up' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {entry.nrr > 0 ? '+' : ''}{entry.nrr.toFixed(3)}
                        </span>
                        {status.trendIcon === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-2 md:px-6 py-4 text-center hidden xl:table-cell">
                      <span className={`text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>

      {/* Points System */}
      <div className="mt-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Points System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                2 Points
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                For a Win
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                1 Point
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                For a Tie/No Result
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                0 Points
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                For a Loss
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
              Net Run Rate (NRR)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Net Run Rate is calculated as the difference between the runs scored per over 
              and runs conceded per over. It acts as a tiebreaker when teams are level on points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsTable;
