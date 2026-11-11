import { Crown, Gem, Medal, type LucideIcon } from "lucide-react";
import type { Logro } from "@/lib/progreso";

const ICONOS: Record<string, LucideIcon> = {
  titulo: Medal,
  victorias: Crown,
  top: Gem,
};

/**
 * Tarjeta de logro (design/componentes.md #52): un render con respaldo (aquí,
 * un ícono en dorado), el título y el detalle. Los logros se calculan con lo
 * que el jugador ya jugó.
 */
export function AchievementCard({ logro }: { logro: Logro }) {
  const Icon = ICONOS[logro.id] ?? Medal;
  return (
    <li className="flex flex-col items-center rounded-lg border border-line bg-surface px-2 py-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-gold/12 text-gold">
        <Icon className="size-7" strokeWidth={1.5} aria-hidden />
      </span>
      <p className="mt-3 text-strong text-ink">{logro.titulo}</p>
      <p className="line-clamp-2 text-caption text-ink-3">{logro.detalle}</p>
    </li>
  );
}
