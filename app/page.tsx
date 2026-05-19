import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-7rem)] overflow-hidden px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.16),transparent_16%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.14),transparent_18%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">WildCS Official</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black uppercase tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Leaderboard, bonuses, and rewards for the WildCS community.
          </h1>
          <p className="mt-5 max-w-2xl text-[var(--text-secondary)]">
            Play under the code “WILDCS”, climb the ranks, and claim exclusive rewards from a high-energy competitive hub.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/leaderboard" className="rounded-full bg-[var(--accent-color)] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:brightness-110">
              View Leaderboard
            </Link>
            <Link href="/dashboard" className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-6 py-3 text-sm uppercase tracking-[0.16em] text-[var(--text-primary)] transition hover:border-[var(--primary-color)]">
              Open Dashboard
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/80 p-6 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.6)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Brand focus</h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              Styled to match your WildCS brand with purple gradients, strong dark surfaces and official logo styling.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/80 p-6 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.6)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Community ready</h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              A leaderboard-first experience with clean navigation, Discord CTA, and brand-forward page styling.
            </p>
          </article>
          <article className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/80 p-6 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.6)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Ready for launch</h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              Designed to look and feel like your live site while using the same app structure and backend components.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
