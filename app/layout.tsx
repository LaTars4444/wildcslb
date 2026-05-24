import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Exo } from "next/font/google";
import "./globals.css";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "WildCS",
  description: "WildCS leaderboard, bonuses, and community hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${exo.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--bg-color)] text-[var(--text-primary)]">
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),transparent_24%),radial-gradient(circle_at_80%_80%,_rgba(168,85,247,0.14),transparent_18%)]" />
          <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border-color)]/80 bg-[rgba(30,22,36,0.78)]/95 backdrop-blur-xl px-4 py-4 shadow-[0_25px_40px_-20px_rgba(0,0,0,0.65)]">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link href="/" className="group flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-2xl border-[3px] border-[var(--border-color)] bg-[var(--surface-color)] shadow-[6px_6px_0_rgba(0,0,0,0.3)] transition duration-300 group-hover:border-[var(--accent-color)]">
                    <Image src="/logo.png" alt="WildCS logo" className="h-full w-full object-cover p-1" fill sizes="48px" />
                  </div>
                  <div className="flex flex-col -rotate-[2deg] transition duration-300 group-hover:rotate-0">
                    <span className="text-xl font-black italic uppercase tracking-tighter text-[var(--text-primary)] drop-shadow-[0_0_20px_rgba(124,58,237,0.35)] sm:text-2xl">
                      WILDCS
                    </span>
                    <span className="mt-1 inline-block rounded-sm bg-[var(--accent-color)] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.22em] text-black">
                      OFFICIAL
                    </span>
                  </div>
                </Link>
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <Link href="/leaderboard" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--text-primary)] transition hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]">
                  Leaderboard
                </Link>
                <Link href="/profile" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:border-[var(--accent-color)] hover:text-[var(--text-primary)]">
                  Profile
                </Link>
                <Link href="/store" className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/90 px-4 py-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)] transition hover:border-[var(--accent-color)] hover:text-[var(--text-primary)]">
                  Store
                </Link>
                <Link href="/auth/login" className="rounded-full border border-[var(--border-color)] px-4 py-2 text-sm">Log in</Link>
                <Link href="/auth/register" className="rounded-full bg-[var(--accent-color)] px-4 py-2 text-sm font-semibold">Sign up</Link>
              </div>
              <a href="https://discord.gg/TQeKGwfe28" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-[var(--text-primary)] transition hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]">
                Discord
              </a>
            </div>
          </nav>

          <main className="min-h-screen pt-28">{children}</main>

          <footer className="border-t border-[var(--border-color)] bg-[rgba(30,22,36,0.72)] px-6 py-12 text-[var(--text-secondary)]">
            <div className="mx-auto max-w-7xl space-y-8">
              <div className="grid gap-8 md:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--text-primary)]">Quick links</p>
                  <div className="mt-4 flex flex-col gap-2 text-sm">
                    <Link href="/leaderboard" className="transition hover:text-[var(--accent-color)]">Leaderboards</Link>
                    <Link href="/store" className="transition hover:text-[var(--accent-color)]">Store</Link>
                    <Link href="/profile" className="transition hover:text-[var(--accent-color)]">Profile</Link>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--text-primary)]">Partners</p>
                  <div className="mt-4 flex flex-col gap-2 text-sm">
                    <a href="#" className="transition hover:text-[var(--accent-color)]">Daddy Skins</a>
                    <a href="#" className="transition hover:text-[var(--accent-color)]">Clash</a>
                    <a href="#" className="transition hover:text-[var(--accent-color)]">Chips</a>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--text-primary)]">Social</p>
                  <div className="mt-4 flex flex-col gap-2 text-sm">
                    <a href="https://discord.gg/TQeKGwfe28" target="_blank" rel="noreferrer" className="transition hover:text-[var(--accent-color)]">Discord</a>
                    <a href="#" className="transition hover:text-[var(--accent-color)]">Twitter</a>
                    <a href="#" className="transition hover:text-[var(--accent-color)]">Twitch</a>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--text-primary)]">Compliance</p>
                  <div className="mt-4 flex flex-col gap-2 text-sm">
                    <a href="https://curiouscurrie.gg" target="_blank" rel="noreferrer" className="transition hover:text-[var(--accent-color)]">Terms & Conditions</a>
                    <a href="#" className="transition hover:text-[var(--accent-color)]">Privacy Policy</a>
                    <a href="#" className="transition hover:text-[var(--accent-color)]">Contact support</a>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border-color)] pt-6">
                <div className="flex items-center gap-4 flex-wrap">
                  <p className="text-xs uppercase tracking-[0.28em]">© 2026 WILDCS</p>
                  <img src="https://curiouscurrie.gg/tac.svg" alt="Terms & conditions" className="h-5 opacity-70" />
                  <img src="/logos/gamstop.svg" alt="GamStop" className="h-5 opacity-70" />
                  <img src="/logos/gamble-help.svg" alt="Gamble help" className="h-5 opacity-70" />
                </div>
                <p className="mt-4 text-xs leading-relaxed max-w-2xl">Leaderboard, rewards, and partner casinos. Play responsibly.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
