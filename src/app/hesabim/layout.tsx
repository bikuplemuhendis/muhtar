import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { BrandMark } from "@/components/brand";
import { requireCitizen } from "@/lib/auth";

export default async function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await requireCitizen();
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col">
      <header className="flex items-center justify-between px-4 py-3">
        <BrandMark size="sm" />
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/hesabim/ayarlar">Ayarlar</Link>
          <form action={logoutAction}>
            <button type="submit" className="text-stamp">
              Çıkış
            </button>
          </form>
        </div>
      </header>
      <p className="px-4 text-sm text-ink-soft">Merhaba {ctx.user.fullName.split(" ")[0]}</p>
      <div className="flex-1 px-4 pb-10 pt-3">{children}</div>
    </div>
  );
}
