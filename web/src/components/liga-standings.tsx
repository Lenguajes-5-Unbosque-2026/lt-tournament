"use client";

import { useState } from "react";
import { ResultRow } from "@/components/result-row";
import { Segment } from "@/components/segment";
import { StandingsTable } from "@/components/standings-table";
import {
  cerrado,
  jugadorPorId,
  marcador,
  partidosDeRonda,
  rondaActual,
  tablaLiga,
  type PartidoLiga,
  type TorneoLiga,
} from "@/lib/liga";

/** Filas visibles antes de «Ver tabla completa» (PTS · J1 y PTS · O2). */
const VISIBLES = 8;

const ESTADO: Record<PartidoLiga["estado"], string> = {
  pendiente: "Pendiente",
  reportado: "Por confirmar",
  en_disputa: "En disputa",
  finalizado: "Finalizado",
  wo: "W.O.",
};

/**
 * Pestañas Tabla · Ronda 1…N, la tabla de posiciones (PJ · G · E · P · Pts)
 * o los partidos de la ronda elegida, y la leyenda de puntos. Las rondas
 * que todavía no tienen emparejamientos no salen (spec, pregunta 11).
 */
export function LigaStandings({
  torneo,
  propioId,
  onVerPrueba,
}: {
  torneo: TorneoLiga;
  propioId?: string;
  onVerPrueba?: (p: PartidoLiga) => void;
}) {
  const [pestana, setPestana] = useState("tabla");
  const rondas = Array.from({ length: rondaActual(torneo) }, (_, i) => i + 1);
  const ronda = pestana === "tabla" ? null : Number(pestana);
  const { victoria, empate, derrota } = torneo.puntos;

  return (
    <>
      <Segment
        label="Tabla a mostrar"
        options={[
          { value: "tabla", label: "Tabla" },
          ...rondas.map((r) => ({ value: String(r), label: `Ronda ${r}` })),
        ]}
        value={pestana}
        onValueChange={(v) => v && setPestana(v)}
        className="mt-4"
      />

      <div className="mt-4">
        {ronda === null ? (
          <StandingsTable
            etiqueta="Tabla de posiciones"
            columnas={["PJ", "G", "E", "P"]}
            anchoColumna="1.625rem"
            filas={tablaLiga(torneo).map((f) => ({
              jugador: f.jugador,
              posicion: f.posicion,
              valores: [f.pj, f.g, f.e, f.p].map(String),
              puntos: f.puntos,
            }))}
            propioId={propioId}
            visibles={VISIBLES}
          />
        ) : (
          <ul aria-label={`Partidos de la ronda ${ronda}`} className="flex flex-col gap-2.5">
            {partidosDeRonda(torneo, ronda).map((p) => {
              const a = jugadorPorId(torneo, p.aId)?.nombre ?? "—";
              const b = jugadorPorId(torneo, p.bId)?.nombre ?? "—";
              const ganador = jugadorPorId(torneo, p.ganadorId)?.nombre;
              return (
                <ResultRow
                  key={p.id}
                  titulo={cerrado(p) ? `${a} ${marcador(p.marcadorA, p.marcadorB)} ${b}` : `${a} vs ${b}`}
                  detalle={cerrado(p) ? (ganador ? `Ganó ${ganador}` : "Empate") : ESTADO[p.estado]}
                  estado={cerrado(p) ? "Sin prueba" : ESTADO[p.estado]}
                  onVerPrueba={cerrado(p) && p.prueba && onVerPrueba ? () => onVerPrueba(p) : undefined}
                  etiquetaPrueba={`Ver prueba de ${a} contra ${b}`}
                />
              );
            })}
          </ul>
        )}
      </div>

      <p className="mt-3 text-center text-caption text-ink-3">
        Victoria {victoria} pts · Empate {empate} · Derrota {derrota}
      </p>
    </>
  );
}
