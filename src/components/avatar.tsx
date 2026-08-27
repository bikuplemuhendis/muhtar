import { initials } from "@/lib/format";

export function Avatar({ name }: { name: string }) {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-night text-sm font-bold text-cream">
      {initials(name)}
    </span>
  );
}
