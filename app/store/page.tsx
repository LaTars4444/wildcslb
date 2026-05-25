"use client";

import { useEffect, useState } from "react";
import { earnedTokensFromLifetime } from "@/lib/token-utils";

// Store is fully wager-meter driven; no deposit bonuses.

function getTimeUntilRaffle(): string {
  const now = new Date();
  const target = new Date(now);
  target.setHours(20, 0, 0, 0); // 8 PM
  
  if (now > target) {
    target.setDate(target.getDate() + 1);
  }
  
  const diff = target.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${hours}h ${minutes}m ${seconds}s`;
}

type LocalUser = {
  tokens?: number;
  bonusBalance?: number;
  xp?: number;
  avatar?: string | null;
  monthlyWagered?: number;
  lifetimeWagered?: number;
  lifetimeTokenCredits?: number;
  totalWagered?: number;
};

export default function StorePage() {
  const [user, setUser] = useState<LocalUser | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem("wildcs_user");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });
  const [raffleTickets, setRaffleTickets] = useState(0);
  const [raffleTimer, setRaffleTimer] = useState("00h 00m 00s");
  const [monthlyWagered, setMonthlyWagered] = useState<number>(user?.monthlyWagered ?? 0);
  const [lifetimeWagered, setLifetimeWagered] = useState<number>(user?.lifetimeWagered ?? 0);
  const [claimedRewards, setClaimedRewards] = useState<Record<string, boolean>>({});
  const [wagerInput, setWagerInput] = useState<number>(0);
  const [bonusBalance, setBonusBalance] = useState<number>(user?.bonusBalance ?? 0);

  useEffect(() => {
    const updateTimer = () => {
      setRaffleTimer(getTimeUntilRaffle());
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);


  const milestoneRewards = [
    { id: "monthly-1", target: 1000, reward: 5, label: "Starter streak" },
    { id: "monthly-2", target: 2500, reward: 10, label: "Hot run" },
    { id: "monthly-3", target: 5000, reward: 20, label: "Big week" },
    { id: "monthly-4", target: 10000, reward: 50, label: "Elite month" },
  ];

  const lifetimeRewards = [
    { id: "lifetime-1", target: 5000, reward: 500, label: "Loyalty starter" },
    { id: "lifetime-2", target: 20000, reward: 2200, label: "Veteran club" },
    { id: "lifetime-3", target: 50000, reward: 7000, label: "Legend tier" },
    { id: "lifetime-4", target: 100000, reward: 18000, label: "Wild legend" },
  ];

  const handleClaimReward = (rewardId: string, amount: number, isMonthly = false) => {
    if (!user || claimedRewards[rewardId]) return;
    setClaimedRewards((prev) => ({ ...prev, [rewardId]: true }));

    const updated = {
      ...user,
      tokens: isMonthly ? user.tokens : (user.tokens ?? 0) + amount,
      bonusBalance: isMonthly ? (user.bonusBalance ?? 0) + amount : user.bonusBalance ?? 0,
    };

    if (isMonthly) {
      setBonusBalance((prev) => prev + amount);
    }

    setUser(updated);
    const raw = window.localStorage.getItem("wildcs_user");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      window.localStorage.setItem("wildcs_user", JSON.stringify({ ...parsed, ...updated }));
    } catch {
      return;
    }
  };

  const handleAddWager = (amount: number) => {
    if (!user) return;
    const newMonthly = monthlyWagered + amount;
    const newLifetime = lifetimeWagered + amount;
    const updatedLifetimeCredits = earnedTokensFromLifetime(newLifetime);
    const lifetimeDelta = Math.max(0, updatedLifetimeCredits - (user.lifetimeTokenCredits ?? 0));

    setMonthlyWagered(newMonthly);
    setLifetimeWagered(newLifetime);

    const updated = {
      ...user,
      monthlyWagered: newMonthly,
      lifetimeWagered: newLifetime,
      lifetimeTokenCredits: updatedLifetimeCredits,
      totalWagered: (user.totalWagered ?? 0) + amount,
      tokens: (user.tokens ?? 0) + lifetimeDelta,
    };

    setUser(updated);
    window.localStorage.setItem("wildcs_user", JSON.stringify(updated));

    // raffle tickets: 1 ticket per $100 wager
    setRaffleTickets((prev) => prev + Math.floor(amount / 100));
  };

  const nextMilestone = milestoneRewards.find((milestone) => monthlyWagered < milestone.target);
  const monthlyProgress = nextMilestone
    ? Math.min(100, Math.round((monthlyWagered / nextMilestone.target) * 100))
    : 100;

  return (
    <main className="relative min-h-screen px-6 py-20">
      <div className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),transparent_20%),radial-gradient(circle_at_70%_80%,_rgba(168,85,247,0.14),transparent_24%)]" />
      <div className="relative mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">Store</p>
          <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">Bonuses & rewards</h1>
          <p className="mt-4 max-w-3xl text-[var(--text-secondary)]">
            Wager meter, stream balance control, and token redemption.
          </p>
        </section>

        {/* All rewards are wager-based and claimable via the wager meter. */}

        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <h2 className="text-xl font-black text-[var(--text-primary)]">Stream balance control</h2>
          <p className="mt-2 text-[var(--text-secondary)]">Manage your balance in real-time.</p>
          <div className="mt-6 rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--elevated-color)]/80 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">20,000 tokens pool</p>
            <p className="mt-4 text-3xl font-black text-[var(--text-primary)]">20,000</p>
            <button className="mt-6 rounded-full bg-[var(--accent-color)] px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:brightness-110">
              Control stream balance
            </button>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)]">Weekly $25 raffle</h2>
              <p className="mt-2 text-[var(--text-secondary)]">Get 1 ticket per $100 wagered. Raffle draws every Sunday at 8 PM EST.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-full bg-[var(--accent-color)]/10 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">Your tickets</p>
                <p className="mt-1 text-3xl font-black text-[var(--accent-color)]">{raffleTickets}</p>
              </div>
              <div className="rounded-full bg-[var(--accent-color)]/10 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">Draw in</p>
                <p className="mt-1 text-3xl font-black text-[var(--accent-color)]">{raffleTimer}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--elevated-color)]/80 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">Wagered this week</p>
            <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">${(raffleTickets * 100).toLocaleString()}</p>
            <button 
              onClick={() => setRaffleTickets(prev => prev + 1)}
              className="mt-4 rounded-full border border-[var(--border-color)] bg-[var(--bg-color)] px-4 py-2 text-sm font-semibold transition hover:border-[var(--accent-color)]"
            >
              View raffle history
            </button>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)]">Monthly wager progression</h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Monthly wager milestones unlock dollar bonuses. Lifetime tokens are earned separately.
              </p>
            </div>
            <div className="rounded-full bg-[var(--elevated-color)]/80 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              {user ? `$${bonusBalance.toLocaleString()} bonus available` : "Log in to claim rewards"}
            </div>
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--bg-color)]/80 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">Current monthly wager</p>
            <p className="mt-2 text-3xl font-black text-[var(--text-primary)]">${monthlyWagered.toLocaleString()}</p>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[var(--surface-color)]">
              <div className="h-full rounded-full bg-[var(--accent-color)]" style={{ width: `${monthlyProgress}%` }} />
            </div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {nextMilestone ? `${monthlyProgress}% to ${nextMilestone.label} (${Math.max(0, nextMilestone.target - monthlyWagered)} remaining)` : "All monthly milestones reached"}
            </p>

            <div className="mt-4">
              <p className="text-sm text-[var(--text-secondary)]">Wager to earn lifetime tokens: every $7.50 wagered = 1 token. Monthly wager milestones unlock separate bonus rewards.</p>
              <div className="mt-3 flex gap-2">
                <input type="number" value={wagerInput} onChange={(e) => setWagerInput(Number(e.target.value))} className="w-36 rounded-md border border-[var(--border-color)] bg-[var(--bg-color)] px-3 py-2 text-[var(--text-primary)] outline-none" />
                <button onClick={() => { if (wagerInput > 0) { handleAddWager(wagerInput); setWagerInput(0); } }} className="rounded-full bg-[var(--accent-color)] px-4 py-2 text-sm font-black">Add wager</button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {milestoneRewards.map((milestone) => {
              const eligible = monthlyWagered >= milestone.target;
              return (
                <div key={milestone.id} className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--bg-color)]/80 p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">{milestone.label}</p>
                  <p className="mt-2 text-3xl font-black text-[var(--text-primary)]">{milestone.target.toLocaleString()}</p>
                  <p className="mt-2 text-sm text-[var(--accent-color)]">+${milestone.reward} bonus</p>
                  <button
                    disabled={!eligible || claimedRewards[milestone.id]}
                    onClick={() => handleClaimReward(milestone.id, milestone.reward, true)}
                    className="mt-5 rounded-full border border-[var(--border-color)] bg-[var(--accent-color)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {claimedRewards[milestone.id] ? "Claimed" : eligible ? "Claim" : "Locked"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)]">Token shop</h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Spend your lifetime tokens on special bonuses and creative gambling products. Winnings are split and credited to your account.
              </p>
            </div>
            <div className="rounded-full bg-[var(--elevated-color)]/80 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              {user ? `${(user.tokens ?? 0).toLocaleString()} tokens available` : "Log in to view"}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--bg-color)]/80 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">Bonus buy</p>
              <p className="mt-2 text-3xl font-black text-[var(--text-primary)]">$40</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">1 token = $40 bonus buy</p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">Winnings split with house</p>
              <button
                disabled={!user || (user.tokens ?? 0) < 1}
                className="mt-5 rounded-full border border-[var(--border-color)] bg-[var(--accent-color)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {!user ? "Log in" : (user.tokens ?? 0) < 1 ? "Locked" : "Purchase"}
              </button>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--bg-color)]/80 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">Coming soon</p>
              <p className="mt-2 text-3xl font-black text-[var(--text-primary)]">TBD</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">Creative token-based products</p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">More ways to use tokens</p>
              <button
                disabled
                className="mt-5 rounded-full border border-[var(--border-color)] bg-[var(--surface-color)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--text-secondary)] cursor-not-allowed opacity-50"
              >
                Coming soon
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)]">Lifetime wager milestones</h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Lifetime tokens are earned from total wagers and never reset.
              </p>
            </div>
            <div className="rounded-full bg-[var(--elevated-color)]/80 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Lifetime wager: ${lifetimeWagered.toLocaleString()}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {lifetimeRewards.map((milestone) => {
              const eligible = lifetimeWagered >= milestone.target;
              return (
                <div key={milestone.id} className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--bg-color)]/80 p-5 text-center">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">{milestone.label}</p>
                  <p className="mt-2 text-3xl font-black text-[var(--text-primary)]">{milestone.target.toLocaleString()}</p>
                  <p className="mt-2 text-sm text-[var(--accent-color)]">+{milestone.reward} tokens</p>
                  <button
                    disabled={!eligible || claimedRewards[milestone.id]}
                    onClick={() => handleClaimReward(milestone.id, milestone.reward)}
                    className="mt-5 rounded-full border border-[var(--border-color)] bg-[var(--accent-color)] px-4 py-2 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {claimedRewards[milestone.id] ? "Claimed" : eligible ? "Claim" : "Locked"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
