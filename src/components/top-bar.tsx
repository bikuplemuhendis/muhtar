import Link from "next/link";
import { BrandMark } from "@/components/brand";
import { readSession } from "@/lib/session";
import { ROLES } from "@/lib/constants";

export async function TopBar() {
  const session = await readSession();
  const home = session?.role === ROLES.CITIZEN ? "/hesabim" : session ? "/ofis" : "/giris";
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/90 px-4 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between">
        <BrandMark size="sm" />
        <nav className="flex items-center gap-2 text-sm font-semibold">
          <Link href="/sorgula" className="min-h-10 px-2 py-2">
            Sorgula
          </Link>
          <Link
            href={home}
            className="inline-flex min-h-10 items-center rounded-full bg-ink px-3 text-paper"
          >
            {session ? "Panele git" : "Giriş"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
