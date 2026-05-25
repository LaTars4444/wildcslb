"use client";

import { useState } from "react";

export default function TokenDisplay() {
  const [tokens] = useState<number | null>(() => {
    try {
      if (typeof window === "undefined") return null;
      const rawUser = window.localStorage.getItem("wildcs_user");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        return parsed.tokens ?? 0;
      }
      const raw = window.localStorage.getItem("wildcs_tokens");
      return raw ? Number(raw) : 0;
    } catch {
      return 0;
    }
  });

  return (
    <div className="ml-4 flex items-center gap-3">
      <div className="rounded-full border border-[var(--border-color)] bg-[var(--surface-color)]/95 px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--text-primary)]">
        Tokens: <span className="ml-2 text-[var(--accent-color)]">{tokens ?? "—"}</span>
      </div>
    </div>
  );
}
