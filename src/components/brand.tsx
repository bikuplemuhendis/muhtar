import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box =
    size === "lg" ? "h-12 w-12 text-lg" : size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  const word = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <Link href="/" className="flex items-center gap-2.5 min-h-11">
      <span
        className={`stamp-ring grid place-items-center rounded-full bg-stamp text-white font-semibold tracking-wide ${box}`}
      >
        T
      </span>
      <span className={`display font-semibold tracking-tight text-ink ${word}`}>{APP_NAME}</span>
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line px-4 py-8 text-sm text-ink-soft">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>Teslim, evrak görüntüsü saklamaz. Yalnızca teslim kaydı tutulur.</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/kvkk" className="underline-offset-4 hover:underline">
            KVKK
          </Link>
          <Link href="/gizlilik" className="underline-offset-4 hover:underline">
            Gizlilik
          </Link>
          <Link href="/sorgula" className="underline-offset-4 hover:underline">
            Evrak sorgula
          </Link>
        </nav>
      </div>
    </footer>
  );
}
