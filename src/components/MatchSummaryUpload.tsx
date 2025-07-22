import React, { useState } from 'react';
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertCircle, 
  X,
  Download,
  Plus,
  Trash2
} from 'lucide-react';
import type { Match, MatchSummary as MatchSummaryType, Player } from '../types/cricket';
import { teams, players } from '../data/mockData';
import { storeSummary } from '../utils/matchSummaryStorage';
import GlossyCard from './ui/GlossyCard';
import GlossyButton from './ui/GlossyButton';

interface MatchSummaryUploadProps {
  match: Match;
  onSummaryUploaded: (summary: MatchSummaryType) => void;
  onClose: () => void;
}

const MatchSummaryUpload: React.FC<MatchSummaryUploadProps> = ({ 
  match, 
  onSummaryUploaded, 
  onClose 
}) => {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'form'>('form');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    title: `${match.team1.name} vs ${match.team2.name} - Match Summary`,
    description: '',
    highlights: [''],
    manOfTheMatch: {
      playerId: '',
      reason: ''
    },
    tossWinnerId: '',
    tossDecision: 'bat' as const,
    umpires: ['', ''],
    scorecard: {
      team1: {
        totalRuns: 0,
        totalWickets: 0,
        totalOvers: 0,
        totalBalls: 0,
        extras: 0,
        runRate: 0,
        topScorers: [{ playerId: '', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, howOut: '' }]
      },
      team2: {
        totalRuns: 0,
        totalWickets: 0,
        totalOvers: 0,
        totalBalls: 0,
        extras: 0,
        runRate: 0,
        topScorers: [{ playerId: '', runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, howOut: '' }]
      }
    }
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Validate the JSON structure
      if (!data.title || !data.description) {
        throw new Error('Invalid match summary format');
      }

      // Convert to MatchSummary format
      const summary = convertToMatchSummary(data);
      storeSummary(summary); // Store the summary
      onSummaryUploaded(summary);
      setUploadStatus('success');
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const convertToMatchSummary = (data: any): MatchSummaryType => {
    // Helper function to find player by ID or name
    const findPlayer = (identifier: string): Player => {
      return players.find(p => p.id === identifier || p.name.toLowerCase().includes(identifier.toLowerCase())) 
        || players[0]; // Default fallback
    };

    // Helper function to find team by ID or name
    const findTeam = (identifier: string) => {
      return teams.find(t => t.id === identifier || t.name.toLowerCase().includes(identifier.toLowerCase())) 
        || teams[0]; // Default fallback
    };

    return {
      id: `summary-${match.id}`,
      matchId: match.id,
      title: data.title || formData.title,
      description: data.description || '',
      highlights: data.highlights || [],
      manOfTheMatch: data.manOfTheMatch ? {
        player: findPlayer(data.manOfTheMatch.playerId || data.manOfTheMatch.player),
        reason: data.manOfTheMatch.reason || ''
      } : undefined,
      scorecard: {
        team1Innings: {
          teamId: match.team1.id,
          totalRuns: data.scorecard?.team1?.totalRuns || 0,
          totalWickets: data.scorecard?.team1?.totalWickets || 0,
          totalOvers: data.scorecard?.team1?.totalOvers || 0,
          totalBalls: data.scorecard?.team1?.totalBalls || 0,
          extras: data.scorecard?.team1?.extras || 0,
          runRate: data.scorecard?.team1?.runRate || 0,
          topScorers: (data.scorecard?.team1?.topScorers || []).map((scorer: any) => ({
            player: findPlayer(scorer.playerId || scorer.player),
            runs: scorer.runs || 0,
            balls: scorer.balls || 0,
            fours: scorer.fours || 0,
            sixes: scorer.sixes || 0,
            strikeRate: scorer.strikeRate || 0,
            howOut: scorer.howOut
          })),
          topBowlers: [],
          partnerships: []
        },
        team2Innings: {
          teamId: match.team2.id,
          totalRuns: data.scorecard?.team2?.totalRuns || 0,
          totalWickets: data.scorecard?.team2?.totalWickets || 0,
          totalOvers: data.scorecard?.team2?.totalOvers || 0,
          totalBalls: data.scorecard?.team2?.totalBalls || 0,
          extras: data.scorecard?.team2?.extras || 0,
          runRate: data.scorecard?.team2?.runRate || 0,
          topScorers: (data.scorecard?.team2?.topScorers || []).map((scorer: any) => ({
            player: findPlayer(scorer.playerId || scorer.player),
            runs: scorer.runs || 0,
            balls: scorer.balls || 0,
            fours: scorer.fours || 0,
            sixes: scorer.sixes || 0,
            strikeRate: scorer.strikeRate || 0,
            howOut: scorer.howOut
          })),
          topBowlers: [],
          partnerships: []
        }
      },
      tossDetails: {
        winner: findTeam(data.tossWinnerId || data.tossWinner),
        decision: data.tossDecision || 'bat'
      },
      umpires: data.umpires || ['TBD', 'TBD']
    };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const summary = convertFormDataToSummary();
      storeSummary(summary); // Store the summary
      onSummaryUploaded(summary);
      setUploadStatus('success');
      setUploadStatus('success');
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error creating summary:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const convertFormDataToSummary = (): MatchSummaryType => {
    const findPlayer = (id: string) => players.find(p => p.id === id) || players[0];
    const findTeam = (id: string) => teams.find(t => t.id === id) || teams[0];

    return {
      id: `summary-${match.id}`,
      matchId: match.id,
      title: formData.title,
      description: formData.description,
      highlights: formData.highlights.filter(h => h.trim() !== ''),
      manOfTheMatch: formData.manOfTheMatch.playerId ? {
        player: findPlayer(formData.manOfTheMatch.playerId),
        reason: formData.manOfTheMatch.reason
      } : undefined,
      scorecard: {
        team1Innings: {
          teamId: match.team1.id,
          ...formData.scorecard.team1,
          topScorers: formData.scorecard.team1.topScorers
            .filter(scorer => scorer.playerId)
            .map(scorer => ({
              player: findPlayer(scorer.playerId),
              runs: scorer.runs,
              balls: scorer.balls,
              fours: scorer.fours,
              sixes: scorer.sixes,
              strikeRate: scorer.strikeRate,
              howOut: scorer.howOut
            })),
          topBowlers: [],
          partnerships: []
        },
        team2Innings: {
          teamId: match.team2.id,
          ...formData.scorecard.team2,
          topScorers: formData.scorecard.team2.topScorers
            .filter(scorer => scorer.playerId)
            .map(scorer => ({
              player: findPlayer(scorer.playerId),
              runs: scorer.runs,
              balls: scorer.balls,
              fours: scorer.fours,
              sixes: scorer.sixes,
              strikeRate: scorer.strikeRate,
              howOut: scorer.howOut
            })),
          topBowlers: [],
          partnerships: []
        }
      },
      tossDetails: {
        winner: findTeam(formData.tossWinnerId),
        decision: formData.tossDecision
      },
      umpires: formData.umpires.filter(u => u.trim() !== '')
    };
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const downloadTemplate = () => {
    const template = {
      title: "Match Title",
      description: "Detailed match description...",
      highlights: [
        "First highlight",
        "Second highlight"
      ],
      manOfTheMatch: {
        playerId: "player-id-or-name",
        reason: "Outstanding performance with bat and ball"
      },
      tossWinnerId: "team-id",
      tossDecision: "bat",
      umpires: ["Umpire 1", "Umpire 2"],
      scorecard: {
        team1: {
          totalRuns: 165,
          totalWickets: 8,
          totalOvers: 20,
          totalBalls: 0,
          extras: 12,
          runRate: 8.25,
          topScorers: [
            {
              playerId: "player-id-or-name",
              runs: 54,
              balls: 42,
              fours: 6,
              sixes: 2,
              strikeRate: 128.57,
              howOut: "caught"
            }
          ]
        },
        team2: {
          totalRuns: 168,
          totalWickets: 6,
          totalOvers: 19,
          totalBalls: 3,
          extras: 8,
          runRate: 8.68,
          topScorers: [
            {
              playerId: "player-id-or-name",
              runs: 67,
              balls: 48,
              fours: 8,
              sixes: 3,
              strikeRate: 139.58
            }
          ]
        }
      }
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'match-summary-template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Upload Match Summary</h2>
              <p className="text-white/80">{match.team1.name} vs {match.team2.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Upload Method Selection */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setUploadMethod('file')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  uploadMethod === 'file'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Upload JSON File
              </button>
              <button
                onClick={() => setUploadMethod('form')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  uploadMethod === 'form'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                Fill Form
              </button>
            </div>
          </div>

          {uploadMethod === 'file' ? (
            /* File Upload */
            <div className="space-y-6">
              <GlossyCard className="p-6">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Upload Match Summary
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload a JSON file containing the match summary data
                  </p>
                  
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <File className="w-4 h-4 mr-2" />
                    {isUploading ? 'Uploading...' : 'Choose File'}
                  </label>

                  <div className="mt-4">
                    <GlossyButton
                      onClick={downloadTemplate}
                      variant="secondary"
                      className="inline-flex items-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </GlossyButton>
                  </div>
                </div>

                {uploadStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Match summary uploaded successfully!
                  </div>
                )}

                {uploadStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Error uploading file. Please check the format and try again.
                  </div>
                )}
              </GlossyCard>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Basic Info */}
              <GlossyCard className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Match Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Match Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </GlossyCard>

              {/* Highlights */}
              <GlossyCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Match Highlights</h3>
                  <GlossyButton onClick={addHighlight} size="sm" variant="secondary">
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </GlossyButton>
                </div>
                
                <div className="space-y-3">
                  {formData.highlights.map((highlight, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) => {
                          const newHighlights = [...formData.highlights];
                          newHighlights[index] = e.target.value;
                          setFormData(prev => ({ ...prev, highlights: newHighlights }));
                        }}
                        placeholder={`Highlight ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      {formData.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHighlight(index)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </GlossyCard>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <GlossyButton onClick={onClose} variant="secondary">
                  Cancel
                </GlossyButton>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Creating Summary...' : 'Create Summary'}
                </button>
              </div>

              {uploadStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Match summary created successfully!
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Error creating summary. Please check all fields and try again.
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchSummaryUpload;
