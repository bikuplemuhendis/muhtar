"use client";

import { useFormStatus } from "react-dom";
import { useState } from "react";

export function SubmitButton({
  children,
  variant = "stamp",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "stamp" | "sage" | "ghost" | "night";
  className?: string;
}) {
  const { pending } = useFormStatus();
  const styles =
    variant === "sage"
      ? "bg-sage text-white hover:bg-sage-dark"
      : variant === "ghost"
        ? "bg-white text-ink border border-line hover:bg-cream-2"
        : variant === "night"
          ? "bg-night text-cream hover:bg-night-2"
          : "bg-stamp text-white hover:bg-stamp-dark shadow-[0_10px_24px_rgba(226,59,43,0.28)]";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-press inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-4 text-base font-semibold transition disabled:opacity-60 ${styles} ${className}`}
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
  id,
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
  id?: string;
}) {
  const [hidden, setHidden] = useState(true);
  const isPassword = type === "password";
  const inputId = id ?? name;
  return (
    <label className="block" htmlFor={inputId}>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <span className="relative block">
        <input
          id={inputId}
          name={name}
          type={isPassword && !hidden ? "text" : type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          required={required}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none ring-stamp/25 placeholder:text-ink-soft/70 focus:border-stamp/40 focus:ring-4"
        />
        {isPassword ? (
          <button
            type="button"
            className="absolute inset-y-0 right-2 my-auto h-9 rounded-full px-3 text-xs font-semibold text-ink-soft"
            onClick={() => setHidden((v) => !v)}
          >
            {hidden ? "Göster" : "Gizle"}
          </button>
        ) : null}
      </span>
      {hint ? <span className="mt-1 block text-xs text-ink-soft">{hint}</span> : null}
    </label>
  );
}

export function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="rounded-2xl border border-stamp/20 bg-stamp/10 px-3 py-2 text-sm text-stamp-dark">
      {message}
    </p>
  );
}

export function OkText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="rounded-2xl border border-sage/20 bg-sage/10 px-3 py-2 text-sm text-sage-dark">
      {message}
    </p>
  );
}
