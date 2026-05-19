import UserCard from "@/components/UserCard";

const sampleUser = {
  id: "sample-user",
  username: "WildPlayer",
  totalWagered: 18250,
  weeklyWagered: 4800,
  monthlyWagered: 13200,
  tokens: 1420,
  watchTime: 895,
  vipTier: "gold",
  streakDays: 18,
  avatar: null,
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Overview</h1>
          <p className="mt-3 text-zinc-400">
            This dashboard page is a starting point for your platform analytics and user activity.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-xl shadow-black/20">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-zinc-900/80 p-6 text-sm text-zinc-300">
                <p className="text-zinc-400">Active users</p>
                <p className="mt-3 text-3xl font-semibold text-white">1.2k</p>
              </div>
              <div className="rounded-3xl bg-zinc-900/80 p-6 text-sm text-zinc-300">
                <p className="text-zinc-400">Weekly volume</p>
                <p className="mt-3 text-3xl font-semibold text-white">$72.4k</p>
              </div>
              <div className="rounded-3xl bg-zinc-900/80 p-6 text-sm text-zinc-300">
                <p className="text-zinc-400">Rewards issued</p>
                <p className="mt-3 text-3xl font-semibold text-white">384</p>
              </div>
            </div>
          </div>

          <UserCard user={sampleUser} />
        </div>
      </div>
    </main>
  );
}
