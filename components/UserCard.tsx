import { User } from "@/lib/types";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-xl font-semibold text-zinc-950">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-semibold text-white">{user.username}</p>
          <p className="text-sm text-zinc-400">VIP {user.vipTier} • {user.streakDays}-day streak</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl bg-zinc-900/80 p-4 text-sm text-zinc-300">
          <p className="text-zinc-400">Total wagered</p>
          <p className="mt-1 text-white">${user.totalWagered.toFixed(0)}</p>
        </div>
        <div className="rounded-3xl bg-zinc-900/80 p-4 text-sm text-zinc-300">
          <p className="text-zinc-400">Watch time</p>
          <p className="mt-1 text-white">{user.watchTime}m</p>
        </div>
      </div>
    </div>
  );
}
