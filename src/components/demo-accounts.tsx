"use client";

export function DemoAccounts({ tone = "dark" }: { tone?: "dark" | "light" }) {
  function fill(email: string) {
    const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');
    const passwordInput = document.querySelector<HTMLInputElement>('input[name="password"]');
    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = "Teslim123!";
    emailInput?.focus();
  }

  const wrap =
    tone === "dark"
      ? "border-white/10 bg-white/5 text-cream"
      : "paper-card text-ink";
  const muted = tone === "dark" ? "text-cream/60" : "text-ink-soft";
  const secondary =
    tone === "dark" ? "bg-white/10 text-cream" : "bg-cream-2 text-ink";

  return (
    <div className={`rounded-[28px] border p-4 text-sm ${wrap}`}>
      <p className="font-semibold">Deneme hesapları</p>
      <p className={`mt-1 ${muted}`}>Parola: Teslim123!</p>
      <div className="mt-3 grid gap-2">
        <button
          type="button"
          onClick={() => fill("muhtar@caddebostan.ornek")}
          className="min-h-11 rounded-2xl bg-stamp px-3 text-left font-semibold text-white btn-press"
        >
          Muhtar olarak doldur
        </button>
        <button
          type="button"
          onClick={() => fill("ahmet@ornek.com")}
          className={`min-h-11 rounded-2xl px-3 text-left font-semibold btn-press ${secondary}`}
        >
          Vatandaş olarak doldur
        </button>
      </div>
    </div>
  );
}
