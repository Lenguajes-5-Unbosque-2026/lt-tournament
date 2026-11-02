import Link from "next/link";
import { GameArt } from "@/components/game-art";
import { StatusTag } from "@/components/status-tag";
import { TournamentMeta } from "@/components/tournament-meta";
import { etiquetaEstado } from "@/lib/torneo";
import type { Torneo } from "@/lib/types";

/**
 * Tarjeta de torneo (.tcard, design/ui kit.md §5.13): arte, juego,
 * etiqueta de estado, nombre y metadatos. Toda la tarjeta es un enlace
 * al detalle (J09).
 */
export function TournamentCard({
  torneo,
  ahora,
  href = `/torneo/${torneo.id}`,
}: {
  torneo: Torneo;
  ahora: string;
  /** Destino de la tarjeta; por defecto el Detalle del jugador (J09). */
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3.5 rounded-lg border border-line bg-surface p-3 transition-transform duration-(--dur-fast) ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-99"
    >
      <GameArt
        src={torneo.imagen}
        color1={torneo.juego.color1}
        color2={torneo.juego.color2}
        abreviatura={torneo.juego.abreviatura}
        className="size-16"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-overline text-primary uppercase">
            {torneo.juego.nombre}
          </span>
          <StatusTag estado={etiquetaEstado(torneo)} />
        </div>
        <h3 className="mt-1 truncate text-h3 text-ink">{torneo.nombre}</h3>
        <TournamentMeta torneo={torneo} ahora={ahora} className="mt-1.5" />
      </div>
    </Link>
  );
}
