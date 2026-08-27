"use client";

import { useActionState } from "react";
import { addStaffAction, updateOfficeAction } from "@/actions/office";
import { ErrorText, Field, OkText, SubmitButton } from "@/components/form-ui";

export function OfficeSettingsForm(props: {
  address: string;
  phone: string;
  hours: string;
  muhtarName: string;
  email: string;
}) {
  const [state, action] = useActionState(updateOfficeAction, null);
  return (
    <form action={action} className="space-y-3">
      <Field label="Muhtar adı" name="muhtarName" required defaultValue={props.muhtarName} />
      <Field label="Telefon" name="phone" type="tel" required defaultValue={props.phone} />
      <Field label="Adres" name="address" required defaultValue={props.address} />
      <Field label="Çalışma saatleri" name="hours" required defaultValue={props.hours} />
      <Field label="E-posta" name="email" type="email" defaultValue={props.email} />
      <ErrorText message={state?.error} />
      <OkText message={state?.ok ? "Ofis bilgileri güncellendi." : undefined} />
      <SubmitButton>Kaydet</SubmitButton>
    </form>
  );
}

export function AddStaffForm() {
  const [state, action] = useActionState(addStaffAction, null);
  return (
    <form action={action} className="space-y-3">
      <Field label="Personel adı" name="fullName" required />
      <Field label="E-posta" name="email" type="email" required />
      <Field label="Geçici parola" name="password" type="password" required />
      <ErrorText message={state?.error} />
      <OkText message={state?.ok ? "Personel eklendi." : undefined} />
      <SubmitButton variant="ghost">Personel ekle</SubmitButton>
    </form>
  );
}
