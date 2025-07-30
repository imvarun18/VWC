import type { Team, Match, Player, PointsTableEntry, TournamentUpdate, LiveScore } from '../types/cricket';

export const teams: Team[] = [
  {
    id: '1',
    name: 'Royal Challengers Bengaluru',
    shortName: 'RCB',
    captain: 'Varunsai',
    coach: 'Andy Flower',
    homeGround: 'M.Chinnaswamy Stadium'
  },
  {
    id: '2',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    captain: 'Lokesh',
    coach: 'Stephen Fleming',
    homeGround: 'M.A. Chidambaram Stadium'
  },
  {
    id: '3',
    name: 'Mumbai Indians',
    shortName: 'MI',
    captain: 'Anjaneyulu',
    coach: 'Mahela Jayawardene',
    homeGround: 'Wankhede Stadium'
  },
  {
    id: '4',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    captain: 'Sharan',
    coach: 'Daniel Vettori',
    homeGround: 'Rajiv Gandhi International Stadium'
  },
  {
    id: '5',
    name: 'Deccan Chargers',
    shortName: 'DC',
    captain: 'Hemanth',
    coach: 'VVS Laxman',
    homeGround: 'Rajiv Gandhi International Stadium'
  },
  {
    id: '6',
    name: 'Rising Stars',
    shortName: 'RS',
    captain: 'Saketh',
    coach: 'Rahul Dravid',
    homeGround: 'Eden Gardens'
  },
  {
    id: '7',
    name: 'SM Champions',
    shortName: 'SMC',
    captain: 'Shivamani',
    coach: 'Anil Kumble',
    homeGround: 'PCA Stadium'
  }
];

export const players: Player[] = [
  // Royal Challengers Bengaluru - Captain
  { id: '1', name: 'Varunsai', teamId: '1', role: 'batsman', battingStyle: 'right-handed' },
  
  // Royal Challengers Bengaluru - Regular players with unique IDs
  { id: 'patel_a_rcb', name: 'A.Patel', teamId: '1', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: 'samson_s_rcb', name: 'S.Samson', teamId: '1', role: 'wicket-keeper', battingStyle: 'right-handed' },
  { id: 'sharma_r_rcb', name: 'R.Sharma', teamId: '1', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'bishnoi_r_rcb', name: 'R.Bishnoi', teamId: '1', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'pandya_h_rcb', name: 'H.Pandya', teamId: '1', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'chahal_y_rcb', name: 'Y.Chahal', teamId: '1', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'singh_a_rcb', name: 'A.Singh', teamId: '1', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'bumrah_j_rcb', name: 'J.Bumrah', teamId: '1', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'yadav_k_rcb', name: 'K.Yadav', teamId: '1', role: 'bowler', battingStyle: 'left-handed', bowlingStyle: 'leg-break' },
  { id: 'gill_s_rcb', name: 'S.Gill', teamId: '1', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'kumar_b_rcb', name: 'B.Kumar', teamId: '1', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'kohli_v_rcb', name: 'V.Kohli', teamId: '1', role: 'batsman', battingStyle: 'right-handed' },
  
  // Chennai Super Kings - Captain
  { id: '4', name: 'Lokesh', teamId: '2', role: 'wicket-keeper', battingStyle: 'right-handed' },
  
  // Chennai Super Kings - Regular players with unique IDs
  { id: 'pandya_h_csk', name: 'H.Pandya', teamId: '2', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'shami_m_csk', name: 'M.Shami', teamId: '2', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'bishnoi_r_csk', name: 'R.Bishnoi', teamId: '2', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'jadeja_r_csk', name: 'R.Jadeja', teamId: '2', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: 'bumrah_j_csk', name: 'J.Bumrah', teamId: '2', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'yadav_s_csk', name: 'S.Yadav', teamId: '2', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'sharma_r_csk', name: 'R.Sharma', teamId: '2', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'kohli_v_csk', name: 'V.Kohli', teamId: '2', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'varma_t_csk', name: 'T.Varma', teamId: '2', role: 'batsman', battingStyle: 'left-handed' },
  
  // Mumbai Indians - Captain
  { id: '7', name: 'Anjaneyulu', teamId: '3', role: 'batsman', battingStyle: 'right-handed' },
  
  // Mumbai Indians - Regular players with unique IDs
  { id: 'sharma_r_mi', name: 'R.Sharma', teamId: '3', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'kishan_i_mi', name: 'I.Kishan', teamId: '3', role: 'wicket-keeper', battingStyle: 'left-handed' },
  { id: 'pandya_h_mi', name: 'H.Pandya', teamId: '3', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'patel_a_mi', name: 'A.Patel', teamId: '3', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: 'varma_t_mi', name: 'T.Varma', teamId: '3', role: 'batsman', battingStyle: 'left-handed' },
  { id: 'bumrah_j_mi', name: 'J.Bumrah', teamId: '3', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'shami_m_mi', name: 'M.Shami', teamId: '3', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'jadeja_r_mi', name: 'R.Jadeja', teamId: '3', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: 'reddy_n_mi', name: 'N.Reddy', teamId: '3', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'jaiswal_y_mi', name: 'Y.Jaiswal', teamId: '3', role: 'batsman', battingStyle: 'left-handed' },
  { id: 'bishnoi_r_mi', name: 'R.Bishnoi', teamId: '3', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'pant_r_mi', name: 'R.Pant', teamId: '3', role: 'wicket-keeper', battingStyle: 'left-handed' },
  
  // Sunrisers Hyderabad - Captain
  { id: '10', name: 'Sharan', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  
  // Sunrisers Hyderabad - Regular players with unique IDs
  { id: 'maxwell_g_srh', name: 'G.Maxwell', teamId: '4', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'off-break' },
  { id: 'head_t_srh', name: 'T.Head', teamId: '4', role: 'batsman', battingStyle: 'left-handed' },
  { id: 'pandya_h_srh', name: 'H.Pandya', teamId: '4', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'jadeja_r_srh', name: 'R.Jadeja', teamId: '4', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: 'starc_m_srh', name: 'M.Starc', teamId: '4', role: 'bowler', battingStyle: 'left-handed', bowlingStyle: 'left-arm-fast' },
  { id: 'finch_a_srh', name: 'A.Finch', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'smith_s_srh', name: 'S.Smith', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'david_t_srh', name: 'T.David', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'patel_a_srh', name: 'A.Patel', teamId: '4', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: 'singh_a_srh', name: 'A.Singh', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'bumrah_j_srh', name: 'J.Bumrah', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'bishnoi_r_srh', name: 'R.Bishnoi', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'markram_a_srh', name: 'A.Markram', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'klaasen_h_srh', name: 'H.Klaasen', teamId: '4', role: 'wicket-keeper', battingStyle: 'right-handed' },
  { id: 'hendricks_r_srh', name: 'R.Hendricks', teamId: '4', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'miller_d_srh', name: 'D.Miller', teamId: '4', role: 'batsman', battingStyle: 'left-handed' },
  { id: 'yadav_k_srh', name: 'K.Yadav', teamId: '4', role: 'bowler', battingStyle: 'left-handed', bowlingStyle: 'leg-break' },
  { id: 'chahal_y_srh', name: 'Y.Chahal', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'lyon_n_srh', name: 'N.Lyon', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'off-break' },
  { id: 'hazlewood_j_srh', name: 'J.Hazlewood', teamId: '4', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  
  // Deccan Chargers - Captain
  { id: '13', name: 'Hemanth', teamId: '5', role: 'batsman', battingStyle: 'left-handed' },
  
  // Deccan Chargers - Regular players with unique IDs
  { id: 'reddy_n_dc', name: 'N.Reddy', teamId: '5', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'varma_t_dc', name: 'T.Varma', teamId: '5', role: 'batsman', battingStyle: 'left-handed' },
  { id: 'pant_r_dc', name: 'R.Pant', teamId: '5', role: 'wicket-keeper', battingStyle: 'left-handed' },
  { id: 'jaiswal_y_dc', name: 'Y.Jaiswal', teamId: '5', role: 'batsman', battingStyle: 'left-handed' },
  { id: 'hazlewood_j_dc', name: 'J.Hazlewood', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'starc_m_dc', name: 'M.Starc', teamId: '5', role: 'bowler', battingStyle: 'left-handed', bowlingStyle: 'left-arm-fast' },
  { id: 'lyon_n_dc', name: 'N.Lyon', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'off-break' },
  { id: 'kohli_v_dc', name: 'V.Kohli', teamId: '5', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'pandya_h_dc', name: 'H.Pandya', teamId: '5', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'bishnoi_r_dc', name: 'R.Bishnoi', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'gill_s_dc', name: 'S.Gill', teamId: '5', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'cummins_p_dc', name: 'P.Cummins', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'williamson_k_dc', name: 'K.Williamson', teamId: '5', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'patel_a_dc', name: 'A.Patel', teamId: '5', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: 'khan_r_dc', name: 'R.Khan', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'singh_a_dc', name: 'A.Singh', teamId: '5', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  
  // Rising Stars - Captain
  { id: '16', name: 'Saketh', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  
  // Rising Stars - Regular players with unique IDs
  { id: 'kohli_v_rs', name: 'V.Kohli', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'reddy_n_rs', name: 'N.Reddy', teamId: '6', role: 'all-rounder', battingStyle: 'right-handed' },
  { id: 'sharma_r_rs', name: 'R.Sharma', teamId: '6', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'yadav_k_rs', name: 'K.Yadav', teamId: '6', role: 'bowler', battingStyle: 'left-handed', bowlingStyle: 'leg-break' },
  { id: 'singh_a_rs', name: 'A.Singh', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'bumrah_j_rs', name: 'J.Bumrah', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'bishnoi_r_rs', name: 'R.Bishnoi', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  { id: 'pandya_h_rs', name: 'H.Pandya', teamId: '6', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'ngidi_l_rs', name: 'L.Ngidi', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'rabada_k_rs', name: 'K.Rabada', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' },
  { id: 'de_kock_q_rs', name: 'Q.de Kock', teamId: '6', role: 'wicket-keeper', battingStyle: 'left-handed' },
  { id: 'pant_r_rs', name: 'R.Pant', teamId: '6', role: 'wicket-keeper', battingStyle: 'left-handed' },
  { id: 'dube_s_rs', name: 'S.Dube', teamId: '6', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'kishan_i_rs', name: 'I.Kishan', teamId: '6', role: 'wicket-keeper', battingStyle: 'left-handed' },
  { id: 'chahal_y_rs', name: 'Y.Chahal', teamId: '6', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'leg-break' },
  
  // SM Champions - Captain
  { id: '19', name: 'Shivamani', teamId: '7', role: 'wicket-keeper', battingStyle: 'right-handed' },
  
  // SM Champions - Regular players with unique IDs
  { id: 'sharma_r_smc', name: 'R.Sharma', teamId: '7', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'pant_r_smc', name: 'R.Pant', teamId: '7', role: 'wicket-keeper', battingStyle: 'left-handed' },
  { id: 'kohli_v_smc', name: 'V.Kohli', teamId: '7', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'yadav_s_smc', name: 'S.Yadav', teamId: '7', role: 'batsman', battingStyle: 'right-handed' },
  { id: 'pandya_h_smc', name: 'H.Pandya', teamId: '7', role: 'all-rounder', battingStyle: 'right-handed', bowlingStyle: 'right-arm-medium' },
  { id: 'jadeja_r_smc', name: 'R.Jadeja', teamId: '7', role: 'all-rounder', battingStyle: 'left-handed', bowlingStyle: 'left-arm-orthodox' },
  { id: 'shami_m_smc', name: 'M.Shami', teamId: '7', role: 'bowler', battingStyle: 'right-handed', bowlingStyle: 'right-arm-fast' }
];

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const matches: Match[] = [
  // Match 1 - July 20 (COMPLETED)
  {
    id: '1',
    date: '2025-07-20',
    time: '15:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[4], // Deccan Chargers
    team2: teams[3], // Sunrisers Hyderabad
    status: 'completed',
    result: 'Sunrisers Hyderabad won by 6 wickets',
    winner: teams[3],
    matchType: 'group',
    overs: 5
  },
  // Match 2 - July 21 (COMPLETED)
  {
    id: '2',
    date: '2025-07-21',
    time: '19:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[0], // Royal Challengers Bengaluru
    status: 'completed',
    result: 'Rising Stars won by 51 runs',
    winner: teams[5],
    matchType: 'group',
    overs: 5
  },
  // Match 3 - July 22 (COMPLETED)
  {
    id: '3',
    date: '2025-07-22',
    time: '19:30',
    venue: 'Wankhede Stadium, Mumbai',
    team1: teams[2], // Mumbai Indians
    team2: teams[1], // Chennai Super Kings
    status: 'completed',
    result: 'Chennai Super Kings won by 34 runs',
    winner: teams[1], // Chennai Super Kings
    matchType: 'group',
    overs: 5
  },
  // Match 4 - July 23 (COMPLETED)
  {
    id: '4',
    date: '2025-07-23',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[4], // Deccan Chargers
    team2: teams[6], // SM Champions
    status: 'completed',
    result: 'Deccan Chargers won by 8 wickets',
    winner: teams[4], // Deccan Chargers
    matchType: 'group',
    overs: 5
  },
  // Match 5 - July 24 (LIVE - Current Match)
  {
    id: '5',
    date: '2025-07-24',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[3], // Sunrisers Hyderabad
    team2: teams[5], // Rising Stars
    status: 'completed',
    result: 'RS won by 7 wickets',
    winner: teams[5], // Rising Stars
    matchType: 'group',
    overs: 5
  },
  // Match 6 - July 25 (UPCOMING)
  {
    id: '6',
    date: '2025-07-25',
    time: '19:30',
    venue: 'M.Chinnaswamy Stadium, Bangalore',
    team1: teams[0], // Royal Challengers Bengaluru
    team2: teams[1], // Chennai Super Kings
    status: 'completed',
    result: 'RCB won by 9 wickets',
    winner: teams[0], // Royal Challengers Bengaluru
    matchType: 'group',
    overs: 20
  },
  // Match 7 - July 26 (Morning)
  {
    id: '7',
    date: '2025-07-26',
    time: '15:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[4], // Deccan Chargers
    team2: teams[2], // Mumbai Indians
    status: 'completed',
    result: 'DC won by 5 runs',
    winner: teams[4], // Deccan Chargers
    matchType: 'group',
    overs: 20
  },
  // Match 8 - July 26 (Evening)
  {
    id: '8',
    date: '2025-07-26',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[3], // Sunrisers Hyderabad
    team2: teams[6], // SM Champions
    status: 'completed',
    result: 'SRH won by 10 wickets',
    winner: teams[3], // Sunrisers Hyderabad
    matchType: 'group',
    overs: 20
  },
  // Match 9 - July 27 (Morning)
  {
    id: '9',
    date: '2025-07-27',
    time: '15:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[1], // Chennai Super Kings
    status: 'completed',
    result: 'RS won by 89 runs',
    winner: teams[5], // Rising Stars
    matchType: 'group',
    overs: 20
  },
  // Match 10 - July 27 (Evening)
  {
    id: '10',
    date: '2025-07-27',
    time: '19:30',
    venue: 'M.Chinnaswamy Stadium, Bangalore',
    team1: teams[0], // Royal Challengers Bengaluru
    team2: teams[6], // SM Champions
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 11 - July 28
  {
    id: '11',
    date: '2025-07-28',
    time: '19:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[2], // Mumbai Indians
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 12 - July 29
  {
    id: '12',
    date: '2025-07-29',
    time: '19:30',
    venue: 'M.A. Chidambaram Stadium, Chennai',
    team1: teams[1], // Chennai Super Kings
    team2: teams[4], // Deccan Chargers
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 13 - July 30
  {
    id: '13',
    date: '2025-07-30',
    time: '19:30',
    venue: 'PCA Stadium, Mohali',
    team1: teams[6], // SM Champions
    team2: teams[2], // Mumbai Indians
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 14 - July 31
  {
    id: '14',
    date: '2025-07-31',
    time: '19:30',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    team1: teams[3], // Sunrisers Hyderabad
    team2: teams[1], // Chennai Super Kings
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  },
  // Match 15 - August 1
  {
    id: '15',
    date: '2025-08-01',
    time: '19:30',
    venue: 'Eden Gardens, Kolkata',
    team1: teams[5], // Rising Stars
    team2: teams[4], // Deccan Chargers
    status: 'upcoming',
    matchType: 'group',
    overs: 20
  }
];

export const pointsTable: PointsTableEntry[] = [
  {
    team: teams[0], // Royal Challengers Bengaluru
    played: 6,
    won: 5,
    lost: 1,
    tied: 0,
    nrr: 1.45,
    points: 10,
    position: 1
  },
  {
    team: teams[1], // Chennai Super Kings
    played: 6,
    won: 4,
    lost: 2,
    tied: 0,
    nrr: 0.89,
    points: 8,
    position: 2
  },
  {
    team: teams[2], // Mumbai Indians
    played: 6,
    won: 4,
    lost: 2,
    tied: 0,
    nrr: 0.72,
    points: 8,
    position: 3
  },
  {
    team: teams[3], // Sunrisers Hyderabad
    played: 6,
    won: 3,
    lost: 3,
    tied: 0,
    nrr: 0.23,
    points: 6,
    position: 4
  },
  {
    team: teams[4], // Deccan Chargers
    played: 6,
    won: 2,
    lost: 4,
    tied: 0,
    nrr: -0.45,
    points: 4,
    position: 5
  },
  {
    team: teams[5], // Rising Stars
    played: 6,
    won: 2,
    lost: 4,
    tied: 0,
    nrr: -0.67,
    points: 4,
    position: 6
  },
  {
    team: teams[6], // SM Champions
    played: 6,
    won: 1,
    lost: 5,
    tied: 0,
    nrr: -1.28,
    points: 2,
    position: 7
  }
];

export const tournamentUpdates: TournamentUpdate[] = [
  {
    id: '1',
    title: 'RC24 Virtual Willow Championship Kicks Off!',
    content: 'The much-awaited RC24 Virtual Willow Championship has begun with exciting matches and outstanding performances from all teams.',
    date: '2025-07-20',
    type: 'announcement',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Sunrisers Hyderabad Win Tournament Opener',
    content: 'Sunrisers Hyderabad defeated Deccan Chargers by 6 wickets in the thrilling T5 format opening match at Rajiv Gandhi International Stadium. SRH chased down DC\'s 30/6 with ease, reaching 34/4 in just 3.4 overs.',
    date: '2025-07-20',
    type: 'result',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Rising Stars Dominate Royal Challengers Bengaluru',
    content: 'Rising Stars delivered a commanding performance, defeating Royal Challengers Bengaluru by 51 runs in a T5 format match at Eden Gardens. V.Kohli\'s unbeaten 31 led Rising Stars to 71/8 in 5 overs, while RCB could only manage 20/9 in reply.',
    date: '2025-07-21',
    type: 'result',
    priority: 'high'
  },
  {
    id: '4',
    title: 'Chennai Super Kings Crush Mumbai Indians',
    content: 'Chennai Super Kings delivered a dominant performance at Wankhede Stadium, defeating Mumbai Indians by 34 runs. R.Pant\'s brilliant unbeaten 35 powered CSK to 55/1 in 5 overs, while MI were restricted to just 21/6 in reply.',
    date: '2025-07-22',
    type: 'result',
    priority: 'high'
  },
  {
    id: '5',
    title: 'Deccan Chargers Dominate SM Champions',
    content: 'Deccan Chargers delivered a commanding bowling performance after winning the toss and electing to bowl. They restricted SM Champions to just 32/6 in 5 overs before chasing down the target comfortably in 3.4 overs, winning by 8 wickets.',
    date: '2025-07-23',
    type: 'result',
    priority: 'high'
  },
  {
    id: '6',
    title: 'Live Now: Sunrisers Hyderabad vs Rising Stars',
    content: 'The action continues today at Rajiv Gandhi International Stadium as Sunrisers Hyderabad take on Rising Stars. Both teams look to continue their winning momentum in this crucial T5 format encounter!',
    date: '2025-07-24',
    type: 'announcement',
    priority: 'high'
  },
  {
    id: '7',
    title: 'Weather Update: Perfect Conditions Ahead',
    content: 'Clear skies and perfect cricket conditions expected for all upcoming matches this week.',
    date: '2025-07-21',
    type: 'announcement',
    priority: 'low'
  }
];

// Mock live score data - Match 5: Sunrisers Hyderabad vs Rising Stars (Today's Live Match)
export const currentLiveScore: LiveScore = {
  matchId: '5',
  currentInnings: {
    id: 'inn1',
    matchId: '5',
    battingTeam: teams[3], // Sunrisers Hyderabad
    bowlingTeam: teams[5], // Rising Stars
    innings: 1,
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    extras: {
      byes: 0,
      legByes: 0,
      wides: 0,
      noBalls: 0,
      penalties: 0
    },
    isCompleted: false
  },
  recentBalls: [],
  currentBatsmen: {
    striker: {
      player: players.find(p => p.teamId === '4') || players[0], // SRH player
      stats: {
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strikeRate: 0,
        isOut: false
      }
    },
    nonStriker: {
      player: players.find(p => p.teamId === '4' && p.name !== (players.find(p => p.teamId === '4') || players[0]).name) || players[1], // Another SRH player
      stats: {
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strikeRate: 0,
        isOut: false
      }
    }
  },
  currentBowler: {
    player: players.find(p => p.teamId === '6') || players[0], // Rising Stars bowler
    stats: {
      overs: 0,
      maidens: 0,
      runs: 0,
      wickets: 0,
      economy: 0,
      dotBalls: 0
    }
  },
  partnership: {
    runs: 0,
    balls: 0,
    strikeRate: 0
  },
  target: 0,
  requiredRunRate: 0
};
