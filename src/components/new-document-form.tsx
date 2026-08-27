"use client";

import { useActionState } from "react";
import { createDocumentAction } from "@/actions/documents";
import { DOCUMENT_TYPE_LABELS } from "@/lib/constants";
import { ErrorText, Field, SubmitButton } from "@/components/form-ui";

export function NewDocumentForm() {
  const [state, action] = useActionState(createDocumentAction, null);
  return (
    <form action={action} className="space-y-4">
      <Field
        label="Alıcı adı soyadı"
        name="recipientName"
        required
        autoFocus
        autoComplete="off"
        placeholder="Zarf üzerindeki ad"
      />
      <Field
        label="T.C. kimlik no"
        name="tc"
        required
        inputMode="numeric"
        maxLength={11}
        autoComplete="off"
        hint="Kayda alınır, bir daha gösterilmez. Ekranda yalnızca son 4 hane durur."
      />
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Evrak türü</legend>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label], index) => (
            <label
              key={value}
              className="flex min-h-12 items-center gap-2 rounded-2xl border border-line bg-white px-3 text-sm font-medium has-[:checked]:border-stamp has-[:checked]:bg-stamp/10"
            >
              <input
                type="radio"
                name="type"
                value={value}
                defaultChecked={index === 0}
                className="accent-stamp"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <Field
        label="Gönderen kurum (ofis içi)"
        name="sourceOrg"
        placeholder="PTT / kaymakamlık / mahkeme"
        hint="Vatandaş kamu sorgusunda bu alanı görmez."
      />
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Ofis notu</span>
        <textarea
          name="notes"
          rows={3}
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base outline-none ring-stamp/30 focus:ring-2"
          placeholder="Fiziksel evrak içeriği yazılmasın"
        />
      </label>
      <p className="text-xs leading-5 text-ink-soft">
        Sistem evrak görüntüsü veya tarama saklamaz. Yalnızca teslim kaydı oluşturulur.
      </p>
      <ErrorText message={state?.error} />
      <div className="sticky bottom-24 pb-2">
        <SubmitButton>Kaydet ve kod üret</SubmitButton>
      </div>
    </form>
  );
}
