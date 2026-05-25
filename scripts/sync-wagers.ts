import "dotenv/config";
import { syncLeaderboardData } from "../lib/sync-service";

async function main() {
  try {
    const result = await syncLeaderboardData();
    console.log("Lifetime wager sync complete:", result);
    process.exit(0);
  } catch (error) {
    console.error("Lifetime wager sync failed:", error);
    process.exit(1);
  }
}

main();
