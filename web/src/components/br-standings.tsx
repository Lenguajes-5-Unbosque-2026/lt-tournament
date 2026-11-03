"use client";

import { useState } from "react";
import { Segment } from "@/components/segment";
import { StandingsTable, type FilaPosiciones } from "@/components/standings-table";
import { confirmados, jugadorPorId, tablaGeneral, type TorneoBR } from "@/lib/battle-royale";

/** Filas visibles antes de «Ver tabla completa» (BR · J1 y BR · O2). */
const VISIBLES = 8;

/**
 * Pestañas General · Partida 1…N y la tabla de posiciones de un battle
 * royale. General suma lo confirmado (Kills · Mejor · Pts); cada partida
 * muestra su tabla registrada (Kills · Puesto · Pts). Lo que los jugadores
 * solo reportaron no cuenta hasta que el organizador lo confirma.
 */
export function BRStandings({ torneo, propioId }: { torneo: TorneoBR; propioId?: string }) {
  const [pestana, setPestana] = useState("general");
  const partida = torneo.partidas.find((p) => p.id === pestana);

  let columnas: string[];
  let filas: FilaPosiciones[];
  if (!partida) {
    columnas = ["Kills", "Mejor"];
    filas = tablaGeneral(torneo).map((f) => ({
      jugador: f.jugador,
      posicion: f.posicion,
      valores: [String(f.kills), f.mejor ? `${f.mejor}°` : "—"],
      puntos: f.puntos,
    }));
  } else {
    columnas = ["Kills", "Puesto"];
    filas = confirmados(torneo, partida.id)
      .sort((a, b) => a.puesto - b.puesto)
      .flatMap((r) => {
        const jugador = jugadorPorId(torneo, r.jugadorId);
        return jugador
          ? [{ jugador, posicion: r.puesto, valores: [String(r.kills), `${r.puesto}°`], puntos: r.puntos }]
          : [];
      });
  }

  const vacio =
    partida?.estado === "pendiente"
      ? "Esta partida todavía no empieza."
      : "La tabla de esta partida aparece cuando el organizador registre los resultados.";

  return (
    <>
      <Segment
        label="Tabla a mostrar"
        options={[
          { value: "general", label: "General" },
          ...torneo.partidas.map((p) => ({ value: p.id, label: `Partida ${p.numero}` })),
        ]}
        value={pestana}
        // Siempre hay una pestaña activa: tocar la activa no hace nada.
        onValueChange={(v) => v && setPestana(v)}
        className="mt-4"
      />
      <div className="mt-4">
        <StandingsTable
          etiqueta={partida ? `Tabla de la partida ${partida.numero}` : "Tabla general"}
          columnas={columnas}
          filas={filas}
          propioId={propioId}
          visibles={VISIBLES}
          vacio={vacio}
        />
      </div>
    </>
  );
}
