import type { Match, Team } from '../types/cricket';

export interface CSVMatch {
  id: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  matchType: 'group' | 'knockout' | 'final';
  result?: string;
  overs: number;
}

export class ScheduleCSVReader {
  private teams: Team[];

  constructor(teams: Team[]) {
    this.teams = teams;
  }

  // Parse CSV content into match objects
  parseCSV(csvContent: string): CSVMatch[] {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map((line, index) => {
      const values = this.parseCSVLine(line);
      const match: any = {};
      
      headers.forEach((header, i) => {
        match[header.toLowerCase()] = values[i]?.trim() || '';
      });

      // Ensure required fields have defaults
      return {
        id: match.id || `match-${index + 1}`,
        date: match.date || '',
        time: match.time || '19:30',
        team1: match.team1 || '',
        team2: match.team2 || '',
        venue: match.venue || '',
        status: match.status || 'upcoming',
        matchType: match.matchtype || 'group',
        result: match.result || undefined,
        overs: parseInt(match.overs) || 20
      } as CSVMatch;
    });
  }

  // Handle CSV parsing with quoted fields
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

  // Convert CSV matches to app Match format
  convertToMatches(csvMatches: CSVMatch[]): Match[] {
    return csvMatches.map(csvMatch => {
      const team1 = this.findTeamByName(csvMatch.team1);
      const team2 = this.findTeamByName(csvMatch.team2);

      if (!team1 || !team2) {
        console.warn(`Could not find teams: ${csvMatch.team1} or ${csvMatch.team2}`);
      }

      return {
        id: csvMatch.id,
        date: csvMatch.date,
        time: csvMatch.time,
        venue: csvMatch.venue,
        team1: team1 || this.createTempTeam(csvMatch.team1),
        team2: team2 || this.createTempTeam(csvMatch.team2),
        status: csvMatch.status,
        matchType: csvMatch.matchType,
        overs: csvMatch.overs,
        result: csvMatch.result,
        winner: csvMatch.status === 'completed' && csvMatch.result ? 
          this.determineWinner(csvMatch.result, team1, team2) : undefined
      } as Match;
    });
  }

  // Find team by name (handles partial matches)
  private findTeamByName(teamName: string): Team | undefined {
    const name = teamName.toLowerCase().trim();
    
    return this.teams.find(team => 
      team.name.toLowerCase() === name ||
      team.shortName.toLowerCase() === name ||
      team.name.toLowerCase().includes(name) ||
      name.includes(team.shortName.toLowerCase())
    );
  }

  // Create temporary team object for unmatched teams
  private createTempTeam(teamName: string): Team {
    return {
      id: `temp-${teamName.replace(/\s+/g, '-').toLowerCase()}`,
      name: teamName,
      shortName: teamName.substring(0, 3).toUpperCase(),
      captain: 'TBD',
      coach: 'TBD',
      homeGround: 'TBD'
    };
  }

  // Determine winner from result string
  private determineWinner(result: string, team1?: Team, team2?: Team): Team | undefined {
    if (!team1 || !team2) return undefined;
    
    const resultLower = result.toLowerCase();
    const team1Lower = team1.name.toLowerCase();
    const team2Lower = team2.name.toLowerCase();
    
    if (resultLower.includes(team1Lower) || resultLower.includes(team1.shortName.toLowerCase())) {
      return team1;
    } else if (resultLower.includes(team2Lower) || resultLower.includes(team2.shortName.toLowerCase())) {
      return team2;
    }
    
    return undefined;
  }
}

// Utility function to load CSV from public folder
export async function loadScheduleFromCSV(teams: Team[], csvFileName: string = 'schedule.csv'): Promise<Match[]> {
  try {
    const response = await fetch(`/data/${csvFileName}`);
    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${response.statusText}`);
    }
    
    const csvContent = await response.text();
    const reader = new ScheduleCSVReader(teams);
    const csvMatches = reader.parseCSV(csvContent);
    
    return reader.convertToMatches(csvMatches);
  } catch (error) {
    console.error('Error loading schedule from CSV:', error);
    return [];
  }
}

// Example CSV format:
export const EXAMPLE_CSV_FORMAT = `
id,date,time,team1,team2,venue,status,matchType,overs,result
1,2025-07-21,19:30,Royal Challengers Bengaluru,Chennai Super Kings,"Wankhede Stadium, Mumbai",live,group,20,
2,2025-07-21,15:30,Mumbai Indians,Sunrisers Hyderabad,"Eden Gardens, Kolkata",completed,group,20,Mumbai Indians won by 6 wickets
3,2025-07-22,19:30,Deccan Chargers,Rising Stars,"M.Chinnaswamy Stadium, Bangalore",upcoming,group,20,
`.trim();
