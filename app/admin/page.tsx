import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">Admin Console</p>
      <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)]">Management</h1>
      <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
        This admin page is a placeholder for managing users, rewards, and sync operations.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/leaderboard"
          className="rounded-full bg-[var(--accent-color)] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:brightness-110"
        >
          View Leaderboard
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-6 py-3 text-sm uppercase tracking-[0.16em] text-[var(--text-primary)] transition hover:border-[var(--primary-color)]"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
