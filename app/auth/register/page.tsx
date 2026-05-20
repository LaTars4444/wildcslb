"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    const user = { username, tokens: 0, linkedKick: false };
    window.localStorage.setItem("wildcs_user", JSON.stringify(user));
    window.localStorage.setItem("wildcs_tokens", "0");
    router.push("/profile");
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-md">
        <section className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-8">
          <h1 className="text-2xl font-black">Create account</h1>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" className="rounded-md border px-3 py-2" />
            <div className="flex gap-3">
              <button type="submit" className="rounded-full bg-[var(--accent-color)] px-4 py-2 font-semibold">Create</button>
              <button type="button" onClick={() => router.push('/auth/login')} className="rounded-full border px-4 py-2">Log in</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
