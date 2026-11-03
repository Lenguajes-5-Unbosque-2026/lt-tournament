import { cn } from "@/lib/utils";

export type KeyValueRow = {
  label: string;
  /** Texto, o un elemento (etiqueta de estado). */
  value: React.ReactNode;
  /** Color del valor: por defecto text, o un token de estado. */
  tone?: "default" | "success" | "gold";
};

const TONOS = {
  default: "text-ink",
  success: "text-success",
  gold: "text-gold",
} as const;

/** Filas clave-valor en una tarjeta con separadores (resumen, premios). */
export function KeyValueList({
  rows,
  className,
}: {
  rows: KeyValueRow[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "divide-y divide-line rounded-lg border border-line bg-surface px-4",
        className,
      )}
    >
      {rows.map((r) => (
        <div key={r.label} className="flex min-h-13 items-center justify-between gap-3 py-3">
          <dt className="text-small text-ink-3">{r.label}</dt>
          <dd className={cn("text-strong", TONOS[r.tone ?? "default"])}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
