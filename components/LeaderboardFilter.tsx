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
    <div className="flex flex-wrap gap-2 rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/85 p-3">
      {periodOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setPeriod(option.value)}
          className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] transition ${
            period === option.value
              ? "bg-[var(--accent-color)] text-black shadow-[0_15px_40px_-24px_rgba(168,85,247,0.55)]"
              : "border border-[var(--border-color)] bg-[var(--surface-color)]/80 text-[var(--text-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--text-primary)]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
