"use client";

import { useActionState } from "react";
import { publicLookupAction } from "@/actions/lookup";
import { ErrorText, Field, SubmitButton } from "@/components/form-ui";
import { OfficeCard } from "@/components/office-card";
import { StatusTimeline } from "@/components/status-timeline";
import { TrackingSlip } from "@/components/tracking-slip";
import { STATUSES } from "@/lib/constants";

export function LookupForm() {
  const [state, action] = useActionState(publicLookupAction, null);
  return (
    <div className="space-y-4">
      <form action={action} className="space-y-3 rounded-[28px] border border-white/10 bg-cream p-4 text-ink">
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
        <div className="space-y-3 text-ink">
          <TrackingSlip
            trackingCode={state.result.trackingCode}
            status={state.result.status}
            typeLabel={state.result.typeLabel}
            office={state.result.office}
            rotate={false}
          />
          <section className="rounded-[28px] bg-cream p-4">
            <StatusTimeline
              status={state.result.status}
              returned={state.result.status === STATUSES.RETURNED}
            />
          </section>
          <OfficeCard office={state.result.office} highlight />
        </div>
      ) : null}
    </div>
  );
}
