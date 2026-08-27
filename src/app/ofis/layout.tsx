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
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col pb-24">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/95 px-4 py-3 backdrop-blur">
        <div>
          <BrandMark size="sm" />
          <p className="mt-1 max-w-[16rem] truncate text-xs text-ink-soft">{ctx.tenant.name}</p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="min-h-10 text-sm font-semibold text-stamp">
            Çıkış
          </button>
        </form>
      </header>
      <div className="flex-1 px-4 pb-6 pt-4">{children}</div>
      <p className="hidden">
        <Link href="/ofis/denetim">denetim</Link>
      </p>
      <OfficeBottomNav />
    </div>
  );
}
