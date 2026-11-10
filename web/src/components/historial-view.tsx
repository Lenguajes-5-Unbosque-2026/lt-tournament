"use client";

import { useState } from "react";
import { Gamepad2, Star, Zap } from "lucide-react";
import { GameChips } from "@/components/game-chips";
import { HistoryRow } from "@/components/history-row";
import { Stat } from "@/components/stat";
import { Topbar } from "@/components/topbar";
import { formatDia, formatPuntos } from "@/lib/format";
import type { Historial } from "@/lib/progreso";

/**
 * Historial competitivo (J19): chips de juego, tres cifras (jugados, % de
 * victorias y puntos) y la lista de torneos terminados. Las cifras siguen al
 * filtro de juego.
 */
export function HistorialView({ historial }: { historial: Historial }) {
  const [seleccion, setSeleccion] = useState<string[]>([]);
  const items =
    seleccion.length === 0
      ? historial.items
      : historial.items.filter((i) => seleccion.includes(i.juegoId));

  const victorias = items.reduce((s, i) => s + i.victorias, 0);
  const partidos = items.reduce((s, i) => s + i.partidos, 0);
  const porcentaje = partidos > 0 ? Math.round((victorias / partidos) * 100) : 0;
  const puntos = items.reduce((s, i) => s + i.puntos, 0);

  return (
    <>
      <Topbar title="Historial competitivo" fallbackHref="/perfil" />

      {historial.juegos.length > 1 && (
        <GameChips
          juegos={historial.juegos}
          selected={seleccion}
          onChange={setSeleccion}
          className="mt-4"
        />
      )}

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <Stat icon={Gamepad2} value={String(items.length)} label="Jugados" tone="accent" />
        <Stat icon={Zap} value={`${porcentaje}%`} label="Victorias" tone="success" />
        <Stat icon={Star} value={formatPuntos(puntos)} label="Puntos" tone="warning" />
      </div>

      {items.length === 0 ? (
        <p className="mt-8 text-center text-small text-ink-3">
          Todavía no terminas torneos de este juego.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <HistoryRow
              key={item.torneoId}
              item={item}
              fecha={formatDia(item.fechaInicio).replace(/^\S+ /, "")}
            />
          ))}
        </ul>
      )}
    </>
  );
}
