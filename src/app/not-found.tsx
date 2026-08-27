import Link from "next/link";
import { BrandMark } from "@/components/brand";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <BrandMark />
      <h1 className="display mt-8 text-3xl font-semibold">Sayfa yok</h1>
      <p className="mt-2 text-ink-soft">Aradığınız kayıt bulunamadı veya başka bir ofise ait.</p>
      <Link href="/" className="mt-6 inline-flex min-h-12 items-center font-semibold text-stamp">
        Ana sayfa
      </Link>
    </main>
  );
}
