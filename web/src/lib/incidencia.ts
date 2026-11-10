/**
 * Incidencias de partido (specs/incidencias-de-partido): disputas y W.O.
 * Tipos y cálculos puros, para servidor y cliente.
 */
import type { Participante } from "./types";

/** Marcador y captura que reportó un jugador, en el orden A – B del partido. */
export type ReporteIncidencia = {
  jugador: Participante;
  marcadorA: number;
  marcadorB: number;
  /** Nombre del archivo de la captura, o `null` si no adjuntó. */
  captura: string | null;
  creadoEn: string;
};

export type PartidoIncidencia = {
  id: string;
  torneoId: string;
  torneoNombre: string;
  torneoFechaInicio: string;
  /** «Octavos» */
  ronda: string;
  orden: number;
  /** «Octavos · Partido 1» */
  subtitulo: string;
  a: Participante;
  b: Participante;
  estado: "pendiente" | "reportado" | "en_disputa" | "finalizado" | "wo";
  ganadorId: string | null;
  fechaHora: string;
  reportes: ReporteIncidencia[];
  /** Hora de check-in de cada jugador; `null` si no hizo check-in. */
  checkinA: string | null;
  checkinB: string | null;
  /** Ronda a la que avanza el ganador («Cuartos»), si hay una siguiente. */
  siguienteRonda: string | null;
  /** Hora del siguiente partido del ganador, si ya está programado. */
  siguienteFechaHora: string | null;
};

/** Minutos de tolerancia de check-in por defecto (spec: «10 min por defecto»). */
export const TOLERANCIA_CHECKIN_MIN = 10;

/** El jugador que no se presentó: sin check-in, o el que perdió el W.O. ya aplicado. */
export function ausente(p: PartidoIncidencia): Participante {
  if (p.estado === "wo" && p.ganadorId) return p.ganadorId === p.a.id ? p.b : p.a;
  if (!p.checkinA && p.checkinB) return p.a;
  return p.b;
}

/** El jugador que sí se presentó. */
export function presente(p: PartidoIncidencia): Participante {
  return ausente(p).id === p.a.id ? p.b : p.a;
}

/** Hora de check-in del jugador, o `null`. */
export function checkinDe(p: PartidoIncidencia, jugadorId: string) {
  return jugadorId === p.a.id ? p.checkinA : p.checkinB;
}

/** Lo que reportó un jugador, en su orden «propio – rival». */
export function marcadorDe(r: ReporteIncidencia) {
  return `${r.marcadorA} – ${r.marcadorB}`;
}
