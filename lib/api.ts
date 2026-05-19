import { Period, User, UserStats } from "@/lib/types";

export async function fetchLeaderboard(period: Period): Promise<User[]> {
  const response = await fetch(`/api/leaderboard?period=${period}`);
  if (!response.ok) {
    throw new Error("Unable to load leaderboard");
  }
  return response.json();
}

export async function fetchUserStats(id: string): Promise<UserStats> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error("Unable to load user stats");
  }
  return response.json();
}
