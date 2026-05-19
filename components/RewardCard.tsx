import { Reward } from "@/lib/types";

export default function RewardCard({ reward }: { reward: Reward }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-amber-300">{reward.type}</p>
          <p className="mt-2 text-lg font-semibold text-white">${reward.amount.toFixed(0)}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${reward.claimed ? "bg-emerald-500/15 text-emerald-300" : "bg-white/10 text-zinc-200"}`}>
          {reward.claimed ? "Claimed" : "Unclaimed"}
        </span>
      </div>
      <p className="mt-4 text-sm text-zinc-400">Created {new Date(reward.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
