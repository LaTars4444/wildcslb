'use client';

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem("wildcs_admin_auth") === "true";
  });

  const handleLogout = () => {
    window.localStorage.removeItem("wildcs_admin_auth");
    setAuthorized(false);
  };

  if (!authorized) {
    return (
      <main className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">Restricted Admin Access</p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)]">Admin login required</h1>
        <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
          This page is protected and can only be accessed with the secret admin login link.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/admin/login"
            className="rounded-full bg-[var(--accent-color)] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:brightness-110"
          >
            Go to Admin Login
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
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-red-500 bg-red-500/10 px-6 py-3 text-sm uppercase tracking-[0.16em] text-red-200 transition hover:bg-red-500/20"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
