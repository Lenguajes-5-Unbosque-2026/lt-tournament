import type { ItemHistorial } from "@/lib/progreso";
import { cn } from "@/lib/utils";

// Casilla del puesto: oro, plata y bronce en el podio; neutra después.
const CASILLA = [
  "bg-gold/15 text-gold",
  "bg-silver/12 text-silver",
  "bg-bronze/15 text-bronze",
];

/**
 * Fila de un torneo terminado (.listrow): el puesto en una casilla de color,
 * el nombre, el juego y los jugadores, y los puntos de ranking ganados. La
 * usan «Últimos torneos» (J18) y el Historial (J19).
 */
export function HistoryRow({
  item,
  fecha,
}: {
  item: ItemHistorial;
  /** Fecha ya formateada: «21 Sep». Solo el Historial la muestra. */
  fecha?: string;
}) {
  const detalle = [
    item.juegoNombre,
    item.jugadores > 0 && `${item.jugadores} jugadores`,
    fecha,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="flex items-center gap-3.5 rounded-lg border border-line bg-surface p-3.5">
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-md font-display text-h2 italic",
          CASILLA[item.puesto - 1] ?? "bg-surface-3 text-ink-2",
        )}
      >
        {item.puesto}°
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-strong text-ink">{item.nombre}</p>
        <p className="truncate text-caption text-ink-3">{detalle}</p>
      </div>
      <span className="text-h3 text-success">+{item.puntos}</span>
    </li>
  );
}
