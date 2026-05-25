export type Period = "daily" | "weekly" | "monthly" | "all";

export interface User {
  id: string;
  username: string;
  avatar?: string | null;
  totalWagered: number;
  weeklyWagered: number;
  monthlyWagered: number;
  tokens: number;
  watchTime: number;
  vipTier: string;
  streakDays: number;
  clashId?: string;
  chipsId?: string;
  daddySkinsId?: string;
}

export interface Reward {
  id: string;
  userId: string;
  type: string;
  amount: number;
  claimed: boolean;
  claimedAt?: string | null;
  createdAt: string;
}

export interface WatchTime {
  id: string;
  userId: string;
  minutes: number;
  date: string;
}

export interface UserStats extends User {
  rewards: Reward[];
  watchTimeEntries: WatchTime[];
}
