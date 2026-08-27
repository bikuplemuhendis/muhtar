"use client";

import { useActionState } from "react";
import { loginAction, registerCitizenAction, registerTenantAction } from "@/actions/auth";
import { ErrorText, Field, SubmitButton } from "@/components/form-ui";

export function LoginForm({ next = "" }: { next?: string }) {
  const [state, action] = useActionState(loginAction, null);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="next" value={next} />
      <Field label="E-posta" name="email" type="email" autoComplete="username" required autoFocus />
      <Field
        label="Parola"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />
      <ErrorText message={state?.error} />
      <SubmitButton>Giriş yap</SubmitButton>
    </form>
  );
}

export function CitizenRegisterForm() {
  const [state, action] = useActionState(registerCitizenAction, null);
  return (
    <form action={action} className="space-y-3">
      <Field label="Ad soyad" name="fullName" autoComplete="name" required autoFocus />
      <Field
        label="T.C. kimlik no"
        name="tc"
        inputMode="numeric"
        autoComplete="off"
        maxLength={11}
        required
        hint="Numara HMAC ile saklanır; ekranda yalnızca son 4 hane görünür."
      />
      <Field label="E-posta" name="email" type="email" autoComplete="email" required />
      <Field label="Telefon" name="phone" type="tel" autoComplete="tel" />
      <Field
        label="Parola"
        name="password"
        type="password"
        autoComplete="new-password"
        required
      />
      <label className="flex items-start gap-3 rounded-2xl border border-line bg-white px-3 py-3 text-sm leading-5">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 h-5 w-5 shrink-0 accent-stamp"
          required
        />
        <span>
          Kişisel verilerimin yalnızca evrak tesliminin bildirilmesi ve muhtarlık iletişim
          bilgilerinin gösterilmesi amacıyla işlenmesini{" "}
          <a href="/kvkk" className="font-semibold underline">
            KVKK aydınlatma metni
          </a>{" "}
          kapsamında kabul ediyorum.
        </span>
      </label>
      <ErrorText message={state?.error} />
      <SubmitButton>Üye ol ve evraklarımı gör</SubmitButton>
    </form>
  );
}

export function TenantRegisterForm() {
  const [state, action] = useActionState(registerTenantAction, null);
  return (
    <form action={action} className="space-y-3">
      <Field
        label="Muhtarlık adı"
        name="name"
        required
        autoFocus
        placeholder="Caddebostan Mahallesi Muhtarlığı"
      />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Mahalle" name="neighborhood" required />
        <Field label="İlçe" name="district" required />
      </div>
      <Field label="İl" name="city" required defaultValue="İstanbul" />
      <Field label="Adres" name="address" required />
      <Field label="Telefon" name="phone" type="tel" required placeholder="0216 000 00 00" />
      <Field label="Çalışma saatleri" name="hours" defaultValue="Hafta içi 09:00–17:00" />
      <Field
        label="Kısa ad (bağlantı)"
        name="slug"
        required
        placeholder="caddebostan"
        hint="Vatandaşlar teslim.app/m/caddebostan benzeri adresten ofisi görür."
      />
      <div className="h-px bg-line" />
      <Field label="Muhtar adı soyadı" name="muhtarName" required />
      <Field label="Yönetici e-posta" name="email" type="email" required />
      <Field label="Parola" name="password" type="password" required />
      <ErrorText message={state?.error} />
      <SubmitButton>Muhtarlığı aç</SubmitButton>
    </form>
  );
}
