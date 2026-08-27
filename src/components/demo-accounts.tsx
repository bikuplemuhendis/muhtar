"use client";

import Link from "next/link";

function hrefFor(demo: "muhtar" | "vatandas", next: string) {
  const params = new URLSearchParams({ demo });
  if (next) params.set("next", next);
  return `/giris?${params.toString()}`;
}

export function DemoAccounts({
  tone = "dark",
  next = "",
}: {
  tone?: "dark" | "light";
  next?: string;
}) {
  const wrap =
    tone === "dark" ? "border-white/10 bg-white/5 text-cream" : "paper-card text-ink";
  const muted = tone === "dark" ? "text-cream/60" : "text-ink-soft";
  const secondary = tone === "dark" ? "bg-white/10 text-cream" : "bg-cream-2 text-ink";

  return (
    <div className={`rounded-[28px] border p-4 text-sm ${wrap}`}>
      <p className="font-semibold">Deneme hesapları</p>
      <p className={`mt-1 ${muted}`}>Parola: Teslim123!</p>
      <div className="mt-3 grid gap-2">
        <Link
          href={hrefFor("muhtar", next)}
          className="inline-flex min-h-11 items-center rounded-2xl bg-stamp px-3 text-left font-semibold text-white"
        >
          Muhtar olarak doldur
        </Link>
        <Link
          href={hrefFor("vatandas", next)}
          className={`inline-flex min-h-11 items-center rounded-2xl px-3 text-left font-semibold ${secondary}`}
        >
          Vatandaş olarak doldur
        </Link>
      </div>
    </div>
  );
}
