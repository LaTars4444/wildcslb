import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Exo } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

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
          <NavBar />

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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://curiouscurrie.gg/tac.svg" alt="Terms & conditions" className="h-5 opacity-70" />
                  <Image src="/logos/gamstop.svg" alt="GamStop" width={80} height={20} className="opacity-70" />
                  <Image src="/logos/gamble-help.svg" alt="Gamble help" width={80} height={20} className="opacity-70" />
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
