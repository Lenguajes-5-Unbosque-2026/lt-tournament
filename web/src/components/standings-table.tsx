"use client";

import { useState } from "react";
import { PlayerAvatar } from "@/components/player-avatar";
import type { JugadorBR } from "@/lib/battle-royale";
import { cn } from "@/lib/utils";

export type FilaPosiciones = {
  jugador: JugadorBR;
  /** Número de la columna #; `null` se pinta como «—». */
  posicion: number | null;
  /** Columnas del medio, en el orden de `columnas` («14», «1°»…). */
  valores: string[];
  puntos: number | null;
};

const MEDALLA = ["text-gold", "text-silver", "text-bronze"];

/**
 * Tabla de posiciones (design/componentes.md #23): # · jugador · columnas ·
 * Pts. El top 3 lleva el número en oro, plata y bronce, y la fila propia el
 * borde de acento. Con `visibles` muestra solo las primeras filas y el pie
 * «Mostrando N de M jugadores · Ver tabla completa». Con `onFilaClick` cada
 * fila es un botón (Registrar resultados, BR · O3).
 */
export function StandingsTable({
  columnas,
  filas,
  propioId,
  visibles,
  onFilaClick,
  vacio,
  etiqueta,
}: {
  columnas: string[];
  filas: FilaPosiciones[];
  propioId?: string;
  visibles?: number;
  onFilaClick?: (jugadorId: string) => void;
  /** Texto cuando no hay filas. */
  vacio?: string;
  etiqueta: string;
}) {
  const [completa, setCompleta] = useState(false);
  const mostradas = visibles && !completa ? filas.slice(0, visibles) : filas;
  // # · jugador · columnas del medio · pts
  const plantilla = {
    gridTemplateColumns: `1.5rem minmax(0,1fr) repeat(${columnas.length}, 2.75rem) 2.25rem`,
  };

  return (
    <div>
      <div
        aria-hidden
        style={plantilla}
        className="grid items-center gap-2 px-4 pb-2 text-caption text-ink-3"
      >
        <span>#</span>
        <span>Jugador</span>
        {columnas.map((c) => (
          <span key={c} className="text-center">
            {c}
          </span>
        ))}
        <span className="text-right">Pts</span>
      </div>

      {filas.length === 0 ? (
        <p className="rounded-md border border-line bg-surface p-4 text-center text-small text-ink-3">
          {vacio}
        </p>
      ) : (
        <ol aria-label={etiqueta} className="flex flex-col gap-2">
          {mostradas.map((f) => {
            const propia = f.jugador.id === propioId;
            const contenido = (
              <>
                <span
                  className={cn(
                    "font-display text-h2 italic",
                    f.posicion && f.posicion <= 3 ? MEDALLA[f.posicion - 1] : "text-ink-3",
                  )}
                >
                  {f.posicion ?? "—"}
                </span>
                <span className="flex min-w-0 items-center gap-2.5">
                  <PlayerAvatar
                    imagen={f.jugador.imagen}
                    color1={f.jugador.color1}
                    color2={f.jugador.color2}
                  />
                  <span className="truncate text-h3 text-ink">{f.jugador.nombre}</span>
                </span>
                {f.valores.map((v, i) => (
                  <span key={columnas[i]} className="text-center text-small text-ink-2">
                    <span className="sr-only">{columnas[i]}: </span>
                    {v}
                  </span>
                ))}
                <span className="text-right text-strong text-ink">
                  <span className="sr-only">Puntos: </span>
                  {f.puntos ?? "—"}
                </span>
              </>
            );
            const clases = cn(
              "grid min-h-12 w-full items-center gap-2 rounded-md border px-4 text-left",
              propia
                ? "border-primary-line bg-linear-to-r from-primary-soft to-surface"
                : "border-line bg-surface",
            );
            return (
              <li key={f.jugador.id} aria-current={propia || undefined}>
                {onFilaClick ? (
                  <button
                    type="button"
                    style={plantilla}
                    onClick={() => onFilaClick(f.jugador.id)}
                    aria-label={`Editar puesto y kills de ${f.jugador.nombre}`}
                    className={cn(
                      clases,
                      "outline-none transition-colors duration-(--dur-fast) ease-out hover:border-primary-line focus-visible:ring-2 focus-visible:ring-ring",
                    )}
                  >
                    {contenido}
                  </button>
                ) : (
                  <div style={plantilla} className={clases}>
                    {contenido}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {visibles !== undefined && filas.length > visibles && (
        <p className="mt-3 text-center text-caption text-ink-3">
          {completa
            ? `Mostrando los ${filas.length} jugadores`
            : `Mostrando ${visibles} de ${filas.length} jugadores`}{" "}
          ·{" "}
          <button
            type="button"
            onClick={() => setCompleta((c) => !c)}
            className="font-semibold text-ink-2 underline-offset-2 hover:underline"
          >
            {completa ? "Ver menos" : "Ver tabla completa"}
          </button>
        </p>
      )}
    </div>
  );
}
