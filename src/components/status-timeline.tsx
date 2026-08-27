import { STATUS_HINTS, STATUS_LABELS, STATUSES, type DocumentStatus } from "@/lib/constants";

const ORDER: DocumentStatus[] = [
  STATUSES.RECEIVED,
  STATUSES.READY,
  STATUSES.DELIVERED,
];

export function StatusTimeline({
  status,
  returned = false,
}: {
  status: DocumentStatus;
  returned?: boolean;
}) {
  if (returned || status === STATUSES.RETURNED) {
    return (
      <p className="rounded-2xl bg-cream-2 px-4 py-3 text-sm text-ink-soft">
        {STATUS_HINTS.RETURNED}
      </p>
    );
  }

  const current = ORDER.indexOf(status);
  return (
    <ol className="space-y-0">
      {ORDER.map((step, index) => {
        const done = index <= current;
        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`mt-0.5 h-3 w-3 rounded-full ${
                  done ? "bg-stamp" : "bg-line"
                }`}
              />
              {index < ORDER.length - 1 ? (
                <span className={`h-8 w-px ${index < current ? "bg-stamp" : "bg-line"}`} />
              ) : null}
            </div>
            <div className="pb-4">
              <p className={`text-sm font-semibold ${done ? "text-ink" : "text-ink-soft"}`}>
                {STATUS_LABELS[step]}
              </p>
              {index === current ? (
                <p className="text-xs leading-5 text-ink-soft">{STATUS_HINTS[step]}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
