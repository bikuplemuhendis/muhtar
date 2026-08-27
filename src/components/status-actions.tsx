"use client";

import { changeStatusAction } from "@/actions/documents";
import { canTransition, STATUSES, type DocumentStatus } from "@/lib/constants";
import { SubmitButton } from "@/components/form-ui";

export function StatusActions({
  documentId,
  status,
}: {
  documentId: string;
  status: DocumentStatus;
}) {
  const ready = canTransition(status, STATUSES.READY);
  const delivered = canTransition(status, STATUSES.DELIVERED);
  const returned = canTransition(status, STATUSES.RETURNED);
  const back = canTransition(status, STATUSES.RECEIVED);

  if (!ready && !delivered && !returned && !back) {
    return (
      <p className="text-sm text-ink-soft">Bu evrak için başka durum adımı yok.</p>
    );
  }

  return (
    <div className="space-y-2">
      {ready ? (
        <form action={changeStatusAction}>
          <input type="hidden" name="documentId" value={documentId} />
          <input type="hidden" name="status" value={STATUSES.READY} />
          <label className="mb-2 flex items-center gap-2 text-sm">
            <input type="checkbox" name="notify" defaultChecked className="h-5 w-5 accent-stamp" />
            İçerik paylaşmadan “hazır” bildirimi kuyruğa al
          </label>
          <SubmitButton variant="stamp">Teslime hazır</SubmitButton>
        </form>
      ) : null}
      {delivered ? (
        <form action={changeStatusAction} className="space-y-2">
          <input type="hidden" name="documentId" value={documentId} />
          <input type="hidden" name="status" value={STATUSES.DELIVERED} />
          <label className="flex items-start gap-2 rounded-2xl border border-line bg-white px-3 py-3 text-sm">
            <input
              type="checkbox"
              name="identityChecked"
              required
              className="mt-0.5 h-5 w-5 accent-sage"
            />
            Kimlik görüldü, evrak elden teslim edildi
          </label>
          <SubmitButton variant="sage">Teslim edildi</SubmitButton>
        </form>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        {back ? (
          <form action={changeStatusAction}>
            <input type="hidden" name="documentId" value={documentId} />
            <input type="hidden" name="status" value={STATUSES.RECEIVED} />
            <SubmitButton variant="ghost">Alındıya al</SubmitButton>
          </form>
        ) : null}
        {returned ? (
          <form action={changeStatusAction}>
            <input type="hidden" name="documentId" value={documentId} />
            <input type="hidden" name="status" value={STATUSES.RETURNED} />
            <SubmitButton variant="ghost">İade</SubmitButton>
          </form>
        ) : null}
      </div>
    </div>
  );
}
