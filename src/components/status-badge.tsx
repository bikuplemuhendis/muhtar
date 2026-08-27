import { STATUS_LABELS, type DocumentStatus } from "@/lib/constants";

const TONES: Record<DocumentStatus, string> = {
  RECEIVED: "bg-night/10 text-night",
  READY: "bg-stamp/12 text-stamp-dark ring-1 ring-stamp/20",
  DELIVERED: "bg-sage/12 text-sage-dark",
  RETURNED: "bg-ink-soft/15 text-ink-soft",
};

const DOTS: Record<DocumentStatus, string> = {
  RECEIVED: "bg-night/50",
  READY: "bg-stamp animate-pulse",
  DELIVERED: "bg-sage",
  RETURNED: "bg-ink-soft",
};

export function StatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 text-sm font-semibold ${TONES[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOTS[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}
