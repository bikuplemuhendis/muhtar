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
    <>
      <main className="mx-auto w-full max-w-md px-4 py-10">
        <BrandMark />
        <div className="mt-8">
          <OfficeCard office={office} />
        </div>
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Bu sayfa muhtarlığın kamu iletişim bilgileridir. Burada kişiye ait evrak listesi
          yayımlanmaz.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
