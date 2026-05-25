"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChipsCallbackPage() {
  const [status] = useState(() => {
    if (typeof window === "undefined") {
      return "Completing Chips login...";
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      return "Chips login did not return an auth code. Please try again.";
    }

    window.localStorage.setItem("wildcs_chips_auth", "true");
    return "Chips login completed. Your wager tracking connection is now stored locally.";
  });

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">Chips callback</p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)]">Chips authorization result</h1>
        <p className="mt-4 text-[var(--text-secondary)]">{status}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="rounded-full bg-[var(--accent-color)] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:brightness-110"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/store"
            className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-6 py-3 text-sm uppercase tracking-[0.16em] text-[var(--text-primary)] transition hover:border-[var(--primary-color)]"
          >
            Go to Store
          </Link>
        </div>
      </div>
    </main>
  );
}
