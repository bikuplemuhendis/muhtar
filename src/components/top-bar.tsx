import Link from "next/link";
import { BrandMark } from "@/components/brand";
import { readSession } from "@/lib/session";
import { ROLES } from "@/lib/constants";

export async function TopBar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const session = await readSession();
  const home = session?.role === ROLES.CITIZEN ? "/hesabim" : session ? "/ofis" : "/giris";
  const bar =
    tone === "dark"
      ? "border-white/10 bg-night/70 text-cream"
      : "border-line/80 bg-cream/85 text-ink";
  const ghost =
    tone === "dark" ? "hover:bg-white/10" : "hover:bg-night/5";
  const cta =
    tone === "dark"
      ? "bg-stamp text-white hover:bg-stamp-dark"
      : "bg-night text-cream hover:bg-night-2";

  return (
    <header className={`sticky top-0 z-30 border-b px-4 backdrop-blur-xl ${bar}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <BrandMark size="sm" tone={tone} />
        <nav className="flex items-center gap-1 text-sm font-semibold">
          <Link href="/sorgula" className={`inline-flex min-h-10 items-center rounded-full px-3 ${ghost}`}>
            Sorgula
          </Link>
          <Link
            href={home}
            className={`inline-flex min-h-10 items-center rounded-full px-4 ${cta}`}
          >
            {session ? "Panele git" : "Giriş"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
