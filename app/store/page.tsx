import Link from "next/link";

const milestones = [
  { threshold: 5000, reward: 5 },
  { threshold: 10000, reward: 15 },
  { threshold: 20000, reward: 40 },
];

const depositBonuses = [
  { trigger: "Deposit $500", reward: 15, description: "One-time bonus for eligible deposits." },
  { trigger: "Deposit $1,000", reward: 35, description: "Claim a larger incentive for deeper support." },
  { trigger: "First deposit", reward: 10, description: "Welcome bonus for new players." },
];

const storeItems = [
  { amount: 5, cost: 500 },
  { amount: 10, cost: 950 },
  { amount: 20, cost: 1800 },
  { amount: 30, cost: 2600 },
  { amount: 40, cost: 3400 },
  { amount: 50, cost: 4200 },
];

export default function StorePage() {
  return (
    <main className="relative min-h-screen px-6 py-20">
      <div className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),transparent_20%),radial-gradient(circle_at_70%_80%,_rgba(168,85,247,0.14),transparent_24%)]" />
      <div className="relative mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">WildCS Store</p>
          <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">Redeem cash rewards with tokens</h1>
          <p className="mt-4 max-w-3xl text-[var(--text-secondary)]">
            Tokens are earned through play and watch time. Use them to redeem fixed cash rewards and claim milestone bonuses.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/auth/kick"
              className="rounded-full bg-[var(--accent-color)] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:brightness-110"
            >
              Connect Kick
            </Link>
            <Link
              href="/leaderboard"
              className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-6 py-3 text-sm uppercase tracking-[0.16em] text-[var(--text-primary)] transition hover:border-[var(--primary-color)]"
            >
              View Leaderboards
            </Link>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <h2 className="text-xl font-black text-[var(--text-primary)]">Weekly wager milestones</h2>
            <p className="mt-3 text-[var(--text-secondary)]">Hit a weekly wager target to unlock bonus cash rewards.</p>
            <div className="mt-6 space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.threshold} className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--elevated-color)]/80 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">{milestone.threshold.toLocaleString()} wagered</p>
                  <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">${milestone.reward}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <h2 className="text-xl font-black text-[var(--text-primary)]">One-time rewards</h2>
            <p className="mt-3 text-[var(--text-secondary)]">Special cash bonuses for deposits and first-time activity.</p>
            <div className="mt-6 space-y-4">
              {depositBonuses.map((bonus) => (
                <div key={bonus.trigger} className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--elevated-color)]/80 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">{bonus.trigger}</p>
                  <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">${bonus.reward}</p>
                  <p className="mt-2 text-[var(--text-secondary)]">{bonus.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)]">Redeemable cash rewards</h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Spend tokens earned from play and watch time to redeem instant cash reward vouchers.
              </p>
            </div>
            <div className="rounded-full bg-[var(--elevated-color)]/80 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Token cost shown below
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {storeItems.map((item) => (
              <div key={item.amount} className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--bg-color)]/80 p-5 text-center">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">Redeem</p>
                <p className="mt-2 text-4xl font-black text-[var(--text-primary)]">${item.amount}</p>
                <p className="mt-3 text-[var(--text-secondary)]">Cost: {item.cost} tokens</p>
                <button className="mt-6 rounded-full bg-[var(--accent-color)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:brightness-110">
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
