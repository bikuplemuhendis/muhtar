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
    <nav className="fixed inset-x-0 bottom-3 z-30 px-3 pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto grid max-w-lg grid-cols-4 rounded-[28px] border border-white/20 bg-night/92 p-1.5 shadow-[0_16px_40px_rgba(7,17,31,0.35)] backdrop-blur-xl">
        {ITEMS.map((item) => {
          const active =
            item.href === "/ofis" ? pathname === "/ofis" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-[22px] text-[11px] font-semibold ${
                  active ? "bg-stamp text-white" : "text-cream/70"
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
      <path d="M12 8.5v7M8.5 12h7" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
    </svg>
  );
}

function HandIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} />
      <path
        d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.8-1.4-1.8-3.1-2.2.5a7.7 7.7 0 0 0-2.6-1.5L14 3h-4l-.6 2.5A7.7 7.7 0 0 0 6.8 7L4.6 6.5 2.8 9.6 4.6 11a7.6 7.6 0 0 0 0 3l-1.8 1.4 1.8 3.1 2.2-.5a7.7 7.7 0 0 0 2.6 1.5L10 21h4l.6-2.5a7.7 7.7 0 0 0 2.6-1.5l2.2.5 1.8-3.1-1.8-1.4Z"
        stroke="currentColor"
        strokeWidth={active ? 1.6 : 1.4}
      />
    </svg>
  );
}
