"use client";

import Link from "next/link";

export default function ChipsAuthPage() {
  const clientId = process.env.NEXT_PUBLIC_CHIPS_CLIENT_ID ?? "";
  const redirectUri =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/chips/callback`
      : "";

  const authUrl = clientId
    ? `https://chips.com/oauth/authorize?client_id=${encodeURIComponent(
        clientId
      )}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20profile&state=wildcs`
    : "";

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">Chips Login</p>
        <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)]">Connect your Chips account</h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          Login with Chips to link wager tracking and sync your WildCS rewards.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--elevated-color)]/70 p-6">
            <p className="font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Chips connection</p>
            <p className="mt-3 text-[var(--text-primary)]">
              Use this route to initiate Chips OAuth. Once connected, wager data can be tracked from your Chips account.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-6">
            <p className="font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">Configuration</p>
            <p className="mt-3 text-[var(--text-secondary)]">
              Set <code className="rounded bg-black/20 px-1 py-0.5">NEXT_PUBLIC_CHIPS_CLIENT_ID</code> and optionally <code className="rounded bg-black/20 px-1 py-0.5">NEXT_PUBLIC_CHIPS_REDIRECT_URI</code>.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {authUrl ? (
            <a
              href={authUrl}
              className="rounded-full bg-[var(--accent-color)] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:brightness-110"
            >
              Login with Chips
            </a>
          ) : (
            <div className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-6 py-3 text-sm uppercase tracking-[0.16em] text-yellow-200">
              Chips client ID not configured
            </div>
          )}
          <Link
            href="/"
            className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-6 py-3 text-sm uppercase tracking-[0.16em] text-[var(--text-primary)] transition hover:border-[var(--primary-color)]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
