import Link from "next/link";
import { BrandMark } from "@/components/brand";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col bg-night px-4 py-16 text-cream">
      <div className="mx-auto max-w-md">
        <BrandMark tone="dark" />
        <h1 className="display mt-10 text-4xl font-semibold">Sayfa yok</h1>
        <p className="mt-3 text-cream/70">Aradığınız kayıt bulunamadı veya başka bir ofise ait.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center rounded-2xl bg-stamp px-5 font-semibold text-white"
        >
          Ana sayfa
        </Link>
      </div>
    </main>
  );
}
