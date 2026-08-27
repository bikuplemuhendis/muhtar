"use client";

import { useActionState } from "react";
import { publicLookupAction } from "@/actions/lookup";
import { ErrorText, Field, SubmitButton } from "@/components/form-ui";
import { OfficeCard } from "@/components/office-card";
import { StatusBadge } from "@/components/status-badge";

export function LookupForm() {
  const [state, action] = useActionState(publicLookupAction, null);
  return (
    <div className="space-y-4">
      <form action={action} className="paper-card space-y-3 rounded-3xl p-4">
        <Field
          label="Takip kodu"
          name="trackingCode"
          required
          autoFocus
          autoComplete="off"
          placeholder="EVK-26XXXXXX"
          hint="Muhtarlıkta evrak kaydı alınırken verilen kod."
        />
        <Field
          label="T.C. kimlik no son 4 hane"
          name="last4"
          inputMode="numeric"
          required
          maxLength={4}
          autoComplete="off"
          hint="Tam kimlik numarası istenmez."
        />
        <ErrorText message={state?.error} />
        <SubmitButton>Sorgula</SubmitButton>
      </form>

      {state?.result ? (
        <div className="space-y-3">
          <section className="paper-card rounded-3xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Teslim durumu
                </p>
                <p className="display mt-1 text-2xl font-semibold">{state.result.trackingCode}</p>
                <p className="mt-1 text-sm text-ink-soft">{state.result.typeLabel}</p>
              </div>
              <StatusBadge status={state.result.status} />
            </div>
            <p className="mt-4 rounded-2xl bg-sand px-3 py-3 text-sm leading-6">
              {state.result.statusHint}
            </p>
            <p className="mt-3 text-xs text-ink-soft">
              Evrak içeriği, gönderen kurum ve ad soyad bu sorguda gösterilmez.
            </p>
          </section>
          <OfficeCard office={state.result.office} />
        </div>
      ) : null}
    </div>
  );
}
