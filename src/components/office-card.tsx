import Link from "next/link";
import { officeLinks } from "@/lib/lookup";
import type { PublicOfficeInfo } from "@/lib/kvkk";

export function OfficeCard({
  office,
  compact = false,
}: {
  office: PublicOfficeInfo;
  compact?: boolean;
}) {
  const links = officeLinks(office);
  return (
    <section className="paper-card rounded-3xl p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-stamp">Muhtarlık</p>
      <h2 className="display mt-1 text-xl font-semibold text-ink">{office.name}</h2>
      <p className="mt-1 text-sm text-ink-soft">
        {office.neighborhood} · {office.district} / {office.city}
      </p>
      <p className="mt-3 text-base leading-6">
        Muhtar: <span className="font-semibold">{office.muhtarName}</span>
      </p>
      <p className="mt-1 text-base leading-6">{office.address}</p>
      <p className="mt-1 text-sm text-ink-soft">{office.hours}</p>
      {!compact ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={links.call}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sage px-3 text-sm font-semibold text-white"
          >
            Ara {office.phone}
          </a>
          <a
            href={links.maps}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-line px-3 text-sm font-semibold"
          >
            Harita
          </a>
        </div>
      ) : (
        <p className="mt-2 font-semibold">{office.phone}</p>
      )}
      <Link
        href={`/m/${office.slug}`}
        className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-stamp underline-offset-4 hover:underline"
      >
        Muhtarlık sayfası
      </Link>
    </section>
  );
}
