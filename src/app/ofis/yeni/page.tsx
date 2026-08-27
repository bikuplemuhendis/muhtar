import { NewDocumentForm } from "@/components/new-document-form";

export const metadata = { title: "Yeni evrak" };

export default function NewDocumentPage() {
  return (
    <div className="space-y-4">
      <h1 className="display text-3xl font-semibold">Yeni evrak</h1>
      <p className="text-sm leading-6 text-ink-soft">
        Zarfı elinizde tutun, üç alanı doldurun. Tarama yok — içerik sisteme girmez.
      </p>
      <NewDocumentForm />
    </div>
  );
}
