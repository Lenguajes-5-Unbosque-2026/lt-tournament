import { PlayerAvatar } from "@/components/player-avatar";
import type { Participante } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Versus (design/componentes.md #20) en tarjeta: título y etiqueta arriba,
 * los dos jugadores grandes con un detalle cada uno (seed) y al centro «VS»
 * o el marcador. Lo usa «Tu partido» de J16 y sirve para la Sala (J14).
 */
export function MatchupCard({
  titulo,
  etiqueta,
  a,
  b,
  detalleA,
  detalleB,
  centro = "VS",
  pie,
  propioId,
}: {
  titulo: string;
  etiqueta?: React.ReactNode;
  a: Participante;
  b: Participante;
  /** «Seed #1» */
  detalleA?: string;
  detalleB?: string;
  /** «VS» o «2 – 1» */
  centro?: string;
  /** Texto bajo el centro: la ronda. */
  pie?: string;
  propioId?: string;
}) {
  const lado = (j: Participante, detalle?: string) => (
    <div className="flex min-w-0 flex-col items-center text-center">
      <PlayerAvatar
        imagen={j.imagen}
        color1={j.color1}
        color2={j.color2}
        className={cn(
          "size-16 ring-2 ring-offset-2 ring-offset-surface",
          j.id === propioId ? "ring-primary" : "ring-line-strong",
        )}
      />
      <p className="mt-2 max-w-full truncate text-h3 text-ink">{j.nombre}</p>
      {detalle && <p className="text-caption text-ink-3">{detalle}</p>}
    </div>
  );

  return (
    <section
      aria-label={titulo}
      className="rounded-lg border border-primary-line bg-linear-to-b from-primary/10 to-primary/2 p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-h2 text-ink">{titulo}</h2>
        {etiqueta}
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        {lado(a, detalleA)}
        <div className="text-center">
          <p className="font-display text-display-l text-primary italic">{centro}</p>
          {pie && <p className="text-caption text-ink-3">{pie}</p>}
        </div>
        {lado(b, detalleB)}
      </div>
    </section>
  );
}
