"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      className="no-print inline-flex min-h-11 items-center rounded-full border border-line bg-white px-3 text-sm font-semibold btn-press"
      onClick={() => window.print()}
    >
      Fişi yazdır
    </button>
  );
}
