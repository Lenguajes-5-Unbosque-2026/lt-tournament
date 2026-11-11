import { PlayerAvatar } from "@/components/player-avatar";
import type { Participante } from "@/lib/types";

/**
 * Fila de un jugador con su estado (.listrow): avatar, título, detalle y, a
 * la derecha, algo opcional (miniatura de una captura). La usan los reportes
 * de una disputa (D2) y el check-in de un partido (W1).
 */
export function PlayerStatusRow({
  jugador,
  titulo,
  detalle,
  trailing,
}: {
  jugador: Participante;
  titulo: string;
  detalle: string;
  trailing?: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3">
      <PlayerAvatar
        imagen={jugador.imagen}
        color1={jugador.color1}
        color2={jugador.color2}
        className="size-10"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-strong text-ink">{titulo}</p>
        <p className="text-caption text-ink-3">{detalle}</p>
      </div>
      {trailing}
    </li>
  );
}
