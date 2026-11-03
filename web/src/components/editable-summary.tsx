import Link from "next/link";
import { Pencil } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export type EditableRow = {
  label: string;
  value: string;
  /** Paso al que lleva el lápiz. */
  href: string;
};

/** Resumen con un lápiz de edición en cada bloque (revisión del asistente, O05). */
export function EditableSummary({ rows }: { rows: EditableRow[] }) {
  return (
    <dl className="rounded-lg border border-line bg-surface p-4">
      <div className="flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <dt className="text-caption text-ink-3">{r.label}</dt>
              <dd className="mt-0.5 text-strong text-ink">{r.value}</dd>
            </div>
            <Link
              href={r.href}
              aria-label={`Editar ${r.label.toLowerCase()}`}
              className={buttonVariants({ variant: "secondary", size: "icon" })}
            >
              <Pencil />
            </Link>
          </div>
        ))}
      </div>
    </dl>
  );
}
