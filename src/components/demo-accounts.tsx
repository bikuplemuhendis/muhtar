"use client";

import Link from "next/link";

type DemoKey = "muhtar" | "personel" | "vatandas" | "alsancak";

const LINKS: { key: DemoKey; label: string }[] = [
  { key: "muhtar", label: "Muhtar (Caddebostan)" },
  { key: "personel", label: "Personel" },
  { key: "vatandas", label: "Vatandaş" },
  { key: "alsancak", label: "Muhtar (Alsancak)" },
];

function hrefFor(demo: DemoKey, next: string) {
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
        {LINKS.map((item, index) => (
          <Link
            key={item.key}
            href={hrefFor(item.key, next)}
            className={`inline-flex min-h-11 items-center rounded-2xl px-3 text-left font-semibold ${
              index === 0 ? "bg-stamp text-white" : secondary
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
