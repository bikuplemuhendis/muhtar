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
  const first = ctx.user.fullName.split(" ")[0];
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-cream">
      <header className="flex items-center justify-between bg-night px-4 py-3 text-cream">
        <BrandMark size="sm" tone="dark" />
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/hesabim/ayarlar" className="text-cream/80">
            Ayarlar
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-gold">
              Çıkış
            </button>
          </form>
        </div>
      </header>
      <p className="px-4 pt-4 text-sm text-ink-soft">Merhaba {first}</p>
      <div className="flex-1 px-4 pb-10 pt-2">{children}</div>
    </div>
  );
}
