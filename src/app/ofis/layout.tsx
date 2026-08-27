import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { BrandMark } from "@/components/brand";
import { OfficeBottomNav } from "@/components/office-nav";
import { requireOffice } from "@/lib/auth";

export default async function OfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await requireOffice();
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-cream pb-28">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-night/10 bg-night px-4 py-3 text-cream">
        <div>
          <BrandMark size="sm" tone="dark" />
          <p className="mt-1 max-w-[16rem] truncate text-xs text-cream/60">{ctx.tenant.name}</p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="min-h-10 rounded-full px-3 text-sm font-semibold text-gold">
            Çıkış
          </button>
        </form>
      </header>
      <div className="flex-1 px-4 pb-6 pt-5">{children}</div>
      <p className="hidden">
        <Link href="/ofis/denetim">denetim</Link>
      </p>
      <OfficeBottomNav />
    </div>
  );
}
