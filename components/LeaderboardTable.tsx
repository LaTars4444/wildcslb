import Image from "next/image";
import { User } from "@/lib/types";
import Link from "next/link";

const placeholders = [
  { id: "daddy", logo: "/logos/daddy.svg", name: "Daddy Skis", vip: "Premium", status: "Open" },
  { id: "chips", logo: "/logos/chips.svg", name: "Chips", vip: "Reserve", status: "Waiting" },
  { id: "clash", logo: "/logos/clash.svg", name: "Clash", vip: "VIP", status: "Ready" },
];

export default function LeaderboardTable({
  title,
  users,
}: {
  title?: string;
  users: User[];
}) {
  if (!users?.length) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]">
        {title ? (
          <div className="border-b border-[var(--border-color)] bg-[var(--elevated-color)]/95 px-6 py-4 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            {title}
          </div>
        ) : null}
        <table className="min-w-full border-separate border-spacing-0 text-left">
          <thead className="bg-[var(--elevated-color)]/90 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">
            <tr>
              <th className="px-4 py-4">Rank</th>
              <th className="px-4 py-4">Player</th>
              <th className="px-4 py-4">Wagered</th>
              <th className="px-4 py-4">Tokens</th>
              <th className="px-4 py-4">Watch</th>
              <th className="px-4 py-4">VIP</th>
              <th className="px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {placeholders.map((item, index) => (
              <tr key={item.id} className="border-t border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.04)]">
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{index + 1}</td>
                <td className="flex items-center gap-3 px-4 py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-color)]">
                    <Image src={item.logo} alt={item.name} fill sizes="64px" className="object-contain p-3" />
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">{item.name}</div>
                    <div className="text-sm text-[var(--text-secondary)]">Reward placeholder</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">—</td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">—</td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">—</td>
                <td className="px-4 py-4 text-sm text-[var(--accent-color)]">{item.vip}</td>
                <td className="px-4 py-4">
                  <button disabled className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/80 px-3 py-1 text-sm text-[var(--text-secondary)]">
                    {item.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]">
      {title ? (
        <div className="border-b border-[var(--border-color)] bg-[var(--elevated-color)]/95 px-6 py-4 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          {title}
        </div>
      ) : null}
      <table className="min-w-full border-separate border-spacing-0 text-left">
        <thead className="bg-[var(--elevated-color)]/90 text-xs uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          <tr>
            <th className="px-4 py-4">Rank</th>
            <th className="px-4 py-4">Player</th>
            <th className="px-4 py-4">Wagered</th>
            <th className="px-4 py-4">Tokens</th>
            <th className="px-4 py-4">Watch</th>
            <th className="px-4 py-4">VIP Tier</th>
            <th className="px-4 py-4">Claim</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.05)]">
              <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{index + 1}</td>
              <td className="flex items-center gap-3 px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-color)] text-sm font-semibold text-black">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-[var(--text-primary)]">{user.username}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {user.streakDays}d streak · {user.watchTime}m
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-[var(--text-primary)]">${user.totalWagered.toFixed(0)}</td>
              <td className="px-4 py-4 text-sm text-[var(--text-primary)]">{user.tokens.toFixed(0)}</td>
              <td className="px-4 py-4 text-sm text-[var(--text-primary)]">{user.watchTime}m</td>
              <td className="px-4 py-4 text-sm text-[var(--accent-color)]">{user.vipTier}</td>
              <td className="px-4 py-4">
                <Link href={`/claim?user=${encodeURIComponent(user.username)}`} className="rounded-full border px-3 py-1 text-sm font-semibold">Claim</Link>
              </td>
            </tr>
          ))}

          {users.length < placeholders.length &&
            placeholders.slice(users.length).map((item, index) => (
              <tr key={item.id} className="border-t border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.04)]">
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">{users.length + index + 1}</td>
                <td className="flex items-center gap-3 px-4 py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-color)]">
                    <Image src={item.logo} alt={item.name} fill sizes="64px" className="object-contain p-3" />
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">{item.name}</div>
                    <div className="text-sm text-[var(--text-secondary)]">Reward placeholder</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">—</td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">—</td>
                <td className="px-4 py-4 text-sm text-[var(--text-secondary)]">—</td>
                <td className="px-4 py-4 text-sm text-[var(--accent-color)]">{item.vip}</td>
                <td className="px-4 py-4">
                  <button disabled className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/80 px-3 py-1 text-sm text-[var(--text-secondary)]">
                    {item.status}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
