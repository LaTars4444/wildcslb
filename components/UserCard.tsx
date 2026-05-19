import { User } from "@/lib/types";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-color)] text-xl font-semibold text-black">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-semibold text-[var(--text-primary)]">{user.username}</p>
          <p className="text-sm text-[var(--text-secondary)]">VIP {user.vipTier} • {user.streakDays}-day streak</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[1.75rem] bg-[var(--elevated-color)]/80 p-4 text-sm text-[var(--text-secondary)]">
          <p className="text-[var(--text-secondary)]">Total wagered</p>
          <p className="mt-1 text-[var(--text-primary)]">${user.totalWagered.toFixed(0)}</p>
        </div>
        <div className="rounded-[1.75rem] bg-[var(--elevated-color)]/80 p-4 text-sm text-[var(--text-secondary)]">
          <p className="text-[var(--text-secondary)]">Watch time</p>
          <p className="mt-1 text-[var(--text-primary)]">{user.watchTime}m</p>
        </div>
      </div>
    </div>
  );
}
