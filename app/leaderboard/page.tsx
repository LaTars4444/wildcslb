'use client';

import { useEffect, useState } from "react";
import LeaderboardFilter from "@/components/LeaderboardFilter";
import LeaderboardTable from "@/components/LeaderboardTable";
import { fetchLeaderboard } from "@/lib/api";
import type { Period, User } from "@/lib/types";

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("all");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      if (!isMounted) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchLeaderboard(period);
        if (isMounted) {
          setUsers(data);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load leaderboard data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, [period]);

  return (
    <main className="relative min-h-screen px-6 py-10">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),transparent_20%),radial-gradient(circle_at_80%_90%,_rgba(168,85,247,0.14),transparent_24%)]" />
      <div className="relative mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent-color)]">Leaderboard</p>
              <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
                Top players
              </h1>
              <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
                Browse the current leaderboard and switch between leaderboard periods.
              </p>
            </div>
            <LeaderboardFilter period={period} setPeriod={setPeriod} />
          </div>
        </section>

        {error ? (
          <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-6 text-red-200">
            {error}
          </div>
        ) : isLoading ? (
          <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 text-[var(--text-secondary)]">
            Loading leaderboard...
          </div>
        ) : (
          <LeaderboardTable users={users} />
        )}
      </div>
    </main>
  );
}
