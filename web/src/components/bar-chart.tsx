import { cn } from "@/lib/utils";

/**
 * Gráfica de barras simple (design/componentes.md #48): una barra por dato con
 * su valor arriba y su etiqueta abajo; la mayor va resaltada en acento.
 * Cada barra se mide contra la mayor.
 */
export function BarChart({
  datos,
  label,
}: {
  datos: { label: string; valor: number }[];
  /** Descripción para lectores de pantalla. */
  label: string;
}) {
  const maximo = Math.max(...datos.map((d) => d.valor), 1);
  const mayor = datos.findIndex((d) => d.valor === maximo);

  return (
    <ul aria-label={label} className="flex h-36 items-end gap-2">
      {datos.map((d, i) => (
        <li key={`${d.label}-${i}`} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
          <span className={cn("text-caption", i === mayor ? "text-primary" : "text-ink-3")}>
            {d.valor}
          </span>
          <span
            className={cn("w-full rounded-sm", i === mayor ? "bg-primary" : "bg-surface-3")}
            style={{ height: `${Math.max(8, (d.valor / maximo) * 100)}%` }}
          />
          <span className="text-caption text-ink-2">{d.label}</span>
        </li>
      ))}
    </ul>
  );
}
