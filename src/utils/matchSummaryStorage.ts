import type { MatchSummary } from '../types/cricket';
import { loadMatchSummaryFromJson } from './jsonMatchSummaryLoader';

// Simple in-memory storage for match summaries
class MatchSummaryStorage {
  private summaries: Map<string, MatchSummary> = new Map();

  // Store a match summary
  storeSummary(summary: MatchSummary): void {
    this.summaries.set(summary.matchId, summary);
    
    // Also persist to localStorage for development
    try {
      const stored = JSON.parse(localStorage.getItem('matchSummaries') || '{}');
      stored[summary.matchId] = summary;
      localStorage.setItem('matchSummaries', JSON.stringify(stored));
    } catch (error) {
      console.warn('Could not persist to localStorage:', error);
    }
  }

  // Get a match summary by match ID
  async getSummary(matchId: string): Promise<MatchSummary | null> {
    // First check memory
    if (this.summaries.has(matchId)) {
      return this.summaries.get(matchId)!;
    }

    // Try to load from JSON file
    const jsonSummary = await loadMatchSummaryFromJson(matchId);
    if (jsonSummary) {
      this.summaries.set(matchId, jsonSummary); // Cache in memory
      return jsonSummary;
    }

    // Then check localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('matchSummaries') || '{}');
      if (stored[matchId]) {
        const summary = stored[matchId] as MatchSummary;
        this.summaries.set(matchId, summary); // Cache in memory
        return summary;
      }
    } catch (error) {
      console.warn('Could not read from localStorage:', error);
    }

    return null;
  }

  // Get all summaries
  getAllSummaries(): MatchSummary[] {
    // Load from localStorage if needed
    try {
      const stored = JSON.parse(localStorage.getItem('matchSummaries') || '{}');
      Object.values(stored).forEach((summary: any) => {
        if (summary.matchId && !this.summaries.has(summary.matchId)) {
          this.summaries.set(summary.matchId, summary as MatchSummary);
        }
      });
    } catch (error) {
      console.warn('Could not read from localStorage:', error);
    }

    return Array.from(this.summaries.values());
  }

  // Check if a match has a summary
  async hasSummary(matchId: string): Promise<boolean> {
    const summary = await this.getSummary(matchId);
    // Additional check: make sure the summary has meaningful data
    if (summary && (
      !summary.title || 
      summary.title === '' || 
      !summary.scorecard?.team1Innings?.totalRuns ||
      summary.scorecard.team1Innings.totalRuns === 0
    )) {
      // Remove invalid/empty summary
      this.deleteSummary(matchId);
      return false;
    }
    return summary !== null;
  }

  // Delete a summary
  deleteSummary(matchId: string): boolean {
    const deleted = this.summaries.delete(matchId);
    
    // Also remove from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('matchSummaries') || '{}');
      delete stored[matchId];
      localStorage.setItem('matchSummaries', JSON.stringify(stored));
    } catch (error) {
      console.warn('Could not update localStorage:', error);
    }

    return deleted;
  }

  // Clear all summaries
  clearAll(): void {
    this.summaries.clear();
    
    try {
      localStorage.removeItem('matchSummaries');
    } catch (error) {
      console.warn('Could not clear localStorage:', error);
    }
  }

  // Import summaries from a backup
  importSummaries(summaries: MatchSummary[]): void {
    summaries.forEach(summary => {
      this.storeSummary(summary);
    });
  }

  // Export all summaries for backup
  exportSummaries(): MatchSummary[] {
    return this.getAllSummaries();
  }
}

// Create a singleton instance
export const matchSummaryStorage = new MatchSummaryStorage();

// Helper functions for easy access
export const storeSummary = (summary: MatchSummary) => matchSummaryStorage.storeSummary(summary);
export const getSummary = (matchId: string) => matchSummaryStorage.getSummary(matchId);
export const hasSummary = (matchId: string) => matchSummaryStorage.hasSummary(matchId);
export const deleteSummary = (matchId: string) => matchSummaryStorage.deleteSummary(matchId);
export const getAllSummaries = () => matchSummaryStorage.getAllSummaries();

export default matchSummaryStorage;
