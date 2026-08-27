import { STATUS_LABELS, type DocumentStatus } from "@/lib/constants";

const TONES: Record<DocumentStatus, string> = {
  RECEIVED: "bg-sand text-ink",
  READY: "bg-stamp/10 text-stamp-dark",
  DELIVERED: "bg-sage/15 text-sage-dark",
  RETURNED: "bg-ink/10 text-ink-soft",
};

export function StatusBadge({ status }: { status: DocumentStatus }) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full px-3 text-sm font-semibold ${TONES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
