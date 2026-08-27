"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  variant = "stamp",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "stamp" | "sage" | "ghost";
  className?: string;
}) {
  const { pending } = useFormStatus();
  const styles =
    variant === "sage"
      ? "bg-sage text-white hover:bg-sage-dark"
      : variant === "ghost"
        ? "bg-transparent text-ink border border-line hover:bg-sand"
        : "bg-stamp text-white hover:bg-stamp-dark";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-4 text-base font-semibold transition disabled:opacity-60 ${styles} ${className}`}
    >
      {pending ? "İşleniyor…" : children}
    </button>
  );
}

export function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  required,
  defaultValue,
  placeholder,
  autoFocus,
  maxLength,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  maxLength?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
        className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none ring-stamp/30 placeholder:text-ink-soft/70 focus:ring-2"
      />
      {hint ? <span className="mt-1 block text-xs text-ink-soft">{hint}</span> : null}
    </label>
  );
}

export function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="rounded-xl border border-stamp/30 bg-stamp/10 px-3 py-2 text-sm text-stamp-dark">
      {message}
    </p>
  );
}

export function OkText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="rounded-xl border border-sage/30 bg-sage/10 px-3 py-2 text-sm text-sage-dark">
      {message}
    </p>
  );
}
