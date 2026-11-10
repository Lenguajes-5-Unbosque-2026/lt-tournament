"use client";

import { PlayerAvatar } from "@/components/player-avatar";
import { Stepper } from "@/components/stepper";
import type { Participante } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Marcador máximo de los contadores (spec bracket-por-puntos, pregunta 15). */
const MAX_MARCADOR = 99;

/**
 * Versus / marcador (design/componentes.md #20): los dos jugadores con su
 * avatar y nombre, y un contador − / + sobre el marcador de cada uno. El
 * que va ganando lleva el anillo de acento. Lo usan PTS · J2 y PTS · O3, y
 * sirve para J17 y O13.
 */
export function ScoreVersus({
  a,
  b,
  marcadorA,
  marcadorB,
  onChange,
  disabled = false,
}: {
  a: Participante;
  b: Participante;
  marcadorA: number;
  marcadorB: number;
  onChange: (marcadorA: number, marcadorB: number) => void;
  /** Solo lectura: los reportes ya no se editan (D1). */
  disabled?: boolean;
}) {
  const lados = [
    { jugador: a, valor: marcadorA, gana: marcadorA > marcadorB, set: (v: number) => onChange(v, marcadorB) },
    { jugador: b, valor: marcadorB, gana: marcadorB > marcadorA, set: (v: number) => onChange(marcadorA, v) },
  ];

  return (
    <section
      aria-label="Marcador"
      className="grid grid-cols-2 gap-2 rounded-lg border border-line bg-surface px-2 py-5"
    >
      {lados.map(({ jugador, valor, gana, set }) => (
        <div key={jugador.id} className="flex min-w-0 flex-col items-center">
          <PlayerAvatar
            imagen={jugador.imagen}
            color1={jugador.color1}
            color2={jugador.color2}
            className={cn(
              "size-14 ring-2 ring-offset-2 ring-offset-surface",
              gana ? "ring-primary" : "ring-transparent",
            )}
          />
          <p className="mt-2 max-w-full truncate text-h3 text-ink">{jugador.nombre}</p>
          <div className="mt-3">
            <Stepper
              compact
              disabled={disabled}
              value={valor}
              onChange={set}
              min={0}
              max={MAX_MARCADOR}
              label={`marcador de ${jugador.nombre}`}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
