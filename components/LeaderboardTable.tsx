import { User } from "@/lib/types";

export default function LeaderboardTable({ users }: { users: User[] }) {
  if (!users?.length) {
    return (
      <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 text-center text-sm text-[var(--text-secondary)]">
        No leaderboard data available yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]">
      <table className="min-w-full border-separate border-spacing-0 text-left">
        <thead className="bg-[var(--elevated-color)]/90 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">
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
            <tr key={user.id} className="border-t border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.05)]">
              <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{index + 1}</td>
              <td className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-color)] text-sm font-semibold text-black">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-[var(--text-primary)]">{user.username}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {user.streakDays}d streak · {user.watchTime}m
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-[var(--text-primary)]">${user.totalWagered.toFixed(0)}</td>
              <td className="px-4 py-4 text-sm text-[var(--text-primary)]">{user.tokens.toFixed(0)}</td>
              <td className="px-4 py-4 text-sm text-[var(--text-primary)]">{user.watchTime}m</td>
              <td className="px-4 py-4 text-sm text-[var(--accent-color)]">{user.vipTier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
