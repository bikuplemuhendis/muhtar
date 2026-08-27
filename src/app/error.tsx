"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center bg-cream px-4">
      <h1 className="display text-3xl font-semibold">Bir şey ters gitti</h1>
      <p className="mt-2 text-sm text-ink-soft">
        İşlem tamamlanamadı. Bilgileriniz kaybolmadı; yeniden deneyin.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-stamp px-4 font-semibold text-white"
      >
        Yeniden dene
      </button>
    </main>
  );
}
