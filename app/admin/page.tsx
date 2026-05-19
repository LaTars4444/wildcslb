import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="rounded-3xl border border-white/10 bg-zinc-950/80 p-10 shadow-xl shadow-black/20">
      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Admin Console</p>
      <h1 className="mt-2 text-3xl font-semibold text-white">Management</h1>
      <p className="mt-4 max-w-2xl text-zinc-400">
        This admin page is a placeholder for managing users, rewards, and sync operations.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/leaderboard"
          className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
        >
          View Leaderboard
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-white/10 px-6 py-3 text-sm text-white transition hover:border-white/20"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
