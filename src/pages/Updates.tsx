import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  Trophy, 
  AlertCircle, 
  TrendingUp,
  Clock,
  Filter,
  ChevronDown
} from 'lucide-react';
import { tournamentUpdates } from '../data/mockData';
import { format, parseISO } from 'date-fns';

const Updates: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'news' | 'announcement' | 'result' | 'injury' | 'schedule-change'>('all');
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [isPriorityFilterOpen, setIsPriorityFilterOpen] = useState(false);

  // Filter updates based on selected filters
  const filteredUpdates = tournamentUpdates.filter(update => {
    const typeMatch = selectedType === 'all' || update.type === selectedType;
    const priorityMatch = selectedPriority === 'all' || update.priority === selectedPriority;
    return typeMatch && priorityMatch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <Bell className="w-5 h-5" />;
      case 'announcement':
        return <AlertCircle className="w-5 h-5" />;
      case 'result':
        return <Trophy className="w-5 h-5" />;
      case 'injury':
        return <AlertCircle className="w-5 h-5" />;
      case 'schedule-change':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getUpdateColor = (type: string) => {
    switch (type) {
      case 'news':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'announcement':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'result':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'injury':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'schedule-change':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const formatUpdateType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Tournament Updates
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay informed with the latest news and updates from RC24 Virtual Willow Championship
        </p>
      </div>

      {/* Filters */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Type Filter */}
          <div className="relative">
            <button
              onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">
                Type: {selectedType === 'all' ? 'All' : formatUpdateType(selectedType)}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isTypeFilterOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="p-2">
                  {['all', 'news', 'announcement', 'result', 'injury', 'schedule-change'].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type as any);
                        setIsTypeFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedType === type
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {type === 'all' ? 'All Types' : formatUpdateType(type)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <button
              onClick={() => setIsPriorityFilterOpen(!isPriorityFilterOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                Priority: {selectedPriority === 'all' ? 'All' : selectedPriority.charAt(0).toUpperCase() + selectedPriority.slice(1)}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isPriorityFilterOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                <div className="p-2">
                  {['all', 'high', 'medium', 'low'].map(priority => (
                    <button
                      key={priority}
                      onClick={() => {
                        setSelectedPriority(priority as any);
                        setIsPriorityFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedPriority === priority
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Updates List */}
      {filteredUpdates.length === 0 ? (
        <div className="card p-8 text-center">
          <Bell className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No updates found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters to see more updates.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUpdates.map((update) => (
            <div key={update.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-3">
                    <div className={`p-2 rounded-lg ${getUpdateColor(update.type)}`}>
                      {getUpdateIcon(update.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {update.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {update.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex flex-col sm:items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUpdateColor(update.type)}`}>
                      {formatUpdateType(update.type)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(update.priority)}`}>
                      {update.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {format(parseISO(update.date), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>

              {/* Image if available */}
              {update.imageUrl && (
                <div className="mt-4">
                  <img
                    src={update.imageUrl}
                    alt={update.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Update Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['news', 'announcement', 'result', 'schedule-change'].map(type => {
            const count = tournamentUpdates.filter(update => update.type === type).length;
            return (
              <div key={type} className="card p-4 text-center">
                <div className={`inline-flex p-2 rounded-lg ${getUpdateColor(type)} mb-2`}>
                  {getUpdateIcon(type)}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {count}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {formatUpdateType(type)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Updates;
