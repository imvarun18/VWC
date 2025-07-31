// Script to verify NRR calculations
console.log('Verifying NRR calculations for all teams...\n');

// Match data
const matches = [
  // Match 1: DC vs SRH (SRH won)
  { team1: 'DC', runs1: 30, wickets1: 6, overs1: 5.0, team2: 'SRH', runs2: 34, wickets2: 4, overs2: 3.4 },
  // Match 2: RS vs RCB (RS won)
  { team1: 'RS', runs1: 71, wickets1: 8, overs1: 5.0, team2: 'RCB', runs2: 20, wickets2: 9, overs2: 5.0 },
  // Match 3: CSK vs MI (CSK won)
  { team1: 'CSK', runs1: 55, wickets1: 1, overs1: 5.0, team2: 'MI', runs2: 21, wickets2: 6, overs2: 5.0 },
  // Match 4: SMC vs DC (DC won)
  { team1: 'SMC', runs1: 32, wickets1: 6, overs1: 5.0, team2: 'DC', runs2: 33, wickets2: 2, overs2: 3.4 },
  // Match 5: SRH vs RS (RS won)
  { team1: 'SRH', runs1: 14, wickets1: 5, overs1: 5.0, team2: 'RS', runs2: 18, wickets2: 3, overs2: 1.2 },
  // Match 6: CSK vs RCB (RCB won)
  { team1: 'CSK', runs1: 50, wickets1: 9, overs1: 5.0, team2: 'RCB', runs2: 52, wickets2: 1, overs2: 4.3 },
  // Match 7: DC vs MI (DC won)
  { team1: 'DC', runs1: 22, wickets1: 4, overs1: 5.0, team2: 'MI', runs2: 17, wickets2: 6, overs2: 5.0 },
  // Match 8: SMC vs SRH (SRH won)
  { team1: 'SMC', runs1: 44, wickets1: 3, overs1: 5.0, team2: 'SRH', runs2: 45, wickets2: 0, overs2: 3.3 },
  // Match 9: RS vs CSK (RS won)
  { team1: 'RS', runs1: 101, wickets1: 2, overs1: 5.0, team2: 'CSK', runs2: 12, wickets2: 10, overs2: 5.0 },
  // Match 10: SMC vs RCB (RCB won)
  { team1: 'SMC', runs1: 9, wickets1: 10, overs1: 3.4, team2: 'RCB', runs2: 12, wickets2: 0, overs2: 0.4 },
];

// Team name mapping
const teams = ['RS', 'DC', 'RCB', 'SRH', 'CSK', 'MI', 'SMC'];

// Calculate NRR for each team
teams.forEach(team => {
  let runsScored = 0, oversFaced = 0, runsConceded = 0, oversBowled = 0;
  
  matches.forEach(match => {
    if (match.team1 === team) {
      // Team batting first
      runsScored += match.runs1;
      oversFaced += match.overs1;
      runsConceded += match.runs2;
      oversBowled += match.overs2;
    } else if (match.team2 === team) {
      // Team batting second
      runsScored += match.runs2;
      oversFaced += match.overs2;
      runsConceded += match.runs1;
      oversBowled += match.overs1;
    }
  });
  
  const runRate = oversFaced > 0 ? runsScored / oversFaced : 0;
  const concededRate = oversBowled > 0 ? runsConceded / oversBowled : 0;
  const nrr = runRate - concededRate;
  
  console.log(`${team}: Runs ${runsScored}/${oversFaced.toFixed(1)} overs = ${runRate.toFixed(3)}, Conceded ${runsConceded}/${oversBowled.toFixed(1)} overs = ${concededRate.toFixed(3)}, NRR = ${nrr.toFixed(3)}`);
});

console.log('\nExpected NRR from points table:');
console.log('RS: 13.698');
console.log('DC: 0.146');
console.log('RCB: -0.404');
console.log('SRH: -0.474');
console.log('CSK: -4.200');
console.log('MI: -3.900');
console.log('SMC: -5.823');
