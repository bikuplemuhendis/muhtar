"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/ofis", label: "Evraklar", icon: InboxIcon },
  { href: "/ofis/yeni", label: "Yeni", icon: PlusIcon },
  { href: "/ofis/teslim", label: "Teslim", icon: HandIcon },
  { href: "/ofis/ayarlar", label: "Ofis", icon: GearIcon },
];

export function OfficeBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {ITEMS.map((item) => {
          const active =
            item.href === "/ofis"
              ? pathname === "/ofis"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold ${
                  active ? "text-stamp" : "text-ink-soft"
                }`}
              >
                <item.icon active={active} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function InboxIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 12.5 5.2 5.8A2 2 0 0 1 7.1 4.5h9.8a2 2 0 0 1 1.9 1.3L21 12.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5.5Z"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
      />
      <path d="M3 13h5l1.2 2h5.6L16 13h5" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
    </svg>
  );
}

function PlusIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
      <path d="M12 8.5v7M8.5 12h7" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
    </svg>
  );
}

function HandIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 13V7.5a1.5 1.5 0 1 1 3 0V13M11 12V6.5a1.5 1.5 0 1 1 3 0V12M14 11.5V7a1.5 1.5 0 1 1 3 0v8.5c0 2.5-2 4.5-4.8 5.5-2.6.9-5.2.2-6.7-1.4L4 17"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
      <path
        d="M12 4.5 13.2 7l2.7.2-1.5 2.3.8 2.5-2.5-.7L12 13.8l-.7-2.5-2.5.7.8-2.5L6.1 7.2 8.8 7 10 4.5h2Z"
        stroke="currentColor"
        strokeWidth={active ? 1.6 : 1.4}
      />
    </svg>
  );
}
