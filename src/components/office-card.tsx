import Link from "next/link";
import { officeLinks } from "@/lib/lookup";
import type { PublicOfficeInfo } from "@/lib/kvkk";

export function OfficeCard({
  office,
  compact = false,
  highlight = false,
}: {
  office: PublicOfficeInfo;
  compact?: boolean;
  highlight?: boolean;
}) {
  const links = officeLinks(office);
  return (
    <section
      className={`rounded-[28px] p-5 ${
        highlight ? "bg-night text-cream" : "paper-card"
      }`}
    >
      <p
        className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
          highlight ? "text-gold" : "text-stamp"
        }`}
      >
        Muhtarlık
      </p>
      <h2 className="display mt-1 text-2xl font-semibold">{office.name}</h2>
      <p className={`mt-1 text-sm ${highlight ? "text-cream/70" : "text-ink-soft"}`}>
        {office.neighborhood} · {office.district} / {office.city}
      </p>
      <p className="mt-4 text-base leading-6">
        Muhtar: <span className="font-semibold">{office.muhtarName}</span>
      </p>
      <p className="mt-1 text-base leading-6">{office.address}</p>
      <p className={`mt-1 text-sm ${highlight ? "text-cream/70" : "text-ink-soft"}`}>{office.hours}</p>
      {!compact ? (
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={links.call}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-sage px-3 text-sm font-semibold text-white btn-press"
          >
            Ara {office.phone}
          </a>
          <a
            href={links.maps}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-3 text-sm font-semibold btn-press ${
              highlight ? "bg-white/10 text-cream" : "border border-line bg-white"
            }`}
          >
            Harita
          </a>
        </div>
      ) : (
        <p className="mt-2 font-semibold">{office.phone}</p>
      )}
      <Link
        href={`/m/${office.slug}`}
        className={`mt-3 inline-flex min-h-11 items-center text-sm font-semibold ${
          highlight ? "text-gold" : "text-stamp"
        }`}
      >
        Muhtarlık sayfası
      </Link>
    </section>
  );
}
