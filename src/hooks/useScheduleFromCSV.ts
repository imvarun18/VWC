import { useState, useEffect } from 'react';
import type { Match, Team } from '../types/cricket';
import { loadScheduleFromCSV } from '../utils/csvReader';

export function useScheduleFromCSV(teams: Team[], csvFileName?: string) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const csvMatches = await loadScheduleFromCSV(teams, csvFileName);
        setMatches(csvMatches);
      } catch (err) {
        console.error('Failed to load schedule:', err);
        setError(err instanceof Error ? err.message : 'Failed to load schedule');
        setMatches([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    if (teams.length > 0) {
      loadSchedule();
    }
  }, [teams, csvFileName]);

  return { matches, loading, error };
}
