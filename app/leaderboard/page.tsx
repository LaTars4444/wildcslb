'use client';

import { useEffect, useState } from "react";
import LeaderboardTable from "@/components/LeaderboardTable";
import { fetchLeaderboard } from "@/lib/api";
import type { Period, User } from "@/lib/types";

const leaderboardBoards = [
  { value: "daily" as Period, label: "Daily Leaders" },
  { value: "weekly" as Period, label: "Weekly Leaders" },
  { value: "monthly" as Period, label: "Monthly Leaders" },
  { value: "all" as Period, label: "All Ranks" },
];

function getTimeUntilNextMonth(): string {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  
  const diff = target.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${days}d ${hours}h ${minutes}m`;
}

function getTimeUntilRaffleDrawDay(): string {
  const now = new Date();
  const target = new Date(now);
  target.setHours(20, 0, 0, 0);
  
  if (now > target) {
    target.setDate(target.getDate() + 1);
  }
  
  const diff = target.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${hours}h ${minutes}m ${seconds}s`;
}

export default function LeaderboardPage() {
  const [boards, setBoards] = useState<Record<Period, User[]>>({
    daily: [],
    weekly: [],
    monthly: [],
    all: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaderboardTimer, setLeaderboardTimer] = useState("00h 00m 00s");
  const [raffleTimer, setRaffleTimer] = useState("00h 00m 00s");

  const topPlayer = boards.all[0] || boards.daily[0] || boards.weekly[0] || boards.monthly[0];

  useEffect(() => {
    const updateTimers = () => {
      setLeaderboardTimer(getTimeUntilNextMonth()); // Resets first of next month
      setRaffleTimer(getTimeUntilRaffleDrawDay()); // Raffle draws at 8 PM EST
    };
    
    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadBoards = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          leaderboardBoards.map((board) => fetchLeaderboard(board.value))
        );

        if (!isMounted) {
          return;
        }

        setBoards({
          daily: results[0],
          weekly: results[1],
          monthly: results[2],
          all: results[3],
        });
      } catch {
        if (isMounted) {
          setError("Unable to load leaderboards.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadBoards();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="relative min-h-screen px-6 py-10">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),transparent_20%),radial-gradient(circle_at_80%_90%,_rgba(168,85,247,0.14),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent-color)]">Leaderboards</p>
              <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
                Leaderboard & Rewards
              </h1>
              <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
                Top players and redeemable rewards.
              </p>
            </div>
            <div className="rounded-[2rem] bg-[var(--accent-color)]/10 px-6 py-5 text-right">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent-color)]">Top player tokens</p>
              <p className="mt-2 text-4xl font-black text-[var(--accent-color)]">
                {topPlayer ? topPlayer.tokens.toFixed(0) : "—"}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-color)]">Top player</p>
            <h2 className="mt-4 text-3xl font-black text-[var(--text-primary)]">
              {topPlayer ? `#1 ${topPlayer.username}` : "Loading top player"}
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              {topPlayer
                ? `${topPlayer.tokens.toFixed(0)} tokens · ${topPlayer.streakDays}-day streak`
                : "Fetching the current top player."}
            </p>
          </div>
          <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-color)]">Monthly leaderboard resets in</p>
            <p className="mt-4 text-3xl font-black text-[var(--text-primary)]">{leaderboardTimer}</p>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">Leaderboard resets on the first of each month</p>
          </div>
          <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-color)]">Raffle draws in</p>
            <p className="mt-4 text-3xl font-black text-[var(--text-primary)]">{raffleTimer}</p>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">$25 weekly raffle at 8 PM EST</p>
          </div>
        </section>

        {error ? (
          <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-6 text-red-200">
            {error}
          </div>
        ) : isLoading ? (
          <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 text-[var(--text-secondary)]">
            Loading leaderboards...
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-3">
            {leaderboardBoards.map((board) => (
              <LeaderboardTable
                key={board.value}
                title={board.label}
                users={boards[board.value]}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
