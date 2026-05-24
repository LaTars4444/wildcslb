"use client";

import { useEffect, useState } from "react";

const bonusOffers = [
  { amount: 40, options: ["Split 50/50", "80 dollar bonus buy"], description: "Deposit $40 and choose your bonus structure." },
];

const storeItems = [
  { amount: 5, cost: 500 },
  { amount: 10, cost: 950 },
  { amount: 20, cost: 1800 },
  { amount: 30, cost: 2600 },
  { amount: 40, cost: 3400 },
  { amount: 50, cost: 4200 },
];

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

export default function StorePage() {
  const [raffleTickets, setRaffleTickets] = useState(0);
  const [raffleTimer, setRaffleTimer] = useState("00h 00m 00s");

  useEffect(() => {
    const updateTimer = () => {
      setRaffleTimer(getTimeUntilRaffle());
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen px-6 py-20">
      <div className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.16),transparent_20%),radial-gradient(circle_at_70%_80%,_rgba(168,85,247,0.14),transparent_24%)]" />
      <div className="relative mx-auto max-w-6xl space-y-10">
        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent-color)]">Store</p>
          <h1 className="mt-2 text-3xl font-black text-[var(--text-primary)] sm:text-4xl">Bonuses & rewards</h1>
          <p className="mt-4 max-w-3xl text-[var(--text-secondary)]">
            Deposit bonuses, stream balance control, and token redemption.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          <h2 className="text-xl font-black text-[var(--text-primary)]">Deposit bonus options</h2>
          <p className="mt-2 text-[var(--text-secondary)]">Choose your bonus structure when depositing.</p>
          <div className="mt-6 space-y-4">
            {bonusOffers.map((offer) => (
              <div key={offer.amount} className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--elevated-color)]/80 p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">Deposit ${offer.amount}</p>
                <p className="mt-2 text-2xl font-black text-[var(--text-primary)]">${offer.amount} bonus</p>
                <p className="mt-2 text-[var(--text-secondary)]">{offer.description}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {offer.options.map((opt) => (
                    <button key={opt} className="rounded-full border border-[var(--border-color)] bg-[var(--bg-color)] px-4 py-2 text-sm font-semibold transition hover:border-[var(--accent-color)]">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

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
              <h2 className="text-xl font-black text-[var(--text-primary)]">Redeemable cash rewards</h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Spend tokens earned from play and watch time to redeem instant cash reward vouchers.
              </p>
            </div>
            <div className="rounded-full bg-[var(--elevated-color)]/80 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              Token cost shown below
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {storeItems.map((item) => (
              <div key={item.amount} className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--bg-color)]/80 p-5 text-center">
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">Redeem</p>
                <p className="mt-2 text-4xl font-black text-[var(--text-primary)]">${item.amount}</p>
                <p className="mt-3 text-[var(--text-secondary)]">Cost: {item.cost} tokens</p>
                <button className="mt-6 rounded-full bg-[var(--accent-color)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:brightness-110">
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
