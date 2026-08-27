import Link from "next/link";

export function EmptyState({
  title,
  body,
  href,
  action,
}: {
  title: string;
  body: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="paper-card rounded-[28px] px-5 py-10 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 7.5h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-11Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="M4 7.5 12 13l8-5.5" stroke="#E23B2B" strokeWidth="1.7" />
        </svg>
      </div>
      <h2 className="display mt-4 text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{body}</p>
      {href && action ? (
        <Link
          href={href}
          className="mt-5 inline-flex min-h-12 items-center rounded-2xl bg-stamp px-5 font-semibold text-white"
        >
          {action}
        </Link>
      ) : null}
    </div>
  );
}
