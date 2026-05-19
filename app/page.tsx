import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl border border-white/10 bg-zinc-950/80 p-10 shadow-xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">WildCSLB</p>
          <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Leaderboard & platform dashboard MVP
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            A clean, server-backed leaderboard experience with Prisma schema, API routes, and starter admin/dashboard pages.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/leaderboard" className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300">
              View Leaderboard
            </Link>
            <Link href="/dashboard" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white transition hover:border-white/20">
              Open Dashboard
            </Link>
            <Link href="/admin" className="rounded-full border border-white/10 px-6 py-3 text-sm text-white transition hover:border-white/20">
              Admin Console
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <h2 className="text-lg font-semibold text-white">Core MVP</h2>
            <p className="mt-3 text-zinc-400">
              Prisma schema for users, rewards, and watch time plus a leaderboard API and frontend.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <h2 className="text-lg font-semibold text-white">No auth yet</h2>
            <p className="mt-3 text-zinc-400">
              The first phase is focused on data modeling and public leaderboard display only.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
            <h2 className="text-lg font-semibold text-white">Ready for sync</h2>
            <p className="mt-3 text-zinc-400">
              Sync service scaffolding is included so your platform can push leaderboard data later.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
