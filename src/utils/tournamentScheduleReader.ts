import type { Match, Team } from '../types/cricket';

export interface ScheduleCSVRow {
  match: string;
  date: string;
  day: string;
  matchup: string;
  winner: string;
}

export class TournamentScheduleReader {
  private teams: Team[];
  private venues: string[] = [
    "Rajiv Gandhi International Stadium",
    "Eden Gardens, Kolkata", 
    "Wankhede Stadium, Mumbai",
    "M.Chinnaswamy Stadium, Bangalore",
    "Feroz Shah Kotla, Delhi",
    "MA Chidambaram Stadium, Chennai",
    "Sawai Mansingh Stadium, Jaipur"
  ];

  constructor(teams: Team[]) {
    this.teams = teams;
  }

  // Parse CSV content into match objects
  parseScheduleCSV(csvContent: string): Match[] {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    return lines.slice(1).map((line, index) => {
      const values = this.parseCSVLine(line);
      const row: any = {};
      
      headers.forEach((header, i) => {
        row[header] = values[i]?.trim() || '';
      });

      return this.convertRowToMatch(row, index);
    }).filter(match => match !== null) as Match[];
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  private convertRowToMatch(row: any, index: number): Match | null {
    const matchNumber = row.match || `${index + 1}`;
    const matchup = row.matchup || '';
    const dateStr = row['date (2025)'] || row.date || '';
    const winner = row.winner || '';

    // Parse team names from matchup
    const { team1, team2 } = this.parseMatchup(matchup);
    
    if (!team1 || !team2) {
      console.warn(`Could not parse matchup: ${matchup}`);
      return null;
    }

    // Convert date format from "July 20" to "2025-07-20"
    const fullDate = this.convertDateFormat(dateStr);
    
    // Determine match status
    const status = this.determineMatchStatus(fullDate, winner);
    
    // Get venue
    const venue = this.getVenueForMatch(index);
    
    // Get winner team if match is completed
    const winnerTeam = status === 'completed' && winner ? 
      this.findTeamByName(winner) : undefined;

    return {
      id: matchNumber,
      date: fullDate,
      time: this.getTimeForMatch(matchNumber, fullDate),
      venue: venue,
      team1: team1,
      team2: team2,
      status: status,
      matchType: this.getMatchType(matchNumber),
      overs: 5, // T5 format
      result: status === 'completed' && winner ? `${winner} won` : undefined,
      winner: winnerTeam || undefined
    };
  }

  private parseMatchup(matchup: string): { team1: Team | null, team2: Team | null } {
    // Handle special playoff matches
    if (matchup.includes('First vs Second') || matchup.includes('Qualifier')) {
      return { team1: null, team2: null }; // Will be determined later
    }
    if (matchup.includes('Third vs Fourth') || matchup.includes('Eliminator')) {
      return { team1: null, team2: null }; // Will be determined later
    }
    if (matchup.includes('Final')) {
      return { team1: null, team2: null }; // Will be determined later
    }

    const teams = matchup.split(' vs ').map(name => name.trim());
    if (teams.length !== 2) {
      return { team1: null, team2: null };
    }

    const team1 = this.findTeamByName(teams[0]);
    const team2 = this.findTeamByName(teams[1]);

    return { team1, team2 };
  }

  private findTeamByName(teamName: string): Team | null {
    const name = teamName.toLowerCase().trim();
    
    // Direct name matches
    const exactMatch = this.teams.find(team => 
      team.name.toLowerCase() === name ||
      team.shortName.toLowerCase() === name
    );
    
    if (exactMatch) return exactMatch;

    // Partial matches
    const partialMatch = this.teams.find(team => 
      team.name.toLowerCase().includes(name) ||
      name.includes(team.name.toLowerCase()) ||
      name.includes(team.shortName.toLowerCase())
    );
    
    return partialMatch || null;
  }

  private convertDateFormat(dateStr: string): string {
    const months: { [key: string]: string } = {
      'january': '01', 'february': '02', 'march': '03', 'april': '04',
      'may': '05', 'june': '06', 'july': '07', 'august': '08',
      'september': '09', 'october': '10', 'november': '11', 'december': '12'
    };

    // Parse "July 20" format
    const parts = dateStr.toLowerCase().split(' ');
    if (parts.length !== 2) return dateStr;

    const month = months[parts[0]];
    const day = parts[1].padStart(2, '0');
    
    if (!month) return dateStr;
    
    return `2025-${month}-${day}`;
  }

  private determineMatchStatus(dateStr: string, winner: string): 'upcoming' | 'live' | 'completed' {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    if (winner && winner.trim() !== '') {
      return 'completed';
    }
    
    if (dateStr === todayStr) {
      return 'live';
    }
    
    const matchDate = new Date(dateStr);
    return matchDate < today ? 'completed' : 'upcoming';
  }

  private getTimeForMatch(matchNumber: string, dateStr: string): string {
    const num = parseInt(matchNumber);
    
    // Today's match should be at 7:30 PM
    const today = new Date().toISOString().split('T')[0];
    if (dateStr === today) {
      return '19:30';
    }
    
    // Stagger match times for same date
    const times = ['15:30', '19:30'];
    return times[num % 2];
  }

  private getVenueForMatch(index: number): string {
    return this.venues[index % this.venues.length];
  }

  private getMatchType(matchNumber: string): 'group' | 'semi-final' | 'final' {
    const num = parseInt(matchNumber);
    
    if (num >= 43 && num <= 45) return 'semi-final';
    if (num === 46) return 'final';
    return 'group';
  }
}

// Utility function to load schedule from CSV
export async function loadTournamentSchedule(teams: Team[]): Promise<Match[]> {
  try {
    const response = await fetch('/data/schedule.csv');
    if (!response.ok) {
      throw new Error(`Failed to load schedule: ${response.statusText}`);
    }
    
    const csvContent = await response.text();
    const reader = new TournamentScheduleReader(teams);
    
    return reader.parseScheduleCSV(csvContent);
  } catch (error) {
    console.error('Error loading tournament schedule:', error);
    return [];
  }
}
