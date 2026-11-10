import { Trophy } from "lucide-react";
import { PlayerAvatar } from "@/components/player-avatar";
import { cn } from "@/lib/utils";

export type PuestoPodio = {
  nombre: string;
  imagen: string;
  color1: string;
  color2: string;
  /** «+250 pts» */
  detalle: string;
  /** Es el jugador que mira: lleva el anillo y el nombre en acento. */
  esYo?: boolean;
};

// Índice 0 = 1.°, 1 = 2.°, 2 = 3.°. Se pintan en el orden 2° · 1° · 3°.
const ESTILOS = [
  { puesto: "1°", orden: "order-2", base: "h-36 border-gold/60 bg-gold/12", color: "text-gold", anillo: "ring-gold", avatar: "size-17" },
  { puesto: "2°", orden: "order-1", base: "h-28 border-silver/50 bg-silver/10", color: "text-silver", anillo: "ring-silver", avatar: "size-14" },
  { puesto: "3°", orden: "order-3", base: "h-22 border-bronze/50 bg-bronze/12", color: "text-bronze", anillo: "ring-bronze", avatar: "size-14" },
];

/**
 * Podio 2° · 1° · 3° (.podium, design/componentes.md #28): avatar, nombre,
 * detalle y una base con trofeo en oro, plata y bronce. Recibe los puestos
 * en orden (1.°, 2.°, 3.°); los que falten no se pintan.
 */
export function Podium({ puestos }: { puestos: PuestoPodio[] }) {
  return (
    <ol aria-label="Podio" className="grid grid-cols-3 items-end gap-3">
      {puestos.slice(0, 3).map((p, i) => {
        const e = ESTILOS[i];
        return (
          <li key={e.puesto} className={cn("flex min-w-0 flex-col items-center", e.orden)}>
            <PlayerAvatar
              imagen={p.imagen}
              color1={p.color1}
              color2={p.color2}
              className={cn(e.avatar, "ring-2 ring-offset-2 ring-offset-bg", p.esYo ? "ring-primary" : e.anillo)}
            />
            <p className={cn("mt-2 max-w-full truncate text-h3", p.esYo ? "text-primary" : "text-ink")}>
              {p.nombre}
            </p>
            <p className="text-caption text-ink-3">{p.detalle}</p>
            <div
              className={cn(
                "mt-3 flex w-full flex-col items-center justify-center gap-1 rounded-lg border",
                e.base,
              )}
            >
              <Trophy className={cn("size-8", e.color)} strokeWidth={1.5} aria-hidden />
              <span className={cn("font-display text-h2 italic", e.color)}>
                <span className="sr-only">Puesto </span>
                {e.puesto}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
