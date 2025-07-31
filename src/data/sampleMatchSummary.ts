import { getSummary } from '../utils/matchSummaryStorage';

// Auto-load all match summaries from JSON files when the module loads
const loadAllMatchSummaries = async () => {
  const matchIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  
  for (const matchId of matchIds) {
    try {
      const summary = await getSummary(matchId);
      if (summary) {
        console.log(`Loaded match ${matchId} summary from JSON`);
      } else {
        console.log(`No JSON file found for match ${matchId}, skipping...`);
      }
    } catch (error) {
      console.log(`Error loading match ${matchId}:`, error);
    }
  }
};

// Load summaries when module is imported
loadAllMatchSummaries();
