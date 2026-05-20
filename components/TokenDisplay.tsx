"use client";

import { useState } from "react";
import Link from "next/link";

export default function TokenDisplay() {
  const [tokens] = useState<number | null>(() => {
    try {
      const raw = (typeof window !== "undefined" && window.localStorage.getItem("wildcs_tokens")) || null;
      return raw ? Number(raw) : 0;
    } catch {
      return 0;
    }
  });

  return (
    <div className="ml-4 flex items-center gap-3">
      <Link href="/profile" className="hidden items-center gap-2 rounded-full bg-[var(--surface-color)]/90 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)] md:inline-flex">
        Profile
      </Link>
      <div className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-3 py-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--text-primary)]">
        Tokens: <span className="ml-2 text-[var(--accent-color)]">{tokens ?? "—"}</span>
      </div>
    </div>
  );
}
