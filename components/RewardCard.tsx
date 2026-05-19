import { Reward } from "@/lib/types";

export default function RewardCard({ reward }: { reward: Reward }) {
  return (
    <div className="rounded-[1.75rem] border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-color)]">{reward.type}</p>
          <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">${reward.amount.toFixed(0)}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${reward.claimed ? "bg-emerald-500/15 text-emerald-300" : "bg-[var(--elevated-color)] text-[var(--text-secondary)]"}`}>
          {reward.claimed ? "Claimed" : "Unclaimed"}
        </span>
      </div>
      <p className="mt-4 text-sm text-[var(--text-secondary)]">Created {new Date(reward.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
