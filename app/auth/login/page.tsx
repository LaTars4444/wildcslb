"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const raw = window.localStorage.getItem("wildcs_user");
    if (!raw) {
      setError("No account found. Please register first.");
      return;
    }

    try {
      const user = JSON.parse(raw);
      if (user.username !== username) {
        setError("Username does not match stored account.");
        return;
      }

      if (!user.password || user.password !== password) {
        setError("Invalid password.");
        return;
      }

      window.localStorage.setItem("wildcs_user", JSON.stringify(user));
      router.push("/profile");
    } catch {
      setError("Unable to read stored account.");
    }
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-md">
        <section className="rounded-[1.5rem] border border-[var(--border-color)] bg-[var(--surface-color)]/90 p-8">
          <h1 className="text-2xl font-black">Log in</h1>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="rounded-md border border-[var(--border-color)] bg-[var(--bg-color)] px-3 py-3 text-[var(--text-primary)] outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="rounded-md border border-[var(--border-color)] bg-[var(--bg-color)] px-3 py-3 text-[var(--text-primary)] outline-none"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="rounded-full bg-[var(--accent-color)] px-4 py-3 font-semibold">Log in</button>
              <button type="button" onClick={() => window.location.href = "/auth/register"} className="rounded-full border border-[var(--border-color)] px-4 py-3">Create account</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
