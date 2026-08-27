"use server";

import { writeAudit } from "@/lib/audit";
import { getRequestIp } from "@/lib/auth";
import { lookupByTracking } from "@/lib/lookup";
import type { PublicLookupResult } from "@/lib/kvkk";

export type LookupState =
  | { error?: string; result?: PublicLookupResult }
  | null;

export async function publicLookupAction(
  _prev: LookupState,
  formData: FormData,
): Promise<LookupState> {
  const trackingCode = String(formData.get("trackingCode") ?? "");
  const last4 = String(formData.get("last4") ?? "");
  const outcome = await lookupByTracking(trackingCode, last4);

  await writeAudit({
    action: "lookup.public",
    entity: "document",
    ip: await getRequestIp(),
    meta: {
      hit: "result" in outcome && Boolean(outcome.result),
      trackingPresent: Boolean(trackingCode.trim()),
    },
  });

  if ("error" in outcome && outcome.error) return { error: outcome.error };
  return { result: outcome.result };
}
