"use client";

import { useState } from "react";
import Link from "next/link";

type LocalUser = { username: string; tokens: number; linkedKick?: boolean } | null;

export default function ClaimPage() {
  const [userId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("user");
  });

  const [account] = useState<LocalUser>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem("wildcs_user");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleClaim = () => {
    if (!account) {
      setMessage("You must be logged in to claim rewards.");
      return;
    }

    // Create a pending claim for admin approval
    const pendingRaw = window.localStorage.getItem("wildcs_pending_claims");
    const pending = pendingRaw ? JSON.parse(pendingRaw) : [];
    const amount = 10;
    const entry = {
      id: `c_${Date.now()}`,
      username: account.username,
      amount,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    pending.push(entry);
    window.localStorage.setItem("wildcs_pending_claims", JSON.stringify(pending));
    setMessage("Claim submitted for approval. Admin will review shortly.");
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-8">
          <h1 className="text-2xl font-black">Claim Reward</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Claim target: {userId ?? "unknown"}</p>

          <div className="mt-6">
            {!account ? (
              <div className="space-y-4">
                <p className="text-sm">You need an account to claim. Please</p>
                <div className="flex gap-3">
                  <Link href="/auth/login" className="rounded-full border px-4 py-2">Log in</Link>
                  <Link href="/auth/register" className="rounded-full bg-[var(--accent-color)] px-4 py-2">Create account</Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm">Logged in as <span className="font-medium">{account.username}</span></p>
                <button onClick={handleClaim} className="rounded-full bg-[var(--accent-color)] px-4 py-2 font-semibold">Claim</button>
                {message && <p className="text-sm text-[var(--text-secondary)]">{message}</p>}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
