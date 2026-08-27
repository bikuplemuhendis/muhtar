"use client";

import { useState } from "react";

export function CopyButton({ value, label = "Kopyala" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-3 text-sm font-semibold text-ink btn-press"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
    >
      {copied ? "Kopyalandı" : label}
    </button>
  );
}
