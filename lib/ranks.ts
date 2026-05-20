export const rankNames = [
  "Bronze",
  "Bronze II",
  "Bronze I",
  "Iron",
  "Iron II",
  "Silver",
  "Silver II",
  "Gold",
  "Gold II",
  "Platinum",
  "Platinum II",
  "Diamond",
  "Diamond II",
  "Emerald",
  "Sapphire",
  "Amethyst",
  "Topaz",
  "Obsidian",
  "Titanium",
  "Ruby",
];

export const thresholds = [
  0, 50, 120, 210, 330, 480, 660, 870, 1100, 1360,
  1650, 1960, 2300, 2660, 3040, 3440, 3860, 4300, 4760, 5240,
];

export function getRankIndex(xp: number): number {
  let idx = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) idx = i;
  }
  return Math.min(idx, rankNames.length - 1);
}

export function getRankName(xp: number): string {
  return rankNames[getRankIndex(xp)];
}

export function getNextThreshold(xp: number) {
  const idx = getRankIndex(xp);
  if (idx >= thresholds.length - 1) return { next: thresholds[thresholds.length - 1], diff: 0 };
  return { next: thresholds[idx + 1], diff: thresholds[idx + 1] - xp };
}

export function getMultiplier(rankIndex: number) {
  return Math.pow(1.15, rankIndex);
}
