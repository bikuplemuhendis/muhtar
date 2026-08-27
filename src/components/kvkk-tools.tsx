"use client";

import { deleteMyAccountAction, exportMyDataAction } from "@/actions/kvkk";
import { useState } from "react";
import { SubmitButton } from "@/components/form-ui";

export function KvkkAccountTools() {
  const [json, setJson] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <form
        action={async () => {
          const data = await exportMyDataAction();
          setJson(JSON.stringify(data, null, 2));
        }}
      >
        <SubmitButton variant="ghost">Verilerimi indir (JSON)</SubmitButton>
      </form>
      {json ? (
        <pre className="max-h-64 overflow-auto rounded-2xl bg-ink px-3 py-3 text-xs text-paper">
          {json}
        </pre>
      ) : null}
      <form action={deleteMyAccountAction}>
        <p className="mb-2 text-xs leading-5 text-ink-soft">
          Hesabı silmek ad, e-posta ve kimlik eşlemesini anonimleştirir. Teslim istatistiği
          saklanır, kişiye bağlanamaz.
        </p>
        <SubmitButton variant="stamp">Hesabımı sil ve anonimleştir</SubmitButton>
      </form>
    </div>
  );
}
