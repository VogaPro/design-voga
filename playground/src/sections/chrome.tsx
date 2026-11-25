import type { ReactNode } from "react";
import { Eyebrow, Meta } from "@voga/ui";

export function Pane({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <article className="pg-pane mt-4">
      <header>
        <h3 style={{ fontSize: "var(--voga-text-md)", fontWeight: 600 }}>{title}</h3>
        {note ? <Meta>{note}</Meta> : null}
      </header>
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </article>
  );
}

export function Specs({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Eyebrow className="mb-2.5">{label}</Eyebrow>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export function Section({ id, title, lead, children }: { id: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section id={id} className="pg-section">
      <h2>{title}</h2>
      {lead ? (
        <p className="mt-2 max-w-xl" style={{ color: "var(--voga-muted)" }}>
          {lead}
        </p>
      ) : null}
      {children}
    </section>
  );
}
