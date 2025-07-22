import { useState, useEffect } from 'react';
import type { Match, Team } from '../types/cricket';
import { loadTournamentSchedule } from '../utils/tournamentScheduleReader';

export function useTournamentSchedule(teams: Team[]) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const scheduleMatches = await loadTournamentSchedule(teams);
        setMatches(scheduleMatches);
      } catch (err) {
        console.error('Failed to load tournament schedule:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tournament schedule');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    if (teams.length > 0) {
      loadSchedule();
    }
  }, [teams]);

  return { matches, loading, error };
}
