"use client";

import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { PlayerAvatar } from "@/components/player-avatar";
import { Segment } from "@/components/segment";
import type { Llave, RondaCuadro } from "@/lib/eliminacion";
import type { Participante } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Bracket por ronda (.bracket / .mbox, design/componentes.md #33): pestañas
 * de ronda; la ronda elegida a la izquierda y la siguiente a la derecha,
 * cada partido centrado entre los dos de los que sale. En la última pestaña
 * van la Final y el partido por el 3.er puesto. Lo usan J16 y O12.
 */
export function BracketRounds({
  rondas,
  rondaInicial,
  jugador,
  propioId,
  onVerPrueba,
}: {
  rondas: RondaCuadro[];
  rondaInicial: number;
  jugador: (id: string | null) => Participante | undefined;
  propioId?: string;
  onVerPrueba?: (llave: Llave) => void;
}) {
  const [pestana, setPestana] = useState(String(rondaInicial));
  const actual = rondas[Number(pestana) - 1] ?? rondas[0];
  const siguiente = rondas[actual.numero];
  const izquierda = actual.llaves.filter((l) => !l.tercerPuesto);
  const tercer = actual.llaves.find((l) => l.tercerPuesto);

  const caja = (l: Llave) => (
    <MatchBox llave={l} jugador={jugador} propioId={propioId} onVerPrueba={onVerPrueba} />
  );

  return (
    <>
      <Segment
        label="Ronda del bracket"
        options={rondas.map((r) => ({ value: String(r.numero), label: r.nombre }))}
        value={pestana}
        onValueChange={(v) => v && setPestana(v)}
        className="mt-4"
      />

      {siguiente ? (
        <div
          role="list"
          aria-label={`${actual.nombre} y ${siguiente.nombre}`}
          className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] gap-x-4 gap-y-3"
        >
          {izquierda.map((l, i) => (
            <div key={l.id} role="listitem" style={{ gridRow: i + 1, gridColumn: 1 }}>
              {caja(l)}
            </div>
          ))}
          {siguiente.llaves
            .filter((l) => !l.tercerPuesto)
            .map((l, j) => (
              <div
                key={l.id}
                role="listitem"
                style={{ gridRow: `${2 * j + 1} / span 2`, gridColumn: 2 }}
                className="self-center"
              >
                {caja(l)}
              </div>
            ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {izquierda.map((l) => (
            <section key={l.id} aria-label="Final">
              <p className="mb-2 text-overline text-ink-3 uppercase">Final</p>
              {caja(l)}
            </section>
          ))}
          {tercer && (
            <section aria-label="Partido por el tercer puesto">
              <p className="mb-2 text-overline text-ink-3 uppercase">Tercer puesto</p>
              {caja(tercer)}
            </section>
          )}
        </div>
      )}
    </>
  );
}

/** Caja de partido de dos filas: avatar, nombre y marcador; el ganador en acento. */
function MatchBox({
  llave,
  jugador,
  propioId,
  onVerPrueba,
}: {
  llave: Llave;
  jugador: (id: string | null) => Participante | undefined;
  propioId?: string;
  onVerPrueba?: (llave: Llave) => void;
}) {
  const propia = !!propioId && (llave.aId === propioId || llave.bId === propioId);
  const lados = [
    { id: llave.aId, score: llave.marcadorA },
    { id: llave.bId, score: llave.marcadorB },
  ];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border bg-surface",
        propia ? "border-primary-line bg-linear-to-r from-primary-soft to-surface" : "border-line",
      )}
    >
      {lados.map(({ id, score }, i) => {
        const j = jugador(id);
        const gano = llave.cerrada && !!id && llave.ganadorId === id;
        const sinRival = !j && llave.pase;
        return (
          <div
            key={i}
            className={cn("flex h-10 items-center gap-2 px-3", i === 1 && "border-t border-line")}
          >
            {j ? (
              <PlayerAvatar imagen={j.imagen} color1={j.color1} color2={j.color2} className="size-6" />
            ) : (
              <span aria-hidden className="size-6 shrink-0 rounded-full bg-surface-3" />
            )}
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-small",
                j ? (gano ? "font-semibold text-ink" : "text-ink-2") : "text-ink-3",
              )}
            >
              {j?.nombre ?? (sinRival ? "Pase directo" : "Por definir")}
            </span>
            <span
              className={cn("text-strong", gano ? "text-primary" : "text-ink-3")}
              aria-label={score === null ? "Sin marcador" : undefined}
            >
              {score ?? "–"}
            </span>
          </div>
        );
      })}
      {llave.cerrada && llave.prueba && onVerPrueba && (
        <div className="border-t border-line px-3 py-2">
          <button
            type="button"
            onClick={() => onVerPrueba(llave)}
            aria-label={`Ver prueba de ${jugador(llave.aId)?.nombre} contra ${jugador(llave.bId)?.nombre}`}
            className="inline-flex h-7 items-center gap-1.5 rounded-sm bg-primary-soft px-2.5 text-caption font-semibold text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ImageIcon className="size-icon-chip" aria-hidden />
            Ver prueba
          </button>
        </div>
      )}
    </div>
  );
}
