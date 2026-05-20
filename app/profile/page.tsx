"use client";

import { useState } from "react";
import Link from "next/link";
import { getRankIndex, rankNames, thresholds, getNextThreshold, getMultiplier } from "@/lib/ranks";

type User = {
  username: string;
  tokens: number;
  linkedKick?: boolean;
  avatar?: string | null;
  xp?: number;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem("wildcs_user");
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    window.localStorage.removeItem("wildcs_user");
    setUser(null);
  };

  const avatars = ["/avatars/avatar1.svg","/avatars/avatar2.svg","/avatars/avatar3.svg"];

  const handleAvatar = (path: string) => {
    if (!user) return;
    const updated = { ...user, avatar: path } as User;
    window.localStorage.setItem("wildcs_user", JSON.stringify(updated));
    setUser(updated);
  };

  const xp = user?.xp ?? 0;
  const rankIndex = getRankIndex(xp);
  const rankName = rankNames[rankIndex];
  const nextThreshold = getNextThreshold(xp);
  const next = nextThreshold.next;
  const current = thresholds[rankIndex];
  const progress = next > current ? Math.round(((xp - current) / (next - current)) * 100) : 100;
  const multiplier = getMultiplier(rankIndex);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-8">
          <h1 className="text-2xl font-black">Profile</h1>
          {!user ? (
            <div className="mt-6 space-y-4">
              <p className="text-[var(--text-secondary)]">No account found. Sign in to access your tokens and rank.</p>
              <Link href="/auth/login" className="inline-flex rounded-full bg-[var(--accent-color)] px-5 py-3 font-semibold">Log in</Link>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-6">
                <img src={`/ranks/rank-${rankIndex}.svg`} alt={rankName} className="h-20 w-20 rounded-md" />
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">{rankName}</p>
                  <p className="text-2xl font-black">{xp} XP</p>
                  <p className="text-sm text-[var(--text-secondary)]">Multiplier: x{multiplier.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <div className="h-3 w-full rounded-full bg-[var(--elevated-color)]/60">
                  <div className="h-3 rounded-full bg-[var(--accent-color)]" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{progress}% to next rank ({next - xp} XP)</p>
              </div>

              <p className="text-sm text-[var(--text-secondary)]">Username</p>
              <p className="text-lg font-black">{user.username}</p>

              <p className="text-sm text-[var(--text-secondary)]">Tokens</p>
              <p className="text-xl font-black text-[var(--accent-color)]">{user.tokens}</p>

              <p className="text-sm text-[var(--text-secondary)]">Linked accounts</p>
              <p>{user.linkedKick ? "Kick linked" : "No linked accounts"}</p>

              <div>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">Select avatar</p>
                <div className="mt-2 flex gap-3">
                  {avatars.map((a) => (
                    <button key={a} onClick={() => handleAvatar(a)} className="rounded-md border p-1">
                      <img src={a} alt="avatar" className="h-10 w-10 object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/store" className="inline-flex rounded-full bg-[var(--accent-color)] px-5 py-3 font-semibold">Redeem tokens</Link>
                <button onClick={handleLogout} className="text-sm text-[var(--text-secondary)] underline-offset-4 transition hover:text-[var(--text-primary)]">
                  Sign out
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
