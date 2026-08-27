import { notFound } from "next/navigation";
import { BrandMark, SiteFooter } from "@/components/brand";
import { OfficeCard } from "@/components/office-card";
import { toOfficeInfo } from "@/lib/lookup";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PublicOfficePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = await prisma.tenant.findUnique({ where: { slug } });
  if (!tenant || !tenant.active) notFound();
  const office = toOfficeInfo(tenant);

  return (
    <div className="flex min-h-dvh flex-col bg-night text-cream">
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-80" />
      <main className="relative mx-auto w-full max-w-md px-4 py-10">
        <BrandMark tone="dark" />
        <div className="mt-8">
          <OfficeCard office={office} highlight />
        </div>
        <p className="mt-4 text-sm leading-6 text-cream/60">
          Bu sayfa muhtarlığın kamu iletişim bilgileridir. Kişiye ait evrak listesi yayımlanmaz.
        </p>
      </main>
      <SiteFooter tone="dark" />
    </div>
  );
}
