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
    <main className="relative min-h-screen px-6 py-10">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),transparent_18%)]" />
      <div className="relative mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">Overview</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            This dashboard page is a starting point for your platform analytics and user activity.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] bg-[var(--elevated-color)]/80 p-6 text-sm text-[var(--text-secondary)]">
                <p className="text-[var(--text-secondary)]">Active users</p>
                <p className="mt-3 text-3xl font-black text-[var(--text-primary)]">1.2k</p>
              </div>
              <div className="rounded-[1.75rem] bg-[var(--elevated-color)]/80 p-6 text-sm text-[var(--text-secondary)]">
                <p className="text-[var(--text-secondary)]">Weekly volume</p>
                <p className="mt-3 text-3xl font-black text-[var(--text-primary)]">$72.4k</p>
              </div>
              <div className="rounded-[1.75rem] bg-[var(--elevated-color)]/80 p-6 text-sm text-[var(--text-secondary)]">
                <p className="text-[var(--text-secondary)]">Rewards issued</p>
                <p className="mt-3 text-3xl font-black text-[var(--text-primary)]">384</p>
              </div>
            </div>
          </div>

          <UserCard user={sampleUser} />
        </div>
      </div>
    </main>
  );
}
