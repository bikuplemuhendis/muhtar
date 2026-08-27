import Link from "next/link";
import { AddStaffForm, OfficeSettingsForm } from "@/components/office-settings-forms";
import { requireOffice } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Ofis ayarları" };
export const dynamic = "force-dynamic";

export default async function OfficeSettingsPage() {
  const ctx = await requireOffice();
  const members = await prisma.tenantMember.findMany({
    where: { tenantId: ctx.tenant.id },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });
  const owner = ctx.membership.role === "OWNER";

  return (
    <div className="space-y-5">
      <h1 className="display text-3xl font-semibold">Ofis</h1>
      <p className="text-sm text-ink-soft">
        Bu bilgiler vatandaş sorgusunda ve{" "}
        <Link href={`/m/${ctx.tenant.slug}`} className="font-semibold text-stamp">
          /m/{ctx.tenant.slug}
        </Link>{" "}
        sayfasında görünür.
      </p>
      {owner ? (
        <div className="paper-card rounded-[28px] p-4">
          <OfficeSettingsForm
            address={ctx.tenant.address}
            phone={ctx.tenant.phone}
            hours={ctx.tenant.hours}
            muhtarName={ctx.tenant.muhtarName}
            email={ctx.tenant.email ?? ""}
          />
        </div>
      ) : (
        <section className="paper-card rounded-3xl p-4 text-sm leading-6">
          <p>{ctx.tenant.address}</p>
          <p>{ctx.tenant.phone}</p>
          <p>{ctx.tenant.hours}</p>
        </section>
      )}
      <section className="space-y-2">
        <h2 className="font-semibold">Personel</h2>
        <ul className="space-y-2">
          {members.map((member) => (
            <li key={member.id} className="paper-card rounded-2xl px-4 py-3 text-sm">
              <span className="font-semibold">{member.user.fullName}</span>
              <span className="text-ink-soft"> · {member.role}</span>
              <p className="text-ink-soft">{member.user.email}</p>
            </li>
          ))}
        </ul>
        {owner ? (
          <div className="paper-card rounded-[28px] p-4">
            <AddStaffForm />
          </div>
        ) : null}
      </section>
      <Link href="/ofis/denetim" className="inline-flex min-h-11 items-center font-semibold text-stamp">
        Denetim kaydı
      </Link>
    </div>
  );
}
