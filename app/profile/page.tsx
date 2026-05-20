"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  username: string;
  tokens: number;
  linkedKick?: boolean;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("wildcs_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        setUser(null);
      }
    }
  }, []);

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

  const getRank = (xp: number) => {
    const thresholds = [0, 100, 300, 700, 1500, 3000];
    let rank = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (xp >= thresholds[i]) rank = i;
    }
    return rank;
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-8">
          <h1 className="text-2xl font-black">Profile</h1>
          {!user ? (
            <div className="mt-6 space-y-4">
              <p className="text-[var(--text-secondary)]">No account found. You can create one or log in.</p>
              <div className="flex gap-3">
                <Link href="/auth/login" className="rounded-full bg-[var(--accent-color)] px-5 py-2 font-semibold">Log in</Link>
                <Link href="/auth/register" className="rounded-full border px-5 py-2">Create account</Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">Username</p>
              <p className="text-lg font-black">{user.username}</p>
              <p className="text-sm text-[var(--text-secondary)]">Tokens</p>
              <p className="text-xl font-black text-[var(--accent-color)]">{user.tokens}</p>
              <p className="text-sm text-[var(--text-secondary)]">XP</p>
              <p className="text-lg font-black">{user.xp ?? 0}</p>
              <p className="text-sm text-[var(--text-secondary)]">Rank</p>
              <p className="text-lg font-black">{getRank(user.xp ?? 0)}</p>
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

              <div className="flex gap-3">
                <button onClick={handleLogout} className="rounded-full border px-4 py-2">Log out</button>
                <Link href="/store" className="rounded-full bg-[var(--accent-color)] px-4 py-2 font-semibold">Redeem</Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
import Link from "next/link";
import UserCard from "@/components/UserCard";

const sampleUser = {
  id: "profile-user",
  username: "WildPlayer",
  totalWagered: 18250,
  weeklyWagered: 4800,
  monthlyWagered: 13200,
  tokens: 1420,
  watchTime: 895,
  vipTier: "gold",
  streakDays: 18,
  avatar: null,
};

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen px-6 py-10">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),transparent_18%)]" />
      <div className="relative mx-auto max-w-6xl space-y-8">
        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">Profile</p>
          <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">Linked accounts and token balance</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            See what is connected, how many tokens are available, and access leaderboard progress.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <UserCard user={sampleUser} />

          <div className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-color)]">Token balance</p>
                <p className="mt-4 text-5xl font-black text-[var(--accent-color)]">1,420</p>
              </div>
              <div className="rounded-full bg-[var(--accent-color)]/90 px-4 py-3 text-sm font-bold text-black uppercase tracking-[0.18em]">
                TOKENS
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-[1.75rem] bg-[var(--elevated-color)]/90 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-color)]">Connected services</p>
                <ul className="mt-4 space-y-2 text-[var(--text-secondary)]">
                  <li>Kick connected</li>
                  <li>Discord account linked</li>
                  <li>Email login enabled</li>
                </ul>
              </div>

              <div className="rounded-[1.75rem] bg-[var(--elevated-color)]/90 p-5">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-color)]">Profile links</p>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <Link href="/leaderboard" className="inline-flex rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-4 py-3 text-[var(--text-primary)] transition hover:border-[var(--accent-color)]">
                    View leaderboard progress
                  </Link>
                  <Link href="/store" className="inline-flex rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-4 py-3 text-[var(--text-primary)] transition hover:border-[var(--accent-color)]">
                    Open rewards store
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
