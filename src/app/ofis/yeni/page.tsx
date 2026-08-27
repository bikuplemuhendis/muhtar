import { NewDocumentForm } from "@/components/new-document-form";

export const metadata = { title: "Yeni evrak" };

export default function NewDocumentPage() {
  return (
    <div className="space-y-4">
      <h1 className="display text-3xl font-semibold">Yeni evrak</h1>
      <p className="text-sm leading-6 text-ink-soft">
        Zarfı elinizde tutun. Üç alan, bir kod. İçerik sisteme girmez.
      </p>
      <div className="paper-card rounded-[28px] p-4">
        <NewDocumentForm />
      </div>
    </div>
  );
}
