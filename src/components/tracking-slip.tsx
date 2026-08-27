import { StatusBadge } from "@/components/status-badge";
import type { DocumentStatus } from "@/lib/constants";
import type { PublicOfficeInfo } from "@/lib/kvkk";

export function TrackingSlip({
  trackingCode,
  status,
  typeLabel,
  office,
  rotate = true,
}: {
  trackingCode: string;
  status: DocumentStatus;
  typeLabel: string;
  office: Pick<PublicOfficeInfo, "name" | "phone" | "city" | "district">;
  rotate?: boolean;
}) {
  return (
    <article
      className={`slip relative overflow-hidden rounded-[28px] border border-night/10 p-5 shadow-[0_30px_60px_rgba(0,0,0,0.28)] ${
        rotate ? "sm:rotate-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-stamp">Teslim fişi</p>
          <p className="display mt-2 text-3xl font-semibold tracking-tight text-night">{trackingCode}</p>
          <p className="mt-1 text-sm text-ink-soft">{typeLabel}</p>
        </div>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-stamp text-xs font-bold uppercase tracking-wide text-white shadow-lg">
          mühür
        </span>
      </div>
      <div className="perforation my-4 h-3 w-full opacity-50" />
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-night">{office.name}</p>
          <p className="text-sm text-ink-soft">
            {office.district} / {office.city} · {office.phone}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
    </article>
  );
}
