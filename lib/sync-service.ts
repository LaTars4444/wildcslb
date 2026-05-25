import { prisma } from "@/lib/db";
import { TOKEN_RATE } from "@/lib/token-utils";

interface ExternalWagerTotal {
  userId: string;
  lifetimeWagered: number;
}

async function fetchExternalLifetimeWagers(): Promise<ExternalWagerTotal[]> {
  // TODO: replace this placeholder with a real platform integration.
  // Example: fetch lifetime wager totals from your provider's API and return them keyed by your internal user ID.
  return [];
}

export async function syncLeaderboardData() {
  try {
    const externalWagers = await fetchExternalLifetimeWagers();
    const externalMap = new Map(externalWagers.map((item) => [item.userId, item.lifetimeWagered]));

    const users = await prisma.user.findMany();
    let updatedCount = 0;

    for (const user of users) {
      const externalLifetime = externalMap.get(user.id);
      const targetLifetime = externalLifetime != null && externalLifetime > user.lifetimeWagered ? externalLifetime : user.lifetimeWagered;
      const lifetimeTokenCredits = user.lifetimeTokenCredits ?? 0;
      const earnedTokens = Math.floor(targetLifetime / TOKEN_RATE);
      const tokenDelta = Math.max(0, earnedTokens - lifetimeTokenCredits);

      const data: Record<string, unknown> = {};
      if (targetLifetime !== user.lifetimeWagered) {
        data.lifetimeWagered = targetLifetime;
      }
      if (tokenDelta > 0) {
        data.tokens = { increment: tokenDelta };
        data.lifetimeTokenCredits = earnedTokens;
      }

      if (Object.keys(data).length > 0) {
        await prisma.user.update({
          where: { id: user.id },
          data,
        });
        updatedCount += 1;
      }
    }

    return { success: true, updatedCount };
  } catch (error) {
    console.error("syncLeaderboardData error", error);
    throw error;
  }
}
