import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | WildCSLB",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
