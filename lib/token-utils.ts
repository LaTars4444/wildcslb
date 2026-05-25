export const TOKEN_RATE = 7.5;

export function earnedTokensFromLifetime(lifetimeWagered: number) {
  return Math.floor(lifetimeWagered / TOKEN_RATE);
}

export function lifetimeTokenDelta(lifetimeWagered: number, lifetimeTokenCredits: number) {
  return Math.max(0, earnedTokensFromLifetime(lifetimeWagered) - lifetimeTokenCredits);
}
