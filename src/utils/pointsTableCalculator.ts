import type { Team, PointsTableEntry, Match } from '../types/cricket';

/**
 * Calculate points table based on provided standings
 */
export const calculatePointsTable = (matches: Match[]): PointsTableEntry[] => {
  // Use the provided standings directly
  const standings = [
    { teamId: '8', teamName: 'Rising Stars', shortName: 'RS', played: 3, won: 3, lost: 0, tied: 0, points: 6, nrr: 13.698 },
    { teamId: '6', teamName: 'Rising Stars', shortName: 'RS', played: 3, won: 3, lost: 0, tied: 0, points: 6, nrr: 13.698 }, // Legacy ID
    { teamId: '5', teamName: 'Deccan Chargers', shortName: 'DC', played: 3, won: 2, lost: 1, tied: 0, points: 4, nrr: 0.146 },
    { teamId: '1', teamName: 'Royal Challengers Bengaluru', shortName: 'RCB', played: 3, won: 2, lost: 1, tied: 0, points: 4, nrr: -0.404 },
    { teamId: '4', teamName: 'Sunrisers Hyderabad', shortName: 'SRH', played: 3, won: 2, lost: 1, tied: 0, points: 4, nrr: -0.474 },
    { teamId: '2', teamName: 'Chennai Super Kings', shortName: 'CSK', played: 3, won: 1, lost: 2, tied: 0, points: 2, nrr: -4.200 },
    { teamId: '3', teamName: 'Mumbai Indians', shortName: 'MI', played: 2, won: 0, lost: 2, tied: 0, points: 0, nrr: -3.900 },
    { teamId: '7', teamName: 'SM Champions', shortName: 'SMC', played: 3, won: 0, lost: 3, tied: 0, points: 0, nrr: -5.823 }
  ];

  // Get all teams from matches to create proper Team objects
  const allTeams = new Set<Team>();
  matches.forEach(match => {
    if (match.team1) allTeams.add(match.team1);
    if (match.team2) allTeams.add(match.team2);
  });

  // Convert to points table entries
  const pointsTableEntries: PointsTableEntry[] = [];
  
  allTeams.forEach(team => {
    const standing = standings.find(s => s.teamId === team.id);
    if (standing) {
      pointsTableEntries.push({
        team,
        played: standing.played,
        won: standing.won,
        lost: standing.lost,
        tied: standing.tied,
        points: standing.points,
        nrr: standing.nrr,
        position: 0 // Will be set after sorting
      });
    }
  });

  // Sort by points (descending), then by NRR (descending), then by wins (descending)
  pointsTableEntries.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.nrr !== a.nrr) return b.nrr - a.nrr;
    return b.won - a.won;
  });

  // Set positions
  pointsTableEntries.forEach((entry, index) => {
    entry.position = index + 1;
  });

  return pointsTableEntries;
};
