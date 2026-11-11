import { PlayerAvatar } from "@/components/player-avatar";
import { formatPuntos } from "@/lib/format";
import type { FilaRanking } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Fila de ranking (.listrow): puesto, nombre y torneos jugados, avatar y
 * puntos. La del propio jugador (`esYo`) lleva borde y fondo de acento.
 */
export function RankingRow({
  puesto,
  fila,
  esYo = false,
}: {
  puesto: number;
  fila: FilaRanking;
  esYo?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-md border bg-surface px-3.5 py-3",
        esYo ? "border-primary-line bg-primary-soft" : "border-line",
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-surface-2 text-strong text-ink-2">
        {puesto}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-strong text-ink">{esYo ? `${fila.nombre} (tú)` : fila.nombre}</p>
        <p className="text-caption text-ink-3">
          {fila.torneos} {fila.torneos === 1 ? "torneo" : "torneos"}
        </p>
      </div>
      <PlayerAvatar
        imagen={fila.imagen}
        color1={fila.color1}
        color2={fila.color2}
        className="size-9"
      />
      <span className="w-14 text-right text-h3 text-ink">{formatPuntos(fila.puntos)}</span>
    </li>
  );
}
