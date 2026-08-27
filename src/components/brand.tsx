import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function BrandMark({
  size = "md",
  tone = "light",
}: {
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
}) {
  const box =
    size === "lg" ? "h-12 w-12" : size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const word = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  const text = tone === "dark" ? "text-cream" : "text-ink";
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2.5">
      <span className={`relative grid ${box} place-items-center`}>
        <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden>
          <rect width="32" height="32" rx="9" fill={tone === "dark" ? "#13233A" : "#07111F"} />
          <rect x="6" y="10" width="20" height="13" rx="2.5" fill="#F6F1E8" />
          <path
            d="M6.5 11.2 16 17.2 25.5 11.2"
            stroke="#E23B2B"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="24" cy="10" r="5" fill="#E23B2B" />
          <circle cx="24" cy="10" r="3.2" stroke="#F6F1E8" strokeWidth="1" fill="none" />
        </svg>
      </span>
      <span className={`display font-semibold tracking-tight ${word} ${text}`}>{APP_NAME}</span>
    </Link>
  );
}

export function SiteFooter({ tone = "light" }: { tone?: "light" | "dark" }) {
  const wrap =
    tone === "dark"
      ? "border-white/10 text-cream/70"
      : "border-line text-ink-soft";
  return (
    <footer className={`mt-auto border-t px-4 py-10 text-sm ${wrap}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>Teslim evrak görüntüsü saklamaz. Yalnızca teslim kaydı tutulur.</p>
        <nav className="flex flex-wrap gap-4 font-semibold">
          <Link href="/kvkk" className="hover:text-stamp">
            KVKK
          </Link>
          <Link href="/gizlilik" className="hover:text-stamp">
            Gizlilik
          </Link>
          <Link href="/sorgula" className="hover:text-stamp">
            Evrak sorgula
          </Link>
          <Link href="/giris" className="hover:text-stamp">
            Giriş
          </Link>
        </nav>
      </div>
    </footer>
  );
}
