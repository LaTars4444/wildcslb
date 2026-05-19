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
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Leaderboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Top players</h1>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Browse the current leaderboard and switch between leaderboard periods.
              </p>
            </div>
            <LeaderboardFilter period={period} setPeriod={setPeriod} />
          </div>
        </section>

        {error ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-200">
            {error}
          </div>
        ) : isLoading ? (
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 text-zinc-400">Loading leaderboard...</div>
        ) : (
          <LeaderboardTable users={users} />
        )}
      </div>
    </main>
  );
}
