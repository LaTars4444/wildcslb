import { User } from "@/lib/types";

export default function LeaderboardTable({ users }: { users: User[] }) {
  if (!users?.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 text-center text-sm text-zinc-400">
        No leaderboard data available yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-xl shadow-black/20">
      <table className="min-w-full border-separate border-spacing-0 text-left">
        <thead className="bg-zinc-900/95 text-xs uppercase tracking-[0.16em] text-zinc-500">
          <tr>
            <th className="px-4 py-4">Rank</th>
            <th className="px-4 py-4">Player</th>
            <th className="px-4 py-4">Wagered</th>
            <th className="px-4 py-4">Tokens</th>
            <th className="px-4 py-4">Watch</th>
            <th className="px-4 py-4">VIP Tier</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t border-white/10 hover:bg-white/5">
              <td className="px-4 py-4 text-sm text-zinc-300">{index + 1}</td>
              <td className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-zinc-950">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-white">{user.username}</div>
                  <div className="text-sm text-zinc-500">
                    {user.streakDays}d streak · {user.watchTime}m
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-zinc-200">${user.totalWagered.toFixed(0)}</td>
              <td className="px-4 py-4 text-sm text-zinc-200">{user.tokens.toFixed(0)}</td>
              <td className="px-4 py-4 text-sm text-zinc-200">{user.watchTime}m</td>
              <td className="px-4 py-4 text-sm text-amber-300">{user.vipTier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
