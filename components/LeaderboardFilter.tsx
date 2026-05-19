import type { Period } from "@/lib/types";

const periodOptions: Array<{ value: Period; label: string }> = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "all", label: "All Time" },
];

export default function LeaderboardFilter({
  period,
  setPeriod,
}: {
  period: Period;
  setPeriod: (period: Period) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border border-white/10 bg-zinc-950/80 p-3">
      {periodOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setPeriod(option.value)}
          className={`rounded-full px-4 py-2 text-sm transition ${
            period === option.value
              ? "bg-amber-400 text-zinc-950"
              : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
