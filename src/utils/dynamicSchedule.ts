import { format, addDays, parseISO, isAfter, isBefore, isToday } from 'date-fns';
import type { Match, Team } from '../types/cricket';
import { teams } from '../data/mockData';

// Base tournament schedule template
const TOURNAMENT_SCHEDULE_TEMPLATE = [
  // Week 1
  { team1Id: '5', team2Id: '4', time: '15:30', venue: 'Rajiv Gandhi International Stadium, Hyderabad', dayOffset: -1 }, // Yesterday
  { team1Id: '6', team2Id: '1', time: '19:30', venue: 'Eden Gardens, Kolkata', dayOffset: 0 }, // Today - Upcoming at 7:30 PM
  { team1Id: '3', team2Id: '2', time: '19:30', venue: 'Wankhede Stadium, Mumbai', dayOffset: 1 }, // Tomorrow
  { team1Id: '5', team2Id: '7', time: '19:30', venue: 'Rajiv Gandhi International Stadium, Hyderabad', dayOffset: 2 },
  { team1Id: '4', team2Id: '6', time: '19:30', venue: 'Rajiv Gandhi International Stadium, Hyderabad', dayOffset: 3 },
  { team1Id: '1', team2Id: '2', time: '19:30', venue: 'M.Chinnaswamy Stadium, Bangalore', dayOffset: 4 },
  // Week 2
  { team1Id: '5', team2Id: '3', time: '15:30', venue: 'Rajiv Gandhi International Stadium, Hyderabad', dayOffset: 5 },
  { team1Id: '4', team2Id: '7', time: '19:30', venue: 'Rajiv Gandhi International Stadium, Hyderabad', dayOffset: 5 },
  { team1Id: '6', team2Id: '2', time: '15:30', venue: 'Eden Gardens, Kolkata', dayOffset: 6 },
  { team1Id: '1', team2Id: '7', time: '19:30', venue: 'M.Chinnaswamy Stadium, Bangalore', dayOffset: 6 },
  { team1Id: '6', team2Id: '3', time: '19:30', venue: 'Eden Gardens, Kolkata', dayOffset: 7 },
  { team1Id: '2', team2Id: '5', time: '19:30', venue: 'M.A. Chidambaram Stadium, Chennai', dayOffset: 8 },
  { team1Id: '7', team2Id: '3', time: '19:30', venue: 'PCA Stadium, Mohali', dayOffset: 9 },
  { team1Id: '4', team2Id: '2', time: '19:30', venue: 'Rajiv Gandhi International Stadium, Hyderabad', dayOffset: 10 },
  { team1Id: '6', team2Id: '5', time: '19:30', venue: 'Eden Gardens, Kolkata', dayOffset: 11 },
];

// Generate dynamic matches based on current date
export const generateDynamicMatches = (): Match[] => {
  const today = new Date();
  
  return TOURNAMENT_SCHEDULE_TEMPLATE.map((template, index) => {
    const matchDate = addDays(today, template.dayOffset);
    const matchDateString = format(matchDate, 'yyyy-MM-dd');
    
    // Find teams
    const team1 = teams.find((t: Team) => t.id === template.team1Id)!;
    const team2 = teams.find((t: Team) => t.id === template.team2Id)!;;
    
    // Determine match status based on date
    let status: 'completed' | 'live' | 'upcoming';
    let result: string | undefined;
    let winner: Team | undefined;
    
    if (isBefore(matchDate, today) && !isToday(matchDate)) {
      status = 'completed';
      // Specific results for known matches
      if (index === 0) { // First match: DC vs SRH
        winner = team2; // SRH (team2 in this match)
        result = `${team2.name} won by 6 wickets`;
      } else {
        // Random result for other completed matches
        const winnerTeam = Math.random() > 0.5 ? team1 : team2;
        const margin = Math.random() > 0.5 ? 
          `${Math.floor(Math.random() * 50) + 1} runs` : 
          `${Math.floor(Math.random() * 9) + 1} wickets`;
        result = `${winnerTeam.name} won by ${margin}`;
        winner = winnerTeam;
      }
    } else if (isToday(matchDate)) {
      status = 'live'; // Today's match is always live
    } else {
      status = 'upcoming'; // Future matches are upcoming
    }
    
    return {
      id: (index + 1).toString(),
      date: matchDateString,
      time: template.time,
      venue: template.venue,
      team1,
      team2,
      status,
      result,
      winner,
      matchType: 'group' as const,
      overs: 20
    };
  });
};

// Get matches for a specific date range
export const getMatchesForDateRange = (startDate: Date, endDate: Date): Match[] => {
  const allMatches = generateDynamicMatches();
  return allMatches.filter(match => {
    const matchDate = parseISO(match.date);
    return (isAfter(matchDate, startDate) || isToday(matchDate)) && 
           (isBefore(matchDate, endDate) || isToday(matchDate));
  });
};

// Get today's matches
export const getTodaysMatches = (): Match[] => {
  const allMatches = generateDynamicMatches();
  return allMatches.filter(match => isToday(parseISO(match.date)));
};

// Get live match
export const getLiveMatch = (): Match | undefined => {
  // Return today's match as live
  const todaysMatches = getTodaysMatches();
  return todaysMatches.length > 0 ? todaysMatches[0] : undefined;
};

// Get upcoming matches
export const getUpcomingMatches = (): Match[] => {
  const today = new Date();
  const allMatches = generateDynamicMatches();
  return allMatches.filter(match => 
    match.status === 'upcoming' && 
    isAfter(parseISO(match.date), today)
  );
};

// Get completed matches
export const getCompletedMatches = (): Match[] => {
  const allMatches = generateDynamicMatches();
  return allMatches.filter(match => match.status === 'completed');
};
